import { Message } from 'discord.js';
import { env } from '../utils';
import manager from './manager';

const { GUILD_ID } = env;

export async function messageCreate(message: Message) {
  if (message.guildId !== GUILD_ID) return;
  if (message.author.bot) return;
  await Promise.all(
    manager
      .getAll(message.cleanContent)
      .map((reply) => message.channel.send(reply))
  ).catch(console.error);
}
