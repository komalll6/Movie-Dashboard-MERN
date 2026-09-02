import axios from "axios";

const API_URL = "http://localhost:5000/api/search";

const getAuthHeaders = () => {
  const rawToken = localStorage.getItem("komsify_token");
  if (!rawToken || rawToken === "null" || rawToken === "undefined") return {};
  const token = rawToken.replace(/^"(.*)"$/, "$1").trim();
  return { Headers: { Authorization: `Bearer ${token}` } };
};

export const saveSearchAPI = async (query) => {
  const rawToken = localStorage.getItem("komsify_token");
  if (!rawToken) return;
  const token = rawToken.replace(/^"(.*)"$/, "$1").trim();

  return await axios.post(
    `${API_URL}/save`,
    { query },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getSearchHistoryAPI = async () => {
  const rawToken = localStorage.getItem("komsify_token");
  if (!rawToken) return { data: { data: [] } };
  const token = rawToken.replace(/^"(.*)"$/, "$1").trim();

  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};