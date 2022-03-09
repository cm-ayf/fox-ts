import {
  BaseMessageComponentOptions,
  MessageActionRowOptions,
  MessageComponentInteraction,
} from 'discord.js';

export const components: (Required<BaseMessageComponentOptions> &
  MessageActionRowOptions)[] = [
  {
    type: 'ACTION_ROW',
    components: [],
  },
];

export function handle(interaction: MessageComponentInteraction<'cached'>) {
  interaction.message.delete();
}
