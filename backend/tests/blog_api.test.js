const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObj = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObj.map(blog => blog.save());

  await Promise.all(promiseArray);
});

test("all blogs are returned", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body.length).toBe(helper.initialBlogs.length);
});

test("specific blog title", async () => {
  const res = await api.get("/api/blogs");
  const titles = res.body.map(r => r.title);
  expect(titles).toContain("React patterns");
});

test("adding new blog and checking if it added to total", async () => {
  const newBlog = {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");

  const titles = res.body.map(r => r.title);

  expect(res.body.length).toBe(helper.initialBlogs.length + 1);
  expect(titles).toContain("First class tests");
});

test("blog without title is not added", async () => {
  const newBlog = {
    _id: "5a422b891b54a676234d17fa",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);

  const res = await api.get("/api/blogs");
  expect(res.body.length).toBe(helper.initialBlogs.length);
});

test("a blog can be deleted", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToBeDeleted = blogAtStart[0];

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(blogAtStart.length - 1);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", password: "sekret" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("password is not atleast 3 char long", async () => {
    const initialDb = await helper.usersInDb();
    const newUser = {
      username: "test",
      name: "test",
      password: "12"
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(initialDb.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
