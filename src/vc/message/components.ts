import {
  BaseMessageComponentOptions,
  MessageActionRowOptions,
  MessageComponentInteraction,
} from 'discord.js';

export const components: (Required<BaseMessageComponentOptions> &
  MessageActionRowOptions)[] = [
  {
    type: 'ACTION_ROW',
    components: [
      {
        type: 'BUTTON',
        style: 'PRIMARY',
        customId: 'close',
        label: 'わかった！',
      },
    ],
  },
];

export async function handle(
  interaction: MessageComponentInteraction<'cached'>
) {
  await interaction.reply({
    ephemeral: true,
    content: '(^・ω・^)ノ こやーん（あなた違う人？）',
  });
}
