import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL
// Bejelentkezés
export const login = async (username, password) => {
    const response = await axios.post(`${baseURL}/login`, {username,password});
    return response.data;
};


export const readTodos = async () => {
    const response = await axios.get(`${baseURL}`);
    return response.data;
};

export const addTodo = async (newTodo) => {
    const response = await axios.post(`${baseURL}`, newTodo);
    return response.data;
};

export const deleteTodo = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
};

export const updateTodo=async (id)=>{
    const response = await axios.patch(`${baseURL}/complete/${id}`);
    return response.data;
}