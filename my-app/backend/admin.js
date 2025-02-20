import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./JwtUtils"

const API_BASE_URL = "http://localhost:8080/api/admin";
 
const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  console.log("token : " , token)

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

 
export const usePendingUsers = () => {
  return useQuery({
    queryKey: ["pendingUsers"],
    queryFn: () => fetchWithAuth("/pending-users"),
  });
};

 
export const useApproveUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fetchWithAuth(`/approve-user/${id}`, { method: "PUT" }),
    onSuccess: () => queryClient.invalidateQueries(["pendingUsers"]),
  });
};

 
export const useRejectUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fetchWithAuth(`/reject-user/${id}`, { method: "PUT" }),
    onSuccess: () => queryClient.invalidateQueries(["pendingUsers"]),
  });
};

 
export const usePendingBlogs = () => {
  return useQuery({
    queryKey: ["pendingBlogs"],
    queryFn: () => fetchWithAuth("/pending-blogs"),
  });
};

 
export const useApproveBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fetchWithAuth(`/approve-blog/${id}`, { method: "PUT" }),
    onSuccess: () => queryClient.invalidateQueries(["pendingBlogs"]),
  });
};
 
export const useRejectBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fetchWithAuth(`/reject-blog/${id}`, { method: "PUT" }),
    onSuccess: () => queryClient.invalidateQueries(["pendingBlogs"]),
  });
};


export const fetchDashboardStats = async () => {
  const token = localStorage.getItem("token"); 
  const response = await fetch("http://localhost:8080/api/admin/dashboard-stats", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();
};
