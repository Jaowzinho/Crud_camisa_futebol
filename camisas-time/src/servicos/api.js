import axios from 'axios';

const API_BASE = "https://api-camisas-production.up.railway.app";

// Buscar todas as camisas
export async function fetchCamisas() {
  try {
    const response = await axios.get(`${API_BASE}/camisas`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar camisas:", error);
    return [];
  }
}

// Adicionar nova camisa
export async function adicionarCamisa(camisa) {
  try {
    const response = await axios.post(`${API_BASE}/camisas`, camisa);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar camisa:", error);
    throw error;
  }
}

// Deletar camisa por ID
export async function deletarCamisa(idCamisa) {
  try {
    await axios.delete(`${API_BASE}/camisas/${idCamisa}`);
    return true;
  } catch (error) {
    console.error("Erro ao deletar camisa:", error);
    return false;
  }
}

// Atualizar camisa por ID
export async function atualizarCamisa(idCamisa, camisaAtualizada) {
  try {
    const response = await axios.put(`${API_BASE}/camisas/${idCamisa}`, camisaAtualizada);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar camisa:", error);
    throw error;
  }
}
