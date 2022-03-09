import type { Client, Interaction } from 'discord.js';
import commands from './commands';
import { cacheGuildChannels } from './utils';

export async function ready(client: Client<true>) {
  console.log(`logged in as ${client.user.tag}`);
  Promise.all([commands.register(client), cacheGuildChannels(client)]);
}

export async function interactionCreate(interaction: Interaction) {
  if (!interaction.inCachedGuild()) return;
  try {
    if (interaction.isCommand()) await commands.handle(interaction);
  } catch (e) {
    console.error(e);
  }
}

export { messageCreate } from './replies';
export { voiceStateUpdate } from './vc';
