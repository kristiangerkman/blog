import React from "react";
import { connect } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = props => {
  const newBlogHandler = event => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    props.createBlog(newBlog);
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={newBlogHandler}>
        <p>Title:</p>
        <input type="text" name="title" />
        <br />
        <p>Author:</p>
        <input type="text" name="author" />
        <br />
        <p>URL:</p>
        <input type="text" name="url" />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default connect(null, { createBlog })(BlogForm);
