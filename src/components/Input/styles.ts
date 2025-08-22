import styled, { css } from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;  
  height: 56px;
`;

export const IconContainer = styled.View<Props>`
  justify-content: center;
  align-items: center;


  ${({ isFocused, theme }) => isFocused && css``}
`;

export const InputText = styled(TextInput).attrs<Props>(({ theme }) => ({
  placeholderTextColor: theme.COLORS.CAIXA_BLUE,
})) <Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.background_secondary};
  border-width: 1px;
  border-color: ${({ isInvalid, theme }) =>
    isInvalid ? '#FF0000' : theme.COLORS.danger_standard};
    
  color: ${({ theme }) => theme.COLORS.azul_cx_standard};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: 16px;

  padding: 0 24px;

  border-radius: 10px;
`;
