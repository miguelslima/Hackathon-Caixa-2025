import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps {
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton) <ButtonProps>`
  width: 100%;
  padding: 19px;
  margin-top: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};

  border-radius: 10px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  font-size: ${RFValue(18)}px;
  color: ${({ theme, light }) =>
    light ? theme.COLORS.CAIXA_BLUE : theme.COLORS.CAIXA_BLANK};
`;
