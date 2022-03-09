import type {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from 'discord.js';

export const data: ChatInputApplicationCommandData = {
  type: 'CHAT_INPUT',
  name: 'fox',
  description: 'こやーん。',
};

export async function handle(interaction: CommandInteraction<'cached'>) {
  await interaction.reply('(^・ω・^)ノ こやーん');
}
