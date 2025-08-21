import { Input } from "@/components/Input";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  alignItems: center;
  gap: 8px;
`

export const BackButtonTitle = styled.Text`
 color: #fff; 
 font-size: 20px;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.CAIXA_BLANK};
`;


export const FormContainer = styled.View`
  flex:1;
  gap: 16px;

  justify-content: center;
  margin-block: 24px
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.COLORS.danger_standard};
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

export const StyledInput = styled(Input)`
  border-width: 1px;
  border-color: ${({ isInvalid }) => (isInvalid ? '#ff0000' : '#E0E0E0')};
`;