import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'

// Componentes estilizados usando styled-components
const AccordionContainer = styled.View`
  margin-vertical: 10px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const AccordionHeader = styled.TouchableOpacity`
  padding: 15px;
  background-color: #fff; /* Cor de fundo escura para contraste */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AccordionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  flex: 1; /* Permite que o título ocupe o espaço disponível */
`;

const AccordionBody = styled.Text`
  padding: 15px;
  padding-top: 8px;
  color: #000;
  background-color: #fff; /* Cor de fundo para o corpo, um pouco mais clara */
`;

const ArrowIcon = styled(Ionicons)`
  transform: ${({ isExpanded }) => (isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export function AccordionItem({ title, body }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AccordionContainer>
      <AccordionHeader onPress={() => setExpanded(!expanded)}>
        <AccordionTitle>{title}</AccordionTitle>
        <ArrowIcon
          name="chevron-down"
          size={20}
          color="#000"
          isExpanded={expanded}
        />
      </AccordionHeader>
      <Collapsible collapsed={!expanded}>
        <AccordionBody>{body}</AccordionBody>
      </Collapsible>
    </AccordionContainer>
  );
}

