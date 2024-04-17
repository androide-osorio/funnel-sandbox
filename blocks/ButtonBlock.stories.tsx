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

/**
 * The button has a blue background by default, and an distinct ID is required.
 */
export const Primary: Story = {
	args: {
		id: 'button-1',
		text: 'Button',
	},
};

/**
 * You can change button's background color with the `bgColor` prop.
 */
export const CustomBgColor: Story = {
	args: {
		...Primary.args,
		bgColor: '#f00',
	},
};

/**
 * You can change button's text color with the `color` prop.
 */
export const TextColor: Story = {
	args: {
		...Primary.args,
		color: '#172554',
	},
};
