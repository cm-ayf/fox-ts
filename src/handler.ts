import type { Client, Interaction, Message, VoiceState } from 'discord.js';
import commands from './commands';
import replies from './replies';

export async function ready(client: Client<true>) {
  console.log(`logged in as ${client.user.tag}`);
  await commands.register(client);
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

export function voiceStateUpdate(old: VoiceState, state: VoiceState) {
  return;
}
