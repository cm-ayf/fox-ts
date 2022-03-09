import { entersState, VoiceConnectionStatus } from '@discordjs/voice';
import type {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from 'discord.js';
import { connections } from '.';

export const data: ChatInputApplicationCommandData = {
  type: 'CHAT_INPUT',
  name: 'leave',
  description: '今いるボイスチャンネルから出ます。',
};

export async function handle(interaction: CommandInteraction<'cached'>) {
  try {
    const connection = connections.get(interaction.guildId);
    if (!connection) throw new Error('"(^・ω・^)ノ こやーん（どこにいるの？）');

    connection.destroy();
    await entersState(connection, VoiceConnectionStatus.Destroyed, 1000);
    await interaction.reply('(^・ω・^)ノ こやーん（またね〜！）');
  } catch (e) {
    await interaction[interaction.replied ? 'reply' : 'followUp'](
      e instanceof Error
        ? e.message
        : '(^・ω・^)ノ こやーん（なぜか出られないの…）'
    );
  }
}
