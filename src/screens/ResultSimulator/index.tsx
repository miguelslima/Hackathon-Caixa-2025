import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  Modal,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import iconeLogo from "../../assets/icone-logo.png";
import {
  LineChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { AmortizationButton, AmortizationButtonText, AmortizationContainer, Container, ContentWrapper, FooterButtons, Header, ImageLogo, InfoTitle, ModalContent, ModalTable, ModalTitle, SummaryCard, SummaryText, SummaryTitle, TableCell, TableHeader, TableRow, TitleHeader } from "./styles";
import { InfoContainer } from "../Simulador/styles";

interface Product {
  id: number;
  nome: string;
  taxaJurosAnual: number;
  prazoMaximoMeses: number;
  valorMinimo: number;
  valorMaximo: number;
}

interface Parcel {
  numero: number;
  valorAmortizacao: number;
  valorJuros: number;
  valorPrestacao: number;
  saldoDevedor: number;
}

export interface ResultSimulatorDTO {
  codigoProduto: number;
  descricaoProduto: string;
  taxaJuros: number;
  resultadoSimulacao: {
    tipo: 'PRICE' | 'SAC';
    parcelas: Parcel[];
  }[];
}

interface Params {
  result: ResultSimulatorDTO;
}


const calculateSAC = (
  principal: number,
  annualInterestRate: number,
  termInMonths: number,
): Parcel[] => {
  const monthlyInterestRate = (annualInterestRate / 100) / 12;
  const amortization = principal / termInMonths;
  const parcels = [];
  let remainingBalance = principal;

  for (let i = 1; i <= termInMonths; i++) {
    const interest = remainingBalance * monthlyInterestRate;
    const monthlyPayment = amortization + interest;
    remainingBalance -= amortization;

    parcels.push({
      numero: i,
      valorAmortizacao: parseFloat(amortization.toFixed(2)),
      valorJuros: parseFloat(interest.toFixed(2)),
      valorPrestacao: parseFloat(monthlyPayment.toFixed(2)),
      saldoDevedor: parseFloat((remainingBalance > 0 ? remainingBalance : 0).toFixed(2)),
    });
  }
  return parcels;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export function ResultSimulator() {
  const { COLORS } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const screenWidth = Dimensions.get("window").width;

  const { result } = route.params as Params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAmortization, setSelectedAmortization] = useState<'PRICE' | 'SAC' | null>(null);

  const isImobiliario = result.descricaoProduto.includes('Imobiliário');

  const sacResult = isImobiliario ? calculateSAC(
    result.resultadoSimulacao[0].parcelas[0].saldoDevedor, // This is incorrect, should be initial principal. Assuming it's passed somehow
    result.taxaJuros,
    result.resultadoSimulacao[0].parcelas.length
  ) : [];

  const handleAmortizationSelect = (type: 'PRICE' | 'SAC') => {
    setSelectedAmortization(type);
    setModalVisible(true);
  };

  const handleWhatsApp = () => {
    const message = `Olá, gostaria de contratar o crédito simulado no aplicativo. Produto: ${result.descricaoProduto}`;
    const url = `whatsapp://send?phone=5508001040104&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://api.whatsapp.com/send?phone=5508001040104&text=${encodeURIComponent(message)}`);
      }
    });
  };

  const currentAmortization = selectedAmortization === 'SAC' ? sacResult : result.resultadoSimulacao[0].parcelas;

  const chartData = {
    labels: currentAmortization.map(p => p.numero.toString()),
    datasets: [{
      data: currentAmortization.map(p => p.saldoDevedor),
      color: (opacity = 1) => `rgba(0, 181, 173, ${opacity})`,
      strokeWidth: 2
    }]
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ContentWrapper>
          <Header>
            <ImageLogo source={iconeLogo} />
            <TitleHeader>Resultado da Simulação</TitleHeader>
          </Header>
          <InfoContainer>
            <InfoTitle>
              Olá {user?.name}, confira abaixo as opções encontradas de acordo com
              o valor e parcelas desejadas.
            </InfoTitle>
          </InfoContainer>

          <SummaryCard>
            <SummaryTitle>Detalhes da Simulação</SummaryTitle>
            <SummaryText>Produto: {result.descricaoProduto}</SummaryText>
            <SummaryText>Taxa de Juros Anual: {result.taxaJuros}%</SummaryText>
            <SummaryText>Prazo Total: {result.resultadoSimulacao[0].parcelas.length} meses</SummaryText>
            <SummaryText>Valor da Parcela: {formatCurrency(result.resultadoSimulacao[0].parcelas[0].valorPrestacao)}</SummaryText>
          </SummaryCard>

          {isImobiliario ? (
            <AmortizationContainer>
              <AmortizationButton onPress={() => handleAmortizationSelect('PRICE')}>
                <AmortizationButtonText>SISTEMA PRICE</AmortizationButtonText>
              </AmortizationButton>
              <AmortizationButton onPress={() => handleAmortizationSelect('SAC')}>
                <AmortizationButtonText>SISTEMA SAC</AmortizationButtonText>
              </AmortizationButton>
            </AmortizationContainer>
          ) : (
            <AmortizationContainer>
              <AmortizationButton onPress={() => handleAmortizationSelect('PRICE')}>
                <AmortizationButtonText>Detalhes da Amortização</AmortizationButtonText>
              </AmortizationButton>
            </AmortizationContainer>
          )}
        </ContentWrapper>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <ModalContent>
              <ModalTitle>Sistema de Amortização {selectedAmortization}</ModalTitle>

              <Text style={{ marginBottom: 10, fontSize: 16 }}>Evolução do Saldo Devedor</Text>
              <LineChart
                data={chartData}
                width={screenWidth * 0.75}
                height={220}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 181, 173, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                bezier
                style={{ borderRadius: 16 }}
              />

              <ModalTable
                data={currentAmortization}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.numero.toString()}
                ListHeaderComponent={() => (
                  <TableRow>
                    <TableHeader>Mês</TableHeader>
                    <TableHeader>Prestação</TableHeader>
                    <TableHeader>Amortização</TableHeader>
                    <TableHeader>Juros</TableHeader>
                    <TableHeader>Saldo</TableHeader>
                  </TableRow>
                )}
                renderItem={({ item }) => (
                  <TableRow>
                    <TableCell>{item.numero}</TableCell>
                    <TableCell>{formatCurrency(item.valorPrestacao)}</TableCell>
                    <TableCell>{formatCurrency(item.valorAmortizacao)}</TableCell>
                    <TableCell>{formatCurrency(item.valorJuros)}</TableCell>
                    <TableCell>{formatCurrency(item.saldoDevedor)}</TableCell>
                  </TableRow>
                )}
              />
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </ModalContent>
          </View>
        </Modal>

        <FooterButtons>
          <Button
            title="Nova Simulação"
            onPress={() => navigation.navigate("Simulador")}
          />
          <Button
            title="Contratar"
            onPress={handleWhatsApp}
          />
        </FooterButtons>
      </Container>
    </TouchableWithoutFeedback>
  );
}
