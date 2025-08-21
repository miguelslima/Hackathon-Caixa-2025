import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-block: 24px
`;

export const ImageLogo = styled.Image`
  width: 100px;
  height: 80px;
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
