import axios from 'axios';

const API_BASE = "https://api-camisas-production.up.railway.app";

export async function fetchCamisas() {
  try {
    const response = await axios.get(`${API_BASE}/camisas`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar camisas:", error);
    return [];
  }
}

export async function adicionarCamisa(camisa) {
  try {
    const response = await axios.post(`${API_BASE}/camisas`, camisa);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar camisa:", error);
    throw error;
  }
}
