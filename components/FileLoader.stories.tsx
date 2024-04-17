import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FileLoader } from "./FileLoader";

const meta = {
  title: "Components/FileLoader",
  component: FileLoader,
  parameters: {
    layout: "centered",
  },
	args: {
		onFileUpload: fn(),
	},
  tags: ["autodocs"],
} satisfies Meta<typeof FileLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
		accept: ".json",
  },
};
