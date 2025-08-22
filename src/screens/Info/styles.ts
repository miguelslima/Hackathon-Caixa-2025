import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};

  padding: 24px;
`;

export const InfoContainer = styled.View`
  margin-bottom: 24px;

`;

export const InfoTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: justify;
  margin-top: 16px;
`;

