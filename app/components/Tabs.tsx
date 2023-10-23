import React from "react";
import { useState } from "react";

type TabProps = {
	value: string;
	children: React.ReactNode;
};

type TabsProps = {
	children: React.ReactNode;
	onChange: (newTab: string) => void;
};

export function Tab({ children }: TabProps) {
  return <>{children}</>;
};

export const Tabs = ({ children, onChange }: TabsProps) => {
	const [activeTab, setActiveTab] = useState<string>("");

	const handleChange = (newTab: string) => {
		setActiveTab(newTab);
		onChange(newTab);
	};

	return (
		<div className="border-b border-gray-200">
			<nav className="flex -mb-px space-x-8" aria-label="Tabs">
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
							} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
							onClick={() => handleChange(value)}
						>
							{child.props.children}
						</button>
					);
				})}
			</nav>
		</div>
	);
};


