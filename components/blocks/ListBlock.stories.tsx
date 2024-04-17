import type { Meta, StoryObj } from '@storybook/react';
import { ListBlock } from './ListBlock';

const meta = {
	title: 'Blocks/List',
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

/**
 * List blocks can have a horizontal layout by setting the `layout` prop to `hstack`.
 */
export const VStack: Story = {
	args: {
		...Primary.args,
		layout: 'vstack',
	},
	name: 'Vertical Stack',
};

/**
 * List blocks can have a vertical (column) layout by setting the `layout` prop to `hstack`.
 */
export const HStack: Story = {
	args: {
		...Primary.args,
		layout: 'hstack',
	},
	name: 'Horizontal Stack',
};

/**
 * List support a 2-column grid by default with the `layout` prop set to `grid`.
 */
export const Grid: Story = {
	args: {
		...Primary.args,
		layout: 'grid',
	},
};
