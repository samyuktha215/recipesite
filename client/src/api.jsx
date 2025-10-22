import axios from "axios";

const isPreview = import.meta.env.VITE_NETLIFY_CONTEXT !== 'production';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProtectedData = async (getAccessTokenSilently) => {
  const token = isPreview ? "preview-token" : await getAccessTokenSilently();

  const response = await api.get("/protected", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default api;
