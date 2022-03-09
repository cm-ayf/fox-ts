import {
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import type {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from 'discord.js';
import { connections, resolveCounterpart } from '.';

export const data: ChatInputApplicationCommandData = {
  type: 'CHAT_INPUT',
  name: 'join',
  description:
    'コマンドを実行したチャンネルと同じ名前のボイスチャンネルに接続します。',
};

export async function handle(interaction: CommandInteraction<'cached'>) {
  try {
    const vc = resolveCounterpart(
      interaction.guild,
      'GUILD_VOICE',
      interaction.channel?.name ?? ''
    );

    if (!vc)
      throw new Error(
        '(^・ω・^)ノ こやーん（同じ名前のボイスチャンネルが見つからないよ……）'
      );

    const connection = joinVoiceChannel({
      adapterCreator: interaction.guild.voiceAdapterCreator,
      channelId: vc.id,
      guildId: vc.guildId,
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 1000);
    await interaction.reply('(^・ω・^)ノ こやーん（遊びにきたよ！）');
    connections.set(interaction.guildId, connection);
  } catch (e) {
    await interaction[interaction.replied ? 'reply' : 'followUp'](
      e instanceof Error
        ? e.message
        : '(^・ω・^)ノ こやーん（なぜか遊びに行けないの…）'
    );
  }
}
