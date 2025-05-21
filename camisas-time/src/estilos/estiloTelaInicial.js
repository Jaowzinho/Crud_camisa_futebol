// src/telas/estiloTelaInicial.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  cartao: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 4,
  },
  imagem: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preco: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
  icones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  iconeAcao: {
    width: 24,
    height: 24,
  },
  barraInferior: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 20,
  },
  iconeBarra: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  logo: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
    maxWidth: '100%',
  },
});
