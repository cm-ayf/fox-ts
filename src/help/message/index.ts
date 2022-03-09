import { MessageOptions } from 'discord.js';
import { CommandDefinition } from '../../commands';
import { embedsCreator } from './embeds';

export function messageCreator(
  definitions: CommandDefinition[]
): MessageOptions {
  return {
    embeds: embedsCreator(definitions),
  };
}
