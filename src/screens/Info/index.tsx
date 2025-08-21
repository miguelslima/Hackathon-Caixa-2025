import { useEffect, useState } from "react";
import { Platform, UIManager } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { Button } from "@/components/Button";

import iconeLogo from "@/assets/icone-logo.png";

import data from "../../../dbCaixa.json";

import {
  Container,
  Header,
  ImageLogo,
  InfoContainer,
  InfoTitle,
  TitleHeader,
} from "./styles";
import { useAuth } from "../../hooks/auth";
import { ScrollView } from "react-native-gesture-handler";
import { AccordionItem } from "@/components/AccordionItem";

export function Info() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    const unsubscribe = navigation.addListener('focus', () => {
      setExpandedIndex(-1);
    });
    return unsubscribe;
  }, [navigation]);

  const handleAccordionPress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };


  const handleSimulator = () => {
    navigation.navigate("Simulador");
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ImageLogo source={iconeLogo} />
          <TitleHeader>Crédito CAIXA</TitleHeader>
        </Header>
        <InfoContainer>
          <InfoTitle>
            Olá {user?.name}, seja qual for o momento ou motivo, a CAIXA tem a
            opção de crédito ideal para tirar seus planos do papel. Conheça
            nossas opções de empréstimo e financiamento.
          </InfoTitle>
        </InfoContainer>
        {data.map((item, idx) => (
          <AccordionItem
            key={idx}
            title={item.nome}
            body={item.descricao}
            link={item.link}
            isExpanded={expandedIndex === idx}
            onPress={() => handleAccordionPress(idx)}
          />
        ))}
      </ScrollView>
      <Button
        title="Simule agora"
        color={COLORS.CAIXA_YELLOW}
        onPress={handleSimulator}
      />
    </Container>
  );
}
