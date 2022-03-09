import { GuildMember, MessageEmbedOptions } from 'discord.js';
import { Fortune } from '..';
import { embed } from '../../base';

export function embedsCreator(
  fortune: Fortune,
  member: GuildMember
): MessageEmbedOptions[] {
  return [
    {
      ...embed,
      title: 'おみくじ',
      description: `${member}さんの今日の運勢は！`,
      fields: [
        {
          name: '[今日の運勢]',
          value: fortune.rank,
        },
        {
          name: '[今日のラッキーアイテム]',
          value: fortune.luckyItem,
        },
        {
          name: '[今日のキーワード]\n気になったら`/google`で調べてみよう！',
          value: fortune.keyword,
        },
      ],
    },
  ];
}
