import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'
import { AccordionBody, AccordionContainer, AccordionHeader, AccordionTitle, ArrowIcon } from "./styles";


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

