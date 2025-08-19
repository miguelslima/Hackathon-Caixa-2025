import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet,
  Modal,
  View,
} from "react-native";

import iconeLogo from "../../assets/icone-logo.png";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/Button";
import {
  Container,
  Header,
  ImageLogo,
  InfoContainer,
  InfoTitle,
  ModalButton,
  ModalCloseButton,
  ModalContainer,
  ModalTextButton,
  ModalTitle,
  ModalView,
  SimulatorContainer,
  SimulatorTitle,
  TitleHeader,
} from "./styles";
import { PriceType } from "../../components/PriceType";
import { useAuth } from "../../hooks/auth";

export interface ResultSimulatorDTO {
  codigoProduto: number;
  descricaoProduto: string;
  taxaJuros: number;
  resultadoSimulacao: {
    tipo: string;
    parcelas: {
      numero: number;
      valorAmortizacao: number;
      valorJuros: number;
      valorPrestacao: number;
    }[];
  }[];
}

interface Params {
  result: ResultSimulatorDTO;
}

export function ResultSimulator() {
  const { COLORS } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();

  const { result } = route.params as Params;
  const [test, setTest] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSACVisible, setModalSACVisible] = useState(false);

  useEffect(() => {
    async function handleResult() {
      console.log(result);
    }

    handleResult();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <ImageLogo source={iconeLogo} />
          <TitleHeader>Resultado da Simulação</TitleHeader>
        </Header>

        <InfoContainer>
          <InfoTitle>
            Olá {user?.name}, confira abaixo as opções encontradas de acordo com
            o valor e parcelas desejadas.
          </InfoTitle>
        </InfoContainer>

        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <SimulatorContainer>
            <Text
              style={{
                width: 200,
                color: "#fff",
                fontSize: 20,
              }}
            ></Text>

            <SimulatorTitle>
              Descrição: {result.descricaoProduto}
            </SimulatorTitle>
            <SimulatorTitle>Taxa de juros: {result.taxaJuros}</SimulatorTitle>

            <SimulatorTitle style={{ width: 250 }}>
              Sistema de amortização
            </SimulatorTitle>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <ModalContainer>
                <ModalView>
                  <ModalTitle>SISTEMA PRICE</ModalTitle>
                  {result.resultadoSimulacao.map((item) =>
                    item.tipo === "PRICE" ? (
                      <PriceType price={item.tipo} parcelas={item.parcelas} />
                    ) : (
                      <View />
                    )
                  )}
                  <ModalCloseButton
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Fechar</Text>
                  </ModalCloseButton>
                </ModalView>
              </ModalContainer>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalSACVisible}
              onRequestClose={() => {
                setModalVisible(!modalSACVisible);
              }}
            >
              <ModalContainer>
                <ModalView>
                  <ModalTitle>SISTEMA SAC</ModalTitle>
                  {result.resultadoSimulacao.map((item) =>
                    item.tipo === "SAC" ? (
                      <PriceType price={item.tipo} parcelas={item.parcelas} />
                    ) : (
                      <View />
                    )
                  )}
                  <ModalCloseButton
                    onPress={() => setModalSACVisible(!modalSACVisible)}
                  >
                    <Text style={styles.textStyle}>Fechar</Text>
                  </ModalCloseButton>
                </ModalView>
              </ModalContainer>
            </Modal>

            <ModalButton onPress={() => setModalVisible(true)}>
              <ModalTextButton>PRICE</ModalTextButton>
            </ModalButton>

            <ModalButton onPress={() => setModalSACVisible(true)}>
              <ModalTextButton>SAC</ModalTextButton>
            </ModalButton>
          </SimulatorContainer>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              title="Nova Simulacao"
              color={COLORS.CAIXA_YELLOW}
              onPress={() => navigation.navigate("Simulador")}
            />

            <Button
              style={test === true && { display: "none" }}
              title="Contratar"
              color={COLORS.CAIXA_YELLOW}
              onPress={() =>
                Linking.canOpenURL(
                  "whatsapp://send?text=Olá, gostaria de contratar o crédito simulado no aplicativo"
                ).then((supported) => {
                  if (supported) {
                    return Linking.openURL(
                      "whatsapp://send?phone=5508001040104&text=Olá, gostaria de contratar o crédito simulado no aplicativo"
                    );
                  } else {
                    return Linking.openURL(
                      "https://api.whatsapp.com/send?phone=5508001040104&text=Olá, gostaria de contratar o crédito simulado no aplicativo"
                    );
                  }
                })
              }
            />
          </View>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    height: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
