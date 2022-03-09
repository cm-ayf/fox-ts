import { MessageEmbedOptions } from 'discord.js';
import { embed } from '../../base';

export const embeds: MessageEmbedOptions[] = [
  {
    ...embed,
    title: '音量調節は済みましたか？',
    description:
      '音楽botなどのデフォルト音声は非常に大きいです！通話に参加しているメンバーを右クリックすることで音量調節画面が開きます！(このメッセージは一分後自動的に削除されます)',
  },
];
