import styled from "styled-components/native";
import { MaskedTextInput } from "react-native-mask-text";

import { TextInput } from "react-native-gesture-handler";
import { Input } from "@/components/Input";
import { Picker } from "@react-native-picker/picker";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  padding: 24px;
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
  text-align: justify;
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

export const StyledInput = styled(Input)`
  border-color: ${({ isInvalid }) => (isInvalid ? '#ff0000' : '#E0E0E0')};
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.COLORS.danger_standard};
  font-size: 12px;
  margin-top: 10px;
  align-self: flex-start;
`;

export const PickerWrapper = styled.View`
  width: 100%;
  height: 56px;
  border-width: 1px;
  border-color: #E0E0E0;
  border-radius: 8px;
  padding: 10px;
  font-weight: bold;
  background-color: #fff;
  justify-content: center;
  overflow: hidden; 
`;

export const ProductPicker = styled(Picker)`
  color: #005CA9; 
  font-weight: bold;
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

