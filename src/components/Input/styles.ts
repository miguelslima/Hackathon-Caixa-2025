import styled, { css } from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  height: 55px;

  margin-bottom: 8px;

`;

export const IconContainer = styled.View<Props>`
  justify-content: center;
  align-items: center;

  margin-right: 3px;

  ${({ isFocused, theme }) => isFocused && css``}
`;

export const InputText = styled(TextInput).attrs<Props>(({ theme }) => ({
  placeholderTextColor: theme.COLORS.CAIXA_BLUE,
})) <Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.background_secondary};
  color: ${({ theme }) => theme.COLORS.azul_cx_standard};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  border-radius: 10px;
`;
