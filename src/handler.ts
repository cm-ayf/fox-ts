import type { Client, Interaction, Message, VoiceState } from 'discord.js';

export function ready(client: Client<true>) {
  return;
}

export function interactionCreate(interaction: Interaction) {
  return;
}

export function messageCreate(message: Message) {
  return;
}

export function voiceStateUpdate(old: VoiceState, state: VoiceState) {
  return;
}
