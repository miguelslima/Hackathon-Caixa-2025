import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
`;

export const ContentWrapper = styled.ScrollView`
  padding: 24px;
`;

export const Header = styled.View`
  padding-vertical: 16px;
  background-color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  flex-direction: row;
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
  font-weight: bold;
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

export const SummaryCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;


`;

export const SummaryTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
  margin-bottom: 10px;

  text-align: center;
`;

export const SummaryText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

export const AmortizationContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

export const AmortizationButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.CAIXA_YELLOW};
  padding: 16px;
  border-radius: 8px;
  width: 45%;
  align-items: center;
`;

export const AmortizationButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;

  text-align: center;
`;

export const ModalContent = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  width: 95%;
  max-height: 95%;
`;

export const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.COLORS.CAIXA_BLUE};
`;

export const ModalTable = styled(FlatList).attrs({
  contentContainerStyle: { paddingBottom: 20 },
})`
  width: 100%;
  max-height: 40%; 
`;

export const TableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  padding-vertical: 8px;
`;

export const TableHeader = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const TableCell = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const FooterButtons = styled.View`
  margin-top: 20px;
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;
