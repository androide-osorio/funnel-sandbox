import type { Meta, StoryObj } from "@storybook/react";
import { CodeEditor } from "./CodeEditor";

const meta = {
  title: "Components/CodeEditor",
  component: CodeEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    code: `{
	"name": "John Doe",
	"age": 30,
	"email": "hello@johndoe.net"
}`,
		language: "json",
  },
};

export const Editable: Story = {
	args: {
		...Primary.args,
		editable: true,
	},
};
