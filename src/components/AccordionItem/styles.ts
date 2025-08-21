import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'

export const AccordionContainer = styled.View`
  margin-vertical: 10px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 12px;
  overflow: hidden;
`;

export const AccordionHeader = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLANK}; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AccordionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  flex: 1; 
`;

export const AccordionBody = styled.View`

`;

export const BodyText = styled.Text`
  padding: 15px;
  padding-top: 8px;
  color: #000;
  background-color: #fff; 

`

export const ArrowIcon = styled(Ionicons)`
  transform: ${({ isExpanded }) => (isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const LinkButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLANK}; 
  padding-inline: 15px;

  padding-bottom: 10px;
`

export const LinkText = styled.Text`
  color: ${({ theme }) => theme.COLORS.CAIXA_BLUE}; 
  font-weight: bold;
  font-size: 16px;
`