import axios from "axios";

const API_BASE = "https://assignment.stage.crafto.app";

export const loginUser = async (username, otp) => {
  const response = await axios.post(`${API_BASE}/login`, { username, otp });
  return response.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log(response);
  return response.data[0].url;
};

export const createQuote = async (token, data) => {
  const response = await axios.post(`${API_BASE}/postQuote`, data, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const fetchQuotes = async (token, limit, offset) => {
  const response = await axios.get(`${API_BASE}/getQuotes`, {
    headers: { Authorization: token },
    params: { limit, offset },
  });
  return response.data?.data;
};
