import { GuildMember, MessageOptions } from 'discord.js';
import { Fortune } from '..';
import { embedsCreator } from './embeds';

export function messageCreator(
  fortune: Fortune,
  member: GuildMember
): MessageOptions {
  return {
    embeds: embedsCreator(fortune, member),
  };
}
