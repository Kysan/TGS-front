import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../app-config";

const registerUser = async ({ username, email, password }) => {
  try {
    const { data: user } = await axios.post(API_URL + "/users/register", { username, email, password })
    return user
  } catch (error) {
    if (error.response.data.message)
      toast.error(error.response.data.message)
    else
      toast.error(error.toString())
    return null
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const { data: { token, user } } = await axios.post(API_URL + "/users/login", { email, password })
    return { token, user }
  } catch (error) {
    if (error.response.data.message)
      toast.error(error.response.data.message)
    else
      toast.error(error.toString())
    return null
  }
};


export { registerUser, loginUser };
