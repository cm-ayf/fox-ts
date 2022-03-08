import { Client, Intents } from 'discord.js';
import * as handler from './handler';
import { env } from './utils';

const { BOT_TOKEN } = env;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.on('ready', handler.ready);
client.on('interactionCreate', handler.interactionCreate);
client.on('messageCreate', handler.messageCreate);
client.on('voiceStateUpdate', handler.voiceStateUpdate);

client.login(BOT_TOKEN);
