import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.CAIXA_BLANK};
`;

export const Input = styled.TextInput`
  height: 50px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 8px;
  padding-horizontal: 15px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLANK};
`;

export const FormContainer = styled.View`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 10;

  margin-block: 24px
`;
