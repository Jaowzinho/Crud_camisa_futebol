// TelaInicial.js
import { Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  fetchCamisas,
  adicionarCamisa as adicionarCamisaAPI,
  deletarCamisa as deletarCamisaAPI,
  atualizarCamisa as atualizarCamisaAPI,
} from '../servicos/api';
import styles from '../estilos/estiloTelaInicial';

export default function TelaInicial() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalConfirmacaoVisivel, setModalConfirmacaoVisivel] = useState(false);
  const [camisaParaExcluir, setCamisaParaExcluir] = useState(null);

  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [tamanho, setTamanho] = useState('M');
  const [preco, setPreco] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [camisas, setCamisas] = useState([]);
  const [camisaEmEdicao, setCamisaEmEdicao] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [mostrarBusca, setMostrarBusca] = useState(false);


  const camisasFiltradas = camisas.filter(camisa =>
    camisa.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );
  


  useEffect(() => {
    carregarCamisas();
  }, []);

  async function carregarCamisas() {
    const dados = await fetchCamisas();
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

  const adicionarCamisa = async () => {
    const precoNum = parseFloat(preco.replace(',', '.'));
    if (!nome || !ano || !tamanho || isNaN(precoNum) || !imagemUrl) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const novaCamisa = {
      nomeCamisa: nome,
      anoCamisa: parseInt(ano, 10),
      tamanhoCamisa: tamanho,
      precoCamisa: precoNum,
      urlImg: imagemUrl,
    };

    try {
      const camisaSalva = await adicionarCamisaAPI(novaCamisa);
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
      limparFormulario();
    } catch (error) {
      alert('Erro ao adicionar camisa.');
      console.error(error);
    }
  };

  const atualizarCamisa = async () => {
    const precoNum = parseFloat(preco.replace(',', '.'));
    if (!camisaEmEdicao || !nome || !ano || !tamanho || isNaN(precoNum) || !imagemUrl) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
  
    const camisaAtualizada = {
      idCamisa: camisaEmEdicao.id,
      nomeCamisa: nome,
      anoCamisa: parseInt(ano, 10),
      tamanhoCamisa: tamanho,
      precoCamisa: precoNum,
      urlImg: imagemUrl,
    };
  
    try {
      const camisaEditada = await atualizarCamisaAPI(camisaAtualizada.idCamisa, camisaAtualizada);
      if (camisaEditada) {
        setCamisas(camisas.map(c =>
          c.id === camisaEditada.idCamisa ? {
            ...c,
            nome: camisaEditada.nomeCamisa,
            ano: camisaEditada.anoCamisa,
            tamanho: camisaEditada.tamanhoCamisa,
            preco: camisaEditada.precoCamisa,
            imagem: camisaEditada.urlImg,
          } : c
        ));
        setModalVisivel(false);
        limparFormulario();
      } else {
        alert('Erro ao editar camisa.');
      }
    } catch (error) {
      alert('Erro ao editar camisa.');
      console.error(error);
    }
  };
  

  const iniciarEdicao = (camisa) => {
    setCamisaEmEdicao(camisa);
    setNome(camisa.nome);
    setAno(camisa.ano.toString());
    setTamanho(camisa.tamanho);
    setPreco(camisa.preco.toString());
    setImagemUrl(camisa.imagem);
    setModalVisivel(true);
  };

  const confirmarExclusao = (camisa) => {
    setCamisaParaExcluir(camisa);
    setModalConfirmacaoVisivel(true);
  };

  const deletarCamisa = async () => {
    try {
      const sucesso = await deletarCamisaAPI(camisaParaExcluir.id);
      if (sucesso) {
        setCamisas(camisas.filter(c => c.id !== camisaParaExcluir.id));
        setModalConfirmacaoVisivel(false);
        setCamisaParaExcluir(null);
      } else {
        alert('Erro ao deletar a camisa.');
      }
    } catch (erro) {
      alert('Erro ao deletar camisa.');
      console.error(erro);
    }
  };

  const limparFormulario = () => {
    setNome('');
    setAno('');
    setTamanho('M');
    setPreco('');
    setImagemUrl('');
    setCamisaEmEdicao(null);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
      </View>

      {mostrarBusca && (
  <TextInput
    style={styles.input}
    placeholder="Buscar camisa por nome..."
    value={termoBusca}
    onChangeText={setTermoBusca}
    onSubmitEditing={() => {
      setMostrarBusca(false);
      Keyboard.dismiss();
    }}    
    returnKeyType="search"
  />
)}



      <FlatList
        data={camisasFiltradas}
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
              <TouchableOpacity onPress={() => iniciarEdicao(item)}>
                <Image source={require('../assets/editar.png')} style={styles.iconeAcao} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarExclusao(item)}>
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
        <TouchableOpacity onPress={() => {
        setMostrarBusca(false);
        setTermoBusca('');
        }}>
              <Image source={require('../assets/bola.png')} style={styles.iconeBarra} />
</TouchableOpacity>
        <TouchableOpacity onPress={() => setMostrarBusca(!mostrarBusca)}>
          <Image source={require('../assets/lupa.png')} style={styles.iconeBarra} />
        </TouchableOpacity>
      </View>

      {/* Modal Adicionar/Editar */}
      <Modal animationType="slide" transparent={true} visible={modalVisivel} onRequestClose={() => {
        setModalVisivel(false);
        limparFormulario();
      }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>{camisaEmEdicao ? 'Editar Camisa' : 'Adicionar Camisa'}</Text>

            <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} autoCapitalize="words" />
            <TextInput style={styles.input} placeholder="Ano" value={ano} onChangeText={setAno} keyboardType="numeric" />
            <View style={[styles.input, { height: 42, justifyContent: 'center' }]}>
              <Picker selectedValue={tamanho} onValueChange={setTamanho} style={{ color: '#000' }} dropdownIconColor="#000">
                <Picker.Item label="P" value="P" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="G" value="G" />
                <Picker.Item label="GG" value="GG" />
                <Picker.Item label="XG" value="XG" />
              </Picker>
            </View>
            <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="URL da Imagem" value={imagemUrl} onChangeText={setImagemUrl} autoCapitalize="none" />

            <Button title={camisaEmEdicao ? 'Salvar Alterações' : 'Adicionar'} onPress={camisaEmEdicao ? atualizarCamisa : adicionarCamisa} />
            <Button title="Cancelar" color="red" onPress={() => {
              setModalVisivel(false);
              limparFormulario();
            }} />
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação */}
      <Modal animationType="fade" transparent={true} visible={modalConfirmacaoVisivel} onRequestClose={() => setModalConfirmacaoVisivel(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Confirmar Exclusão</Text>
            <Text style={{ marginBottom: 20 }}>Tem certeza que deseja excluir "{camisaParaExcluir?.nome}"?</Text>
            <Button title="Sim, excluir" onPress={deletarCamisa} />
            <Button title="Cancelar" color="red" onPress={() => setModalConfirmacaoVisivel(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

