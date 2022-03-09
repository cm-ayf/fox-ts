import { MessageEmbedOptions } from 'discord.js';
import { embed } from '../base';
import packageJson from '../../../package.json';
import { CommandDefinition } from '../../commands';

export function embedsCreator(
  definitions: CommandDefinition[]
): MessageEmbedOptions[] {
  return [
    {
      ...embed,
      title: 'コマンド一覧',
      url: packageJson.homepage,
      fields: definitions.map(({ data }) => ({
        name: data.name,
        value: data.description,
      })),
      footer: {
        text: `${packageJson.name} ${packageJson.version}`,
      },
    },
  ];
}
