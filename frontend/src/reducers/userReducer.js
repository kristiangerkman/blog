import loginService from "../services/login";
import BlogService from "../services/blogs";

export const setUser = data => {
  return async dispatch => {
    dispatch({
      type: "SET_USER",
      data: {
        user: data.user,
        token: data.token
      }
    });
  };
};

export const userLogin = credintials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credintials);
      dispatch({
        type: "LOGIN",
        data: {
          user: { username: user.username, name: user.name, id: user.id },
          token: user.token
        }
      });
      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          user: { username: user.username, name: user.name, id: user.id },
          token: user.token
        })
      );
      BlogService.setToken(user.token);
    } catch (e) {
      //add notification "login failed"
      console.log(e);
    }
  };
};

/* export const userRegister = credintials => {
  return async dispatch => {
    await userService.userRegister(credintials);
    const user = await userService.userLogin(credintials);
    //dispatch login
    console.log(user);
  };
}; */

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.data;
      console.log(state);
      return state;
    case "LOGIN":
      state = { ...action.data };
      console.log(state);
      return state;
    case "LOGOUT":
      state = null;
      return state;
    default:
      return state;
  }
};

export default userReducer;
