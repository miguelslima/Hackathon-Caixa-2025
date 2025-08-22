import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.CAIXA_BLANK};
`;

export const ProductItemContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLANK};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 5;
`;

export const ProductName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const ProductDetails = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 5px;
`;

export const FlatListContainer = styled.View`
  flex: 1;
`;


export const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding-horizontal: 16px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 50px;
  color: #333;
  font-size: 16px;
`;