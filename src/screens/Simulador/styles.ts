import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import { MaskedTextInput } from "react-native-mask-text";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native-gesture-handler";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  padding: 32px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${getStatusBarHeight() + 18}px;
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
  height: 55px;

  background-color: ${({ theme }) => theme.COLORS.background_secondary};
  color: ${({ theme }) => theme.COLORS.azul_cx_standard};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;
  margin-bottom: 30px;
`;

export const InputText = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.CAIXA_BLUE,
}))`
  background-color: ${({ theme }) => theme.COLORS.background_secondary};
  color: ${({ theme }) => theme.COLORS.azul_cx_standard};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: ${RFValue(15)}px;

  padding: 10px 16px;
  margin-vertical: 10px;

  border-radius: 10px;
`;
