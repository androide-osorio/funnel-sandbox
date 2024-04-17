import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tabs, Tab, TabProps } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "horizontal",
		initialValue: "tab1",
  },
	render: (args) => {
		return (
      <Tabs {...args}>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
        <Tab value="tab4">Tab 4</Tab>
      </Tabs>
    );
	}
};

/**
 * Tabs support vertical and horizontal orientations using the `variant` prop.
 */
export const Vertical: Story = {
	...Primary,
	args: {
		variant: "vertical",
		initialValue: 'tab1'
	},
};

/**
 * Tabs can be initialized with a specific tab already selected using the `initialValue` prop.
 */
export const WithInitialValue: Story = {
	...Primary,
	args: {
		initialValue: 'tab3'
	},
};
