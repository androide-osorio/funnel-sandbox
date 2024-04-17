import type { Meta, StoryObj } from "@storybook/react";
import { PropertyList } from "./PropertyList";

const meta = {
  title: "Components/PropertyList",
  component: PropertyList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PropertyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [
      { name: "Name", value: "John Doe", type: "text" },
      { name: "Age", value: '30', type: "number" },
      { name: "Email", value: "#ff0000", type: "color" },
    ],
  },
};
