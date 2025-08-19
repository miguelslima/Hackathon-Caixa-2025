import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${getStatusBarHeight() + 18}px;
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
  font-size: 20px;
  text-align: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  padding: 16px;
`;

export const InfoTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-top: 16px;
`;