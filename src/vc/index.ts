import { VoiceConnection } from '@discordjs/voice';
import { Collection, Guild, GuildBasedChannel, VoiceState } from 'discord.js';
import { env } from '../utils';
import * as joinMessage from './message';
import { handle } from './message';
const { GUILD_ID } = env;

export const connections = new Collection<string, VoiceConnection>();

export function resolveCounterpart<T extends GuildBasedChannel['type']>(
  guild: Guild,
  type: T,
  name: string
): (GuildBasedChannel & { type: T }) | undefined {
  return guild.channels.cache.find(
    (c): c is GuildBasedChannel & { type: T } =>
      c.type === type && c.name === name
  );
}

async function onJoin(state: VoiceState) {
  const tc = resolveCounterpart(
    state.guild,
    'GUILD_TEXT',
    state.channel?.name ?? ''
  );

  const message = await tc?.send({
    content: `${state.member}`,
    ...joinMessage,
  });

  message
    ?.createMessageComponentCollector({
      time: 60 * 1000,
      max: 1,
      filter: (i) => i.user.id === state.member?.user.id,
    })
    .on('end', () => {
      message?.delete();
    });

  message
    ?.createMessageComponentCollector({
      time: 60 * 1000,
      filter: (i) => i.user.id !== state.member?.user.id,
    })
    .on('collect', handle);
}

async function onExit(old: VoiceState) {
  if (old.channel?.members.filter((m) => !m.user.bot).size ?? -1) {
    connections.get(old.guild.id)?.disconnect();
  }
}

export async function voiceStateUpdate(old: VoiceState, state: VoiceState) {
  try {
    if (state.guild.id !== GUILD_ID) return;
    if (!old.channel && state.channel) await onJoin(state);
    if (old.channel && !state.channel) await onExit(old);
  } catch (e) {
    console.error(e);
  }
}

export * as join from './join';
export * as leave from './leave';
