import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, findAllByTestId, fireEvent } from "@testing-library/react";
import Blogs from "./Blogs";

test("Renders content", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 10,
    user: "123"
  };

  const component = render(<Blogs blog={blog} />);

  const titleauth = component.container.querySelector(".titleauth");
  expect(titleauth).toHaveTextContent("test title test author");

  const likes = component.container.querySelector(".likes");
  expect(likes).toHaveTextContent("blog has 10 likes");
});

test("clicking the button twice", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 10,
    user: "123"
  };

  const mockHandler = jest.fn();

  const { getByText } = render(<Blogs blog={blog} onClick={mockHandler} />);

  const button = getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
