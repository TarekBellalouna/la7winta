import axios from "axios";
import { PASSWORD_RESET_SUCCESS, PASSWORD_ERROR } from "./PasswordTypes";

export const passwordReset = (user) => async (dispatch) => {
  console.log("res pass")
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    
    const { data } = await axios.put('http://localhost:5000/user/reset-password', user, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PASSWORD_ERROR,
      payload: message,
    });
  }
};
