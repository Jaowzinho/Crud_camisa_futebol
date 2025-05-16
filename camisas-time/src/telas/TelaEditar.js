import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function TelaEditar({ route, navigation }) {
  const { camisaParaEditar } = route.params;

  const [nome, setNome] = useState(camisaParaEditar.nome || "");
  const [ano, setAno] = useState(camisaParaEditar.ano || "");
  const [tamanho, setTamanho] = useState(camisaParaEditar.tamanho || "M");
  const [preco, setPreco] = useState(camisaParaEditar.preco || "");
  const [imagemUrl, setImagemUrl] = useState(camisaParaEditar.imagem || "");

  const validarCampos = () => {
    if (!nome.trim() || !ano.trim() || !preco.trim() || !imagemUrl.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return false;
    }

    if (!imagemUrl.startsWith("http")) {
      Alert.alert(
        "URL inválida",
        "A URL da imagem deve começar com http/https"
      );
      return false;
    }

    return true;
  };

  const salvarEdicao = () => {
    if (!validarCampos()) return;

    const camisaEditada = {
      ...camisaParaEditar,
      nome: nome.trim(),
      ano: ano.trim(),
      tamanho,
      preco: preco.trim(),
      imagem: `${imagemUrl.trim()}?timestamp=${Date.now()}`,
    };

    navigation.navigate("Camisas", {
      camisaEditada: { ...camisaEditada },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Camisa</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome *"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Ano *"
        value={ano}
        onChangeText={setAno}
      />

      <View style={[styles.input, { height: 42 }]}>
        <Picker
          selectedValue={tamanho}
          onValueChange={(itemValue) => setTamanho(itemValue)}
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
        placeholder="Preço *"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="URL da Imagem *"
        value={imagemUrl}
        onChangeText={setImagemUrl}
        autoCapitalize="none"
      />

      <View style={styles.botoesContainer}>
        <Button
          title="Salvar Alterações"
          onPress={salvarEdicao}
          color="#2196F3"
        />
        <Button
          title="Cancelar"
          color="red"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  botoesContainer: {
    gap: 10,
    marginTop: 20,
  },
});
