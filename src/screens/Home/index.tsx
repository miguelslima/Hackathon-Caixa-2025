import { useState } from "react";
import { useTheme } from "styled-components/native";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { useAuth } from "@/hooks/auth";

import iconeLogo from "@/assets/icone-logo.png";

import {
  Container,
  Content,
  FormContainer,
  Header,
  ImageLogo,
  SimulatorContainer,
  SimulatorTitle,
  TitleHeader,
} from "./styles";
import { KeyboardAvoidingView, Platform } from "react-native";

export function Home() {
  const { COLORS } = useTheme();
  const { signIn } = useAuth();

  const [name, setName] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Container>
        <Header>
          <ImageLogo source={iconeLogo} />
          <TitleHeader>Simulador de empréstimo</TitleHeader>
        </Header>
        <SimulatorContainer>
          <Content>
            <SimulatorTitle>Como gostaria de ser chamado: </SimulatorTitle>

            <FormContainer>
              <Input
                placeholder="Ex: Joao Maria"
                keyboardType="default"
                autoCorrect={false}
                autoCapitalize="sentences"
                onChangeText={setName}
                value={name}
              />
            </FormContainer>
          </Content>

          <Button
            title="Continuar"
            color={COLORS.CAIXA_YELLOW}
            onPress={() => signIn(name)}
          />
        </SimulatorContainer>
      </Container>
    </KeyboardAvoidingView>
  );
}
