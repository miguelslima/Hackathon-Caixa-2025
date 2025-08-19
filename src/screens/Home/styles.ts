import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  justify-content: space-between;
  padding: 32px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${getStatusBarHeight() + 18}px;
  align-items: center;
  justify-content: center;
`;

export const ImageLogo = styled.Image`
  width: 100px;
  height: 80px;
`;

export const TitleHeader = styled.Text`
  width: 200px;
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export const SimulatorContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  justify-content: center;
  align-items: center;
`;

export const SimulatorTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-bottom: 20px;
`;
