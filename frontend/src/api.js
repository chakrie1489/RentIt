import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const client = axios.create({ baseURL: backendUrl });

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { headers: { token } } : {};
}

export async function getItems({ lng, lat, radius } = {}) {
  const params = {};
  if (lng && lat) {
    params.lng = lng;
    params.lat = lat;
    if (radius) params.radius = radius;
  }
  const res = await client.get("/api/items", { params });
  return res.data;
}

export async function getItem(id) {
  const res = await client.get(`/api/items/${id}`);
  return res.data;
}

export async function createItem(body) {
  const res = await client.post(`/api/items`, body, authHeaders());
  return res.data;
}

export async function uploadItem(formData) {
  const token = localStorage.getItem('token');
  const res = await client.post(`/api/items/upload`, formData, { headers: { token, 'Content-Type': 'multipart/form-data' } });
  return res.data;
}

export async function getMyItems() {
  const res = await client.get(`/api/items/owner/mine`, authHeaders());
  return res.data;
}

export async function uploadOnly(formData) {
  const token = localStorage.getItem('token');
  const res = await client.post(`/api/items/upload-only`, formData, { headers: { token, 'Content-Type': 'multipart/form-data' } });
  return res.data;
}

export async function updateItem(id, body) {
  const res = await client.put(`/api/items/${id}`, body, authHeaders());
  return res.data;
}

export async function createRequest(body) {
  const res = await client.post(`/api/requests`, body, authHeaders());
  return res.data;
}

export async function getAllRequests(category, sortBy) {
  const params = {};
  if (category) params.category = category;
  if (sortBy) params.sortBy = sortBy;
  const res = await client.get(`/api/requests`, { params });
  return res.data;
}

export async function getRequest(id) {
  const res = await client.get(`/api/requests/${id}`);
  return res.data;
}

export async function getMyRequests() {
  const res = await client.get(`/api/requests/user/my`, authHeaders());
  return res.data;
}

export async function closeRequest(requestId, status) {
  const res = await client.patch(`/api/requests/${requestId}/close`, { status }, authHeaders());
  return res.data;
}

export async function deleteRequest(requestId) {
  const res = await client.delete(`/api/requests/${requestId}`, authHeaders());
  return res.data;
}

// Rating APIs
export async function createRating(body) {
  const res = await client.post(`/api/ratings/create`, body, authHeaders());
  return res.data;
}

export async function getUserRatings(userId) {
  const res = await client.get(`/api/ratings/user/${userId}`);
  return res.data;
}

export async function getRating(fromUserId, toUserId, orderId) {
  const params = { fromUserId, toUserId, orderId };
  const res = await client.get(`/api/ratings/check`, { params });
  return res.data;
}

export async function getUserRatingSummary(userId) {
  const res = await client.get(`/api/ratings/summary/${userId}`);
  return res.data;
}

export async function getUserRatingsBench(userId) {
  const res = await client.get(`/api/ratings/bench/${userId}`);
  return res.data;
}

export default client;
