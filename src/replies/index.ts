import { Message } from 'discord.js';
import manager from './manager';

export async function messageCreate(message: Message) {
  if (message.author.bot) return;
  await Promise.all(
    manager
      .getAll(message.cleanContent)
      .map((reply) => message.channel.send(reply))
  ).catch(console.error);
}
