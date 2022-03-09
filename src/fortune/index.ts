import type {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from 'discord.js';
import { manager } from './manager';
import { messageCreator } from './message';

export interface Fortune {
  rank: string;
  luckyItem: string;
  keyword: string;
}

export const data: ChatInputApplicationCommandData = {
  type: 'CHAT_INPUT',
  name: 'fortune',
  description: 'おみくじを引きます。',
};

export async function handle(interaction: CommandInteraction<'cached'>) {
  const fortune = await manager.getRandom(interaction.user.id);
  await interaction.reply(messageCreator(fortune, interaction.member));
}
