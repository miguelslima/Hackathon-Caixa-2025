import { useState } from "react";
import { useTheme } from "styled-components/native";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { useAuth } from "@/hooks/auth";

import iconeLogo from "@/assets/icone-logo.png";

import {
  Container,
  Header,
  ImageLogo,
  SimulatorContainer,
  SimulatorTitle,
  TitleHeader,
} from "./styles";

export function Home() {
  const { COLORS } = useTheme();
  const { signIn } = useAuth();

  const [name, setName] = useState("");

  return (
    <Container>
      <Header>
        <ImageLogo source={iconeLogo} />
        <TitleHeader>Simulador de empréstimo</TitleHeader>
      </Header>
      <SimulatorContainer>
        <SimulatorTitle>Como gostaria de ser chamado: </SimulatorTitle>

        <Input
          iconName="user"
          placeholder="Ex: Joao Maria"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="sentences"
          onChangeText={setName}
          value={name}
        />
      </SimulatorContainer>

      <Button
        title="Continuar"
        color={COLORS.CAIXA_YELLOW}
        onPress={() => signIn(name)}
      />
    </Container>
  );
}
