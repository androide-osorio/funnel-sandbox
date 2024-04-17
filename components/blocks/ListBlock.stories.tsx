import type { Meta, StoryObj } from '@storybook/react';
import { ListBlock } from './ListBlock';

const meta = {
	title: 'Blocks/ListBlock',
	component: ListBlock,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ListBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		id: 'list-1',
		items: [
			{
				"src": "https://img.icons8.com/0076FF/win10/247/kawaii-soda",
				title: 'A beautiful image',
				description: 'A beautiful image',
			},
			{
				"src": "https://img.icons8.com/0076FF/win10/247/kawaii-cupcake",
				title: 'A beautiful image',
				description: 'A beautiful image',
			},
		],
	},
};

export const VStack: Story = {
	args: {
		...Primary.args,
		layout: 'vstack',
	},
	name: 'Vertical Stack',
};

export const HStack: Story = {
	args: {
		...Primary.args,
		layout: 'hstack',
	},
	name: 'Horizontal Stack',
};

export const Grid: Story = {
	args: {
		...Primary.args,
		layout: 'grid',
	},
};
