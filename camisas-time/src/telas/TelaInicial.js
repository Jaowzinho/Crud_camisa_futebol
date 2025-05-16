import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchCamisas, adicionarCamisa as adicionarCamisaAPI } from '../servicos/api';

export default function TelaInicial() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [tamanho, setTamanho] = useState('M');
  const [preco, setPreco] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [camisas, setCamisas] = useState([]);

  useEffect(() => {
    async function carregarCamisas() {
      const dados = await fetchCamisas();
      console.log("Dados recebidos da API:", dados);

      // Mapear os dados da API para o formato esperado no app
      const camisasFormatadas = dados.map(item => ({
        id: item.idCamisa,
        nome: item.nomeCamisa,
        ano: item.anoCamisa,
        tamanho: item.tamanhoCamisa,
        preco: item.precoCamisa,
        imagem: item.urlImg,
      }));

      setCamisas(camisasFormatadas);
    }
    carregarCamisas();
  }, []);

  const adicionarCamisa = async () => {
    // Converte preco para número (se estiver como string)
    const precoNum = parseFloat(preco.replace(',', '.'));
    if (!nome || !ano || !tamanho || !precoNum || !imagemUrl) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const novaCamisa = {
      nome,
      ano: parseInt(ano, 10),
      tamanho,
      preco: precoNum,
      imagem: imagemUrl,
    };

    try {
      const camisaSalva = await adicionarCamisaAPI(novaCamisa);

      // Também mapeia o objeto retornado da API para o formato do app
      const camisaFormatada = {
        id: camisaSalva.idCamisa,
        nome: camisaSalva.nomeCamisa,
        ano: camisaSalva.anoCamisa,
        tamanho: camisaSalva.tamanhoCamisa,
        preco: camisaSalva.precoCamisa,
        imagem: camisaSalva.urlImg,
      };

      setCamisas([...camisas, camisaFormatada]);
      setModalVisivel(false);
      // Limpa campos
      setNome('');
      setAno('');
      setTamanho('M');
      setPreco('');
      setImagemUrl('');
    } catch (error) {
      alert('Erro ao adicionar camisa.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Image 
          source={require('../assets/icon.png')} 
          style={styles.logo}
        />
      </View>

      <FlatList
        data={camisas}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Image 
              source={{ uri: item.imagem || 'https://via.placeholder.com/400x400?text=Sem+imagem' }} 
              style={styles.imagem} 
            />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>{item.ano}</Text>
              <Text>{item.tamanho}</Text>
              <Text style={styles.preco}>
                {typeof item.preco === 'number' ? `R$ ${item.preco.toFixed(2)}` : item.preco}
              </Text>
            </View>
            <View style={styles.icones}>
              <TouchableOpacity>
                <Image source={require('../assets/editar.png')} style={styles.iconeAcao} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../assets/deletar.png')} style={styles.iconeAcao} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.barraInferior}>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image source={require('../assets/mais.png')} style={styles.iconeBarra} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/bola.png')} style={styles.iconeBarra} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/lupa.png')} style={styles.iconeBarra} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Adicionar Camisa</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              value={ano}
              onChangeText={setAno}
              keyboardType="numeric"
            />

            <View style={[styles.input, { height: 42, justifyContent: 'center' }]}>
              <Picker
                selectedValue={tamanho}
                onValueChange={(itemValue) => setTamanho(itemValue)}
                style={{ color: '#000' }}
                dropdownIconColor="#000"
              >
                <Picker.Item label="P" value="P" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="G" value="G" />
                <Picker.Item label="GG" value="GG" />
                <Picker.Item label="XG" value="XG" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Preço"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="URL da Imagem"
              value={imagemUrl}
              onChangeText={setImagemUrl}
              autoCapitalize="none"
            />
            <Button title="Adicionar" onPress={adicionarCamisa} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisivel(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
