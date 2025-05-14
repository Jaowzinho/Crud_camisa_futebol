import axios from "axios"; // Importa a biblioteca Axios para fazer requisições HTTP

// Função assíncrona para buscar os dados das cartas da API
export async function fetchCards() {
    try {
        // Faz uma requisição GET para a API local que fornece os dados das cartas
        const response = await axios.get("http://191.204.208.99:3000/camisas");

        // Retorna os itens dentro da resposta da API, ou um array vazio caso não existam itens
        return response.data.items || [];
    } catch (error) {
        // Captura e exibe no console qualquer erro que ocorra durante a requisição
        console.error("Erro na API:", error);
        
        // Retorna um array vazio em caso de erro para evitar que o código que consome essa função quebre
        return [];
    }
}
