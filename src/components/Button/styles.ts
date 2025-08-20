import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

interface ButtonProps {
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton) <ButtonProps>`
  /* padding: 16px; */
  margin-top: 12px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 12px;

  min-height: 56px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  font-size: 20px;
  color: ${({ theme, light }) =>
    light ? theme.COLORS.CAIXA_BLUE : theme.COLORS.CAIXA_BLANK};
`;
