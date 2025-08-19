import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  justify-content: space-between;

  padding: 32px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${getStatusBarHeight() + 4}px;
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

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InfoTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: center;

  margin-top: 15%;
`;

export const SimulatorContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
`;

export const SimulatorTitle = styled.Text`
  width: 200px;
  color: #fff;
  font-size: 20px;
  padding-bottom: 16px;
`;

export const SimulatorAccordionType = styled.Text`
  font-size: 16px;
  padding-vertical: 8px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalView = styled.View`
  width: 85%;
  height: 85%;
  background-color: white;
  border-radius: 20px;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 28px;
  margin-vertical: 16px;
`;

export const ModalButton = styled.Pressable`
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLANK};
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 24px;
`;

export const ModalCloseButton = styled.Pressable`
  background-color: ${({ theme }) => theme.COLORS.CAIXA_YELLOW};
  border-radius: 20px;
  padding-vertical: 16px;
  padding-horizontal: 32px;

  margin-bottom: 16px;
`;

export const ModalTextButton = styled.Text`
  color: ${({ theme }) => theme.COLORS.CAIXA_YELLOW};
  text-align: center;
  font-size: 24px;
`;
