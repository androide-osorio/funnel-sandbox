import type { Meta, StoryObj } from '@storybook/react';
import { ImageBlock } from './ImageBlock';

const meta = {
	title: 'Blocks/Image',
	component: ImageBlock,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ImageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		id: 'image-1',
		src: 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
		alt: 'A beautiful image',
	},
};
