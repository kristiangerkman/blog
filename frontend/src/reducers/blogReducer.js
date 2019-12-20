import blogServices from "../services/blogs";

export const initBlogs = () => {
  return async dispatch => {
    const content = await blogServices.getAll();
    dispatch({ type: "INIT_BLOG", data: content });
  };
};

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogServices.newBlog(content);
      dispatch({ type: "CREATE_BLOG", data: newBlog });
    } catch (e) {
      console.log(e);
    }
  };
};

export const removeBlog = id => {
  return async dispatch => {
    try {
      await blogServices.deletePost(id);
      dispatch({ type: "DELETE_BLOG", data: id });
    } catch (e) {
      console.log(e);
    }
  };
};

export const likeBlog = blog => {
  console.log(blog);
  const likedBlog = { ...blog, likes: blog.likes + 1 };
  console.log(likedBlog);
  return async dispatch => {
    try {
      const updatedBlog = await blogServices.update(blog.id, likedBlog);
      console.log(updatedBlog);
      dispatch({ type: "LIKE_BLOG", data: updatedBlog });
    } catch (e) {
      console.log(e);
    }
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOG":
      return action.data;
    case "CREATE_BLOG":
      return [...state, action.data];
    case "DELETE_BLOG":
      const updatedBlogs = state.find(n => n.id !== action.data.id);
      state = updatedBlogs;
      return state;
    case "LIKE_BLOG":
      const likedBlog = action.data;
      return state.map(b => (b.id !== action.data.id ? b : likedBlog));
    default:
      return state;
  }
};

export default blogReducer;
