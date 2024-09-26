import axios from "axios";

const BASE_URL = "http://94.74.86.174:8080/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token available");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fungsi untuk mendapatkan todos
export const getTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/checklist`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan todo
export const addTodo = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/checklist`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Fungsi untuk menghapus todo berdasarkan id
export const removeTodo = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/checklist/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error removing todo:", error);
    throw error;
  }
};

// Fungsi untuk mengedit todo
export const editTodo = async (data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/checklist/${data.id}`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error editing todo:", error);
    throw error;
  }
};
