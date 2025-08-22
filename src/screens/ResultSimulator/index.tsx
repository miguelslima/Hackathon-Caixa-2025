import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  Modal,
  View,
} from "react-native";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import {
  LineChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { AmortizationButton, AmortizationButtonText, AmortizationContainer, CloseButton, Container, ContentWrapper, FooterButtons, InfoTitle, ModalContent, ModalTable, ModalTitle, SummaryCard, SummaryText, SummaryTitle, TableCell, TableHeader, TableRow } from "./styles";
import { InfoContainer } from "../Simulador/styles";
import { Feather } from '@expo/vector-icons';
import Header from "@/components/Header";

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
  desiredAmount: number;
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
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const screenWidth = Dimensions.get("window").width;

  const { result, desiredAmount } = route.params as Params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAmortization, setSelectedAmortization] = useState<'PRICE' | 'SAC' | null>(null);

  const isImobiliario = result.descricaoProduto.includes('Imobiliário');

  const sacResult = isImobiliario ? calculateSAC(
    result.resultadoSimulacao[0].parcelas[0].saldoDevedor,
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

  const totalValue = currentAmortization.reduce((sum, parcel) => sum + parcel.valorPrestacao, 0);

  const chartData = {
    labels: currentAmortization
      .filter((_, index) => (index + 1) % 3 === 0)
      .map(p => p.numero.toString()),
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
          <Header title="Resultado da Simulação" />
          <InfoContainer>
            <InfoTitle>
              Olá {user?.name}, confira abaixo as opções encontradas de acordo com
              o valor e parcelas desejadas.
            </InfoTitle>
          </InfoContainer>

          <SummaryCard>
            <SummaryTitle>Detalhes da Simulação</SummaryTitle>
            <SummaryText><Text style={{ fontWeight: 'bold' }}>Produto: </Text> {result.descricaoProduto}</SummaryText>
            <SummaryText><Text style={{ fontWeight: 'bold' }}>Valor Desejado: </Text> {formatCurrency(desiredAmount)}</SummaryText>
            <SummaryText><Text style={{ fontWeight: 'bold' }}>Taxa de Juros Anual: </Text> {result.taxaJuros}%</SummaryText>
            <SummaryText><Text style={{ fontWeight: 'bold' }}>Prazo Total: </Text> {result.resultadoSimulacao[0].parcelas.length} meses</SummaryText>
            <SummaryText><Text style={{ fontWeight: 'bold' }}>Valor da Parcela Mensal: </Text> {formatCurrency(result.resultadoSimulacao[0].parcelas[0].valorPrestacao)}</SummaryText>
            <SummaryText><Text style={{ fontWeight: 'bold' }}>Valor Total com juros: </Text> {formatCurrency(totalValue)}</SummaryText>
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
                <AmortizationButtonText>Veja mais detalhes da Amortização</AmortizationButtonText>
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
              <CloseButton onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color="#333" />
              </CloseButton>
              <ModalTitle>Sistema de Amortização {selectedAmortization === 'PRICE' ? '' : selectedAmortization}</ModalTitle>

              <Text style={{ marginBottom: 10, fontSize: 16 }}>Evolução do Saldo Devedor</Text>
              <LineChart
                data={chartData}
                width={screenWidth * 0.85}
                height={300}
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
