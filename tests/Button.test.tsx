import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../components/button/Button"; 
import '@testing-library/jest-dom'; 

describe("Button Component", () => {
  it("should render the button with provided text", () => {
    render(<Button style="btn-primary" text="Click Me" click={() => {}} />);

    // Verify if the button text is rendered correctly
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should trigger the click event when clicked", () => {
    // Create a mock function for the click event
    const handleClick = vi.fn();

    render(<Button style="btn-primary" text="Click Me" click={handleClick} />);

    // Get the button element
    const buttonElement = screen.getByText("Click Me");

    // Simulate a click event
    fireEvent.click(buttonElement);

    // Ensure the click event has been called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply the correct styles", () => {
    render(<Button style="btn-primary" text="Click Me" click={() => {}} />);

    // Get the button element
    const buttonElement = screen.getByText("Click Me");

    // Check if the className includes the provided style
    expect(buttonElement).toHaveClass("btn-primary");
    expect(buttonElement).toHaveClass("backdrop-blur-md");
    expect(buttonElement).toHaveClass("hover:text-white");
  });
});
