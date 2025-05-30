## 🧢 Catálogo de Camisas

Aplicativo mobile desenvolvido em **React Native** para gerenciamento de camisas de time. O app consome uma **API REST** feita em **Java (Spring boot)**, possibilitando **CRUD completo** (Criar, Listar, Editar e Deletar) de camisas com imagem, preço, tamanho, ano e nome.

---

## 📚 Sumário

- [📱 Funcionalidades](#-funcionalidades)
- [🧩 Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [Frontend](#frontend)
  - [Backend (API)](#backend-api)
- [🖼️ Estrutura dos dados de uma camisa](#%EF%B8%8F-estrutura-dos-dados-de-uma-camisa)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto-front)
- [🖼️ Interfaces do Aplicativo](#%EF%B8%8F-interfaces-do-aplicativo)
- [👨‍💻 Desenvolvedores](#-desenvolvedores)

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
 
### Backend (API)

* Java (Spring boot)  
* MySQL  
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

## 📁 Estrutura do Projeto (Front)

```
📁 camisas-time/
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

## 🖼️ Interfaces do Aplicativo

<p align="center">
  <img src="https://i.imgur.com/kT0Je1C.jpeg" alt="Tela 1" width="150"/>
  <img src="https://i.imgur.com/OfZDQqN.jpeg" alt="Tela 2" width="150"/>
  <img src="https://i.imgur.com/DFJ4feS.jpeg" alt="Tela 3" width="150"/>
  <img src="https://i.imgur.com/UxK17pQ.jpeg" alt="Tela 4" width="150"/>
  <img src="https://i.imgur.com/Jn1ScXF.jpeg" alt="Tela 5" width="150"/>
</p>

---

## 👨‍💻 Desenvolvedores

* [Lucas Nicolas](https://github.com/Nicks744)
* [Guilherme Pedrosa](https://github.com/Guilherme6996)
* [João Vitor Souza](https://github.com/Jaowzinho)
* [Emilly Araújo](https://github.com/earaujo17)
