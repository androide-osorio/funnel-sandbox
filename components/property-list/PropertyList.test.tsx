import React from "react";
import { render, screen } from "@testing-library/react";
import { PropertyList } from "./PropertyList";

describe("PropertyList", () => {
  it("renders properties", () => {
    const properties = [
      { name: "Property 1", value: "Value 1", type: "color" },
      { name: "Property 2", value: "Value 2", type: "text" },
      { name: "Property 3", value: "Value 3", type: "text" },
    ];
    render(<PropertyList data={properties} />);
    properties.forEach((property, index) => {
      const nameElement = screen.getByText(property.name);
      const valueElement = screen.getByText(property.value);
      expect(nameElement).toBeInTheDocument();
      expect(valueElement).toBeInTheDocument();
    });
  });
});
