import type {
  Client,
  Interaction,
  Message,
  TextChannel,
  VoiceState,
} from 'discord.js';
import commands from './commands';
import { joinVC } from './messages';
import replies from './replies';
import { getGuild } from './utils';

export async function ready(client: Client<true>) {
  console.log(`logged in as ${client.user.tag}`);
  Promise.all([
    commands.register(client),
    getGuild(client).then((guild) => guild.channels.fetch()),
  ]);
}

export async function interactionCreate(interaction: Interaction) {
  if (!interaction.inCachedGuild()) return;
  try {
    if (interaction.isCommand()) await commands.handle(interaction);
  } catch (e) {
    console.error(e);
  }
}

export async function messageCreate(message: Message) {
  if (message.author.bot) return;
  await Promise.all(
    replies
      .getAll(message.cleanContent)
      .map((reply) => message.channel.send(reply))
  ).catch(console.error);
}

export async function voiceStateUpdate(old: VoiceState, state: VoiceState) {
  try {
    if (old.channel || !state.channel) return;

    const tc = state.client.channels.cache.find(
      (c): c is TextChannel =>
        c.type === 'GUILD_TEXT' && c.name === state.channel?.name
    );

    await tc?.send({
      content: `${state.member}`,
      ...joinVC,
    });
  } catch (e) {
    console.error(e);
  }
}
