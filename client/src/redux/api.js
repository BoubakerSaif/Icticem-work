import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3010" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const createVisit = (visitData) => API.post("/visit", visitData);
export const getVisits = () => API.get("/visit");
export const getVisit = (id) => API.get(`/visit/${id}`);
export const deleteVisit = (id) => API.delete(`/visit/${id}`);
export const updatedVisit = (updatedVisitData, id) =>
  API.put(`/visit/${id}`, updatedVisitData);
