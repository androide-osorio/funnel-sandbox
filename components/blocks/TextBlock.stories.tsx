import type { Meta, StoryObj } from '@storybook/react';
import { TextBlock } from './TextBlock';

const meta = {
	title: 'Blocks/Text',
	component: TextBlock,
	tags: ['autodocs'],
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		id: 'list-1',
		text: 'This is a text block',
	},
};

/**
 * You can change the text color with the `color` prop.
 */
export const CustomColor: Story = {
	args: {
		...Primary.args,
		color: '#f00',
	},
};

/**
 * You can change the text alignment with the `align` prop, supporting `left`, `center` and `right` alignments.
 */
export const CustomAlignment: Story = {
	args: {
		...Primary.args,
		align: 'center',
	},
};
