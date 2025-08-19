import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

import { api } from "../../services/api";

import iconeLogo from "../../assets/icone-logo.png";

import { useTheme } from "styled-components/native";
import { Button } from "../../components/Button";

import { maskCurrency } from "../../utils/mask";

import {
  Container,
  Header,
  ImageLogo,
  InfoContainer,
  InfoTitle,
  SimulatorContainer,
  SimulatorTitle,
  TitleHeader,
  InputText,
} from "./styles";
import { useAuth } from "../../hooks/auth";

export function Simulador() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [amount, setAmount] = useState("");
  const [amountFormatted, setAmountFormatted] = useState("");
  const [installments, setInstallments] = useState("");
  const [loading, setLoading] = useState(false);
  let result = {};

  async function handleSimulator() {
    setLoading(true);

    await api
      .post("Simulacao", {
        valorDesejado: Number(amount / 100),
        prazo: installments,
      })
      .then((response) => {
        result = response.data;
        setLoading(false);

        navigation.navigate("ResultSimulator", { result });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        Alert.alert(
          "Erro na simulação",
          "Não foi possível encontrar nenhum produto com os valores informado, tente com outro valor ou parcela desejada"
        );
        setLoading(false);
      })
      .finally(() => {
        setAmount("");
        setAmountFormatted("");
        setInstallments("");
        setLoading(false);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <ImageLogo source={iconeLogo} />
          <TitleHeader>Simulador de empréstimo</TitleHeader>
        </Header>

        <InfoContainer>
          <InfoTitle>
            Olá {user?.name}, vamos simular o empréstimo nas condições que
            melhor se encaixa para você.
          </InfoTitle>
        </InfoContainer>

        <SimulatorContainer>
          <SimulatorTitle>Valor desejado</SimulatorTitle>

          <InputText
            onChangeText={(value) => {
              setAmountFormatted(maskCurrency(value));
              setAmount(value.replace(/[^0-9]/g, ""));
            }}
            value={amountFormatted}
            placeholder="R$ 0,00"
          />

          <SimulatorTitle>Parcelas desejas</SimulatorTitle>
          <InputText
            onChangeText={setInstallments}
            value={installments}
            placeholder="Nº parcelas"
          />
        </SimulatorContainer>

        <Button
          title="Simular"
          color={COLORS.CAIXA_YELLOW}
          loading={loading}
          onPress={() => {
            handleSimulator();
          }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}
