import { Client, Intents } from 'discord.js';
import { env } from './utils';

const { BOT_TOKEN } = env;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.login(BOT_TOKEN);
