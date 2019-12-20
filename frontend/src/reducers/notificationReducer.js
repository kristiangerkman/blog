const timer = ms => {
  return new Promise(res => setTimeout(res, ms));
};

export const setNotification = (content, ms) => {
  return async dispatch => {
    dispatch({
      type: "NOTIFICATION",
      content
    });
    await timer(ms);
    dispatch({
      type: "HIDE"
    });
  };
};

const notificationReducer = (
  state = { notification: "", show: false },
  action
) => {
  switch (action.type) {
    case "NOTIFICATION":
      return {
        notification: action.content,
        show: true
      };

    case "HIDE":
      return { notification: "", show: false };
    default:
      return state;
  }
};

export default notificationReducer;
