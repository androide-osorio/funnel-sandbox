import React from "react";
import { useState } from "react";

type TabProps = {
  value: string;
  children: React.ReactNode;
};

type TabsProps = {
  children: React.ReactNode;
	initialValue?: string;
  variant?: "horizontal" | "vertical";
  onChange: (newTab: string) => void;
};

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

export const Tabs = ({ variant, initialValue, children, onChange, ...rest }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialValue ?? "");

  const handleChange = (newTab: string) => {
    setActiveTab(newTab);
    onChange(newTab);
  };

  const commonTabStyles =
    "whitespace-nowrap font-medium text-sm focus:outline-none";
  const verticalTabStyles = "border-l-2 px-4 py-1";
  const horizontalTabStyles = "border-b-2 px-1 py-4";

  return (
    <nav
      className={`flex ${
        variant === "vertical" ? "flex-col" : "flex-row"
      } -mb-px gap-2`}
      aria-label="Tabs"
      role="tablist"
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        const { value } = child.props;

        return (
          <button
            className={`${
              activeTab === value
                ? "border-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
                : "border-transparent hover:text-gray-700 hover:dark:text-gray-300 hover:border-gray-300"
            } ${commonTabStyles} ${
              variant === "vertical" ? verticalTabStyles : horizontalTabStyles
            }`}
            onClick={() => handleChange(value)}
            role="tab"
          >
            {child.props.children}
          </button>
        );
      })}
    </nav>
  );
};
