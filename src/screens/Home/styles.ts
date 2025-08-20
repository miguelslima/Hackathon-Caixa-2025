
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};

  padding: 32px
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 16px;
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

export const FormContainer = styled.View`
  width: 100%;
  gap: 16px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const SimulatorContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
`;

export const SimulatorTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-bottom: 32px;
  text-align: center;
`;

export const Footer = styled.View`
  padding: 24px;
  padding-bottom: 48px; 
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.2);
`;