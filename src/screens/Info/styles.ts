import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
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
  margin-left: 32px;
`;

export const TitleHeader = styled.Text`
  width: 250px;
  color: #fff;
  font-size: 24px;
  text-align: center;
`;

export const InfoContainer = styled.View`
  margin-block: 32px;

`;

export const InfoTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: justify;
  margin-top: 16px;
`;

