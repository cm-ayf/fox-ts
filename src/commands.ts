import type {
  ApplicationCommandPermissionData,
  ChatInputApplicationCommandData,
  Client,
  CommandInteraction,
  GuildApplicationCommandManager,
} from 'discord.js';
import { Collection } from 'discord.js';
import { getGuild } from './utils';
import * as fox from './fox';
import { helpDefinitoinCreator } from './help';
import { join, leave } from './vc';

export interface CommandDefinition {
  data: ChatInputApplicationCommandData;
  permissions?: ApplicationCommandPermissionData[];
  handle(interaction: CommandInteraction<'cached'>): Promise<void>;
}

class CommandManager {
  #commandDefinitions = new Collection<string, CommandDefinition>();

  constructor(commandDefinitions: CommandDefinition[], help = true) {
    if (help)
      commandDefinitions.push(helpDefinitoinCreator(commandDefinitions));

    commandDefinitions.forEach((d) => {
      this.#commandDefinitions.set(d.data.name, d);
    });
  }

  async register(client: Client<true>) {
    const guild = await getGuild(client);
    if (await this.#hasCommandChanged(guild.commands)) {
      const commands = await guild.commands.set(
        this.#commandDefinitions.map((d) => d.data)
      );
      await Promise.all(
        commands.map((command) => {
          const permissions = this.#commandDefinitions.get(
            command.name
          )?.permissions;
          return permissions
            ? command.permissions.set({ permissions })
            : undefined;
        })
      );
    }
  }

  async handle(interaction: CommandInteraction<'cached'>) {
    return this.#commandDefinitions
      .get(interaction.commandName)
      ?.handle(interaction);
  }

  async #hasCommandChanged(commands: GuildApplicationCommandManager) {
    const currentCommands = await commands.fetch({});
    return (
      currentCommands.size !== this.#commandDefinitions.size ||
      currentCommands.some((command) => {
        const definition = this.#commandDefinitions.get(command.name);
        if (!definition?.data) return true;
        return !command.equals(definition.data);
      })
    );
  }
}

const commands = new CommandManager([fox, join, leave]);
export default commands;
