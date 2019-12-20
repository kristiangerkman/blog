import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const newBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deletePost = async id => {
  await axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, newBlog, setToken, update, deletePost };
