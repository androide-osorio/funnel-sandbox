import type { Meta, StoryObj } from '@storybook/react';
import { TextBlock } from './TextBlock';

const meta = {
	title: 'Blocks/TextBlock',
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

export const CustomColor: Story = {
	args: {
		...Primary.args,
		color: '#f00',
	},
};

export const CustomAlignment: Story = {
	args: {
		...Primary.args,
		align: 'center',
	},
};
