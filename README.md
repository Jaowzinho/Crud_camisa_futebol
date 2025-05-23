## 🧢 Catálogo de Camisas

Aplicativo mobile desenvolvido em **React Native** para gerenciamento de camisas de time. O app consome uma **API REST** feita em **Java (Spring ou similar)**, possibilitando **CRUD completo** (Criar, Listar, Editar e Deletar) de camisas com imagem, preço, tamanho, ano e nome.

---

## 📚 Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Frontend](#frontend)
  - [Backend (API)](#backend-api)
- [Estrutura dos dados de uma camisa](#estrutura-dos-dados-de-uma-camisa)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Interface do Aplicativo](#interface-do-aplicativo)
- [Desenvolvedores](#desenvolvedores)

---

## 📱 Funcionalidades

* ✅ Listagem de camisas  
* ✅ Filtro por nome com barra de busca  
* ✅ Adição de novas camisas  
* ✅ Edição de camisas existentes  
* ✅ Remoção de camisas com confirmação  
* ✅ Modal para formulário de cadastro e edição  
* ✅ Barra inferior com ícones para:
  * Adicionar camisa  
  * Resetar a tela (ícone de bola)  
  * Exibir/ocultar campo de busca (ícone de lupa)  

---

## 🧩 Tecnologias Utilizadas

### Frontend

* React Native  
* React Hooks (`useState`, `useEffect`)  
* FlatList, TextInput, Modal, TouchableOpacity  
* React Native Picker (`@react-native-picker/picker`)  

### Backend (API)

* Java (Spring Boot ou Jakarta EE)  
* MySQL ou MongoDB  
* Endpoints: `GET`, `POST`, `PUT`, `DELETE`  

---

## 🖼️ Estrutura dos dados de uma camisa

```json
{
  "idCamisa": 1,
  "nomeCamisa": "São Paulo 2024",
  "anoCamisa": 2024,
  "tamanhoCamisa": "M",
  "precoCamisa": 299.99,
  "urlImg": "https://exemplo.com/camisa.png"
}
````

---

## 📁 Estrutura do Projeto

```
📁 projeto/
├── assets/
│   ├── mais.png
│   ├── bola.png
│   ├── lupa.png
│   ├── editar.png
│   └── deletar.png
├── componentes/
│   └── CartaoCamisa.js
├── estilos/
│   └── estiloTelaInicial.js
├── servicos/
│   └── api.js
├── telas/
│   └── TelaInicial.js
├── App.js
└── README.md
```

---

## 🖼️ Interface do Aplicativo

<img src="https://i.imgur.com/nyNW6mJ.jpeg" alt="Tela inicial do app" width="200"/>

---

## 👨‍💻 Desenvolvedores

* [Lucas Nicolas](https://github.com/Nicks744)
* [Guilherme Pedrosa](https://github.com/Guilherme6996)
* [João Vitor Souza](https://github.com/Jaowzinho)
* [Emylly](https://github.com/earaujo17)
