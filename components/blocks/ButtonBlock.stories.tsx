import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ButtonBlock } from './ButtonBlock';

const meta = {
	title: 'Blocks/Button',
	component: ButtonBlock,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		bgColor: { control: 'color' },
		color: { control: 'color' },
	},
} satisfies Meta<typeof ButtonBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		id: 'button-1',
		text: 'Button',
	},
};

export const CustomBgColor: Story = {
	args: {
		...Primary.args,
		bgColor: '#f00',
	},
};

export const TextColor: Story = {
	args: {
		...Primary.args,
		color: '#172554',
	},
};
