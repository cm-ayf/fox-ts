import { CommandDefinition } from '.';
import { helpMessageCreator } from '../messages';

export function helpDefinitoinCreator(
  definitions: CommandDefinition[]
): CommandDefinition {
  return {
    data: {
      type: 'CHAT_INPUT',
      name: 'help',
      description: '使えるコマンドの一覧を表示します。',
    },
    async handle(interaction) {
      await interaction.reply({
        ephemeral: true,
        ...helpMessageCreator(definitions),
      });
    },
  };
}
