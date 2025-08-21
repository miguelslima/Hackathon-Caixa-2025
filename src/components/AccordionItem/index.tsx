import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'
import { AccordionBody, AccordionContainer, AccordionHeader, AccordionTitle, ArrowIcon, BodyText, LinkButton, LinkText } from "./styles";
import { Linking, Text, TouchableOpacity } from "react-native";

interface AccordionItemProps {
  title: string;
  body: string;
  link?: string;
  isExpanded: boolean;
  onPress: () => void;
}

export function AccordionItem({ title, body, link, isExpanded, onPress }: AccordionItemProps) {

  const handleLinkPress = async () => {
    console.log('clicado => ', link)
    if (link) {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      } else {
        console.error(`Não foi possível abrir a URL: ${link}`);
      }
    }
  };

  return (
    <AccordionContainer>
      <AccordionHeader onPress={onPress}>
        <AccordionTitle>{title}</AccordionTitle>
        <ArrowIcon
          name="chevron-down"
          size={20}
          color="#000"
          isExpanded={isExpanded}
        />
      </AccordionHeader>
      <Collapsible collapsed={!isExpanded}>
        <AccordionBody>
          <BodyText>
            {body}
          </BodyText>

          <LinkButton onPress={handleLinkPress}>
            <LinkText>Saiba Mais</LinkText>
          </LinkButton>
        </AccordionBody>

      </Collapsible>
    </AccordionContainer>
  );
}

