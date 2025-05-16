import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function TelaInicial() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [modalExclusaoVisivel, setModalExclusaoVisivel] = useState(false);
  const [mostrarPesquisa, setMostrarPesquisa] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [tamanho, setTamanho] = useState("M");
  const [preco, setPreco] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [camisaEditando, setCamisaEditando] = useState(null);
  const [camisas, setCamisas] = useState([
    {
      id: "1",
      nome: "Camisa Nike Barcelona",
      ano: "2023/24",
      tamanho: "GG",
      preco: "R$ 379,99",
      imagem:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b85a1326-3d50-445b-8b9e-e25934969c13/camisa-ii-2023-barcelona-torcedor-pro-para-jogo-tYBLdB.png",
    },
  ]);

  const abrirEdicao = (camisa) => {
    setCamisaEditando(camisa);
    setNome(camisa.nome);
    setAno(camisa.ano);
    setTamanho(camisa.tamanho);
    setPreco(camisa.preco);
    setImagemUrl(camisa.imagem);
    setModalEditarVisivel(true);
  };

  const salvarEdicao = () => {
    const novasCamisas = camisas.map((item) =>
      item.id === camisaEditando.id
        ? { ...item, nome, ano, tamanho, preco, imagem: imagemUrl }
        : item
    );
    setCamisas(novasCamisas);
    setModalEditarVisivel(false);
  };

  const handleExclusao = () => {
    setCamisas(camisas.filter((item) => item.id !== itemParaExcluir));
    setModalExclusaoVisivel(false);
  };

  const filtrarCamisas = () => {
    return camisas.filter((item) =>
      item.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
      </View>

      {mostrarPesquisa && (
        <TextInput
          style={styles.inputPesquisa}
          placeholder="Pesquisar..."
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      )}

      <FlatList
        data={filtrarCamisas()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Image
              source={{ uri: `${item.imagem}?${Date.now()}` }}
              style={styles.imagem}
            />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>{item.ano}</Text>
              <Text>{item.tamanho}</Text>
              <Text style={styles.preco}>{item.preco}</Text>
            </View>

            <View style={styles.icones}>
              <TouchableOpacity onPress={() => abrirEdicao(item)}>
                <Image
                  source={require("../assets/editar.png")}
                  style={styles.iconeAcao}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setItemParaExcluir(item.id);
                  setModalExclusaoVisivel(true);
                }}
              >
                <Image
                  source={require("../assets/deletar.png")}
                  style={styles.iconeAcao}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.barraInferior}>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image
            source={require("../assets/mais.png")}
            style={styles.iconeBarra}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/bola.png")}
            style={styles.iconeBarra}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMostrarPesquisa(!mostrarPesquisa)}>
          <Image
            source={require("../assets/lupa.png")}
            style={styles.iconeBarra}
          />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalExclusaoVisivel}
        onRequestClose={() => setModalExclusaoVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Confirmar Exclusão</Text>
            <Text style={styles.mensagemExclusao}>
              Tem certeza que deseja excluir esta camisa?
            </Text>
            <View style={styles.botoesModal}>
              <Button
                title="Cancelar"
                color="gray"
                onPress={() => setModalExclusaoVisivel(false)}
              />
              <Button title="Excluir" color="red" onPress={handleExclusao} />
            </View>
          </View>
        </View>
      </Modal>

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
            />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              value={ano}
              onChangeText={setAno}
            />
            <View style={[styles.input, { height: 42 }]}>
              <Picker
                selectedValue={tamanho}
                onValueChange={(itemValue) => setTamanho(itemValue)}
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
            />
            <TextInput
              style={styles.input}
              placeholder="URL da Imagem"
              value={imagemUrl}
              onChangeText={setImagemUrl}
            />
            <View style={styles.botoesContainer}>
              <Button
                title="Adicionar"
                color="#2196F3"
                onPress={() => {
                  const novaCamisa = {
                    id: String(Date.now()),
                    nome,
                    ano,
                    tamanho,
                    preco,
                    imagem: imagemUrl,
                  };
                  setCamisas([...camisas, novaCamisa]);
                  setModalVisivel(false);
                  setNome("");
                  setAno("");
                  setTamanho("M");
                  setPreco("");
                  setImagemUrl("");
                }}
              />
              <Button
                title="Cancelar"
                color="red"
                onPress={() => setModalVisivel(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditarVisivel}
        onRequestClose={() => setModalEditarVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Editar Camisa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              value={ano}
              onChangeText={setAno}
            />
            <View style={[styles.input, { height: 42 }]}>
              <Picker
                selectedValue={tamanho}
                onValueChange={(itemValue) => setTamanho(itemValue)}
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
            />
            <TextInput
              style={styles.input}
              placeholder="URL da Imagem"
              value={imagemUrl}
              onChangeText={setImagemUrl}
            />
            <View style={styles.botoesContainer}>
              <Button title="Salvar" color="#2196F3" onPress={salvarEdicao} />
              <Button
                title="Cancelar"
                color="red"
                onPress={() => setModalEditarVisivel(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    padding: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    width: "100%",
  },
  cartao: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 4,
  },
  imagem: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  preco: {
    color: "green",
    fontWeight: "bold",
    marginTop: 5,
  },
  icones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    gap: 15,
  },
  iconeAcao: {
    width: 24,
    height: 24,
  },
  barraInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  iconeBarra: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  inputPesquisa: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    backgroundColor: "#fff",
    width: "90%",
  },
  botoesModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
  },
  mensagemExclusao: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  logo: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
    padding: 10,
    maxWidth: "100%",
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
});
