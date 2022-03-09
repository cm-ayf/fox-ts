import readenv from '@cm-ayf/readenv';
import type { Base, Client } from 'discord.js';

export const env = readenv({
  BOT_TOKEN: {},
  GUILD_ID: {},
});

export function getGuild(base: Base | Client) {
  const client = 'client' in base ? base.client : base;
  return client.guilds.fetch(env.GUILD_ID);
}
