import { TextChannel, VoiceState } from 'discord.js';
import * as message from './message';

export async function voiceStateUpdate(old: VoiceState, state: VoiceState) {
  try {
    if (old.channel || !state.channel) return;

    const tc = state.client.channels.cache.find(
      (c): c is TextChannel =>
        c.type === 'GUILD_TEXT' && c.name === state.channel?.name
    );

    await tc?.send({
      content: `${state.member}`,
      ...message,
    });
  } catch (e) {
    console.error(e);
  }
}
