import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 90%;
  padding: 32px;

`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: ${RFValue(15)}px;
`;
