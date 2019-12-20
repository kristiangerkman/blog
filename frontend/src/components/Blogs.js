import React from "react";
import { connect } from "react-redux";
import Blog from "./Blog";
/* const Blogs = ({ blog, addLike, userId, removePost }) => {
  const [visible, setVisible] = useState(false);



  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5
  };

  const likesStyle = {
    display: "inline-block",
    marginRight: 5
  };

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          <p>
            {blog.title} by {blog.author}
          </p>
          <p>{blog.url}</p>
          <p style={likesStyle}>{blog.likes} likes </p>
          <button onClick={() => addLike(blog)}>Like</button>
          <p>added by {blog.user.name}</p>
          <button onClick={() => setVisible(!visible)}>close</button>
          {removeButton()}
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <div onClick={() => setVisible(!visible)}>
          <p>
            {blog.title} by {blog.author}
          </p>
        </div>
      </div>
    );
  }
}; */

const Blogs = props => {
  return (
    <div>
      {" "}
      {props.blogs.map(blog => (
        <Blog blog={blog} key={blog.id} />
      ))}{" "}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

const connectedBlogs = connect(mapStateToProps, null)(Blogs);

export default connectedBlogs;
