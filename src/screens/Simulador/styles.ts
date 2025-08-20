import styled from "styled-components/native";
import { MaskedTextInput } from "react-native-mask-text";

import { TextInput } from "react-native-gesture-handler";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  padding: 32px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 18px;
  align-items: center;
`;

export const ImageLogo = styled.Image`
  width: 100px;
  height: 80px;
`;

export const TitleHeader = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 24px;
`;

export const InfoTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-top: 16px;
`;

export const SimulatorContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  justify-content: space-between;
`;

export const SimulatorTitle = styled.Text`
  width: 200px;
  color: #fff;
  font-size: 20px;
  padding-bottom: 16px;
  margin-top: 16px;
`;

export const InputTextCurrency = styled(MaskedTextInput)`
  width: 100%;
  height: 56px;

  background-color: ${({ theme }) => theme.COLORS.background_secondary};
  color: ${({ theme }) => theme.COLORS.azul_cx_standard};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: 16px;

  padding: 0 24px;
  margin-bottom: 30px;
`;

export const InputText = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.CAIXA_BLUE,
}))`
  background-color: ${({ theme }) => theme.COLORS.background_secondary};
  color: ${({ theme }) => theme.COLORS.azul_cx_standard};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: 16px;

  padding: 24px;
  margin-vertical: 10px;

  border-radius: 12px;
`;
