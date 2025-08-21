import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";

import * as yup from "yup";

import iconeLogo from "../../assets/icone-logo.png";

import { useTheme } from "styled-components/native";
import { Button } from "../../components/Button";

import {
  Container,
  Header,
  ImageLogo,
  InfoContainer,
  InfoTitle,
  SimulatorContainer,
  SimulatorTitle,
  TitleHeader,
  InputText,
  ProductPicker,
  ErrorMessage,
  StyledInput,
  PickerWrapper,
} from "./styles";
import { useAuth } from "../../hooks/auth";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";

import MaskInput from 'react-native-mask-input';
import { api } from "@/services/api";

interface Product {
  id: number;
  nome: string;
  taxaJurosAnual: number;
  prazoMaximoMeses: number;
  valorMinimo: number;
  valorMaximo: number;
}

interface SimulatorData {
  product: Product | null;
  amount: string;
  installments: string;
}

const validationSchema = yup.object().shape({
  product: yup.object().required('Selecione um produto.'),
  amount: yup.number()
    .typeError('O valor desejado deve ser um número.')
    .required('O valor desejado é obrigatório.')
    .test('minMaxAmount', 'Valor fora dos limites do produto.', function (value) {
      const { product } = this.parent;
      if (!product) return true;
      return value >= product.valorMinimo && value <= product.valorMaximo;
    }),
  installments: yup.number()
    .typeError('O número de parcelas deve ser um número.')
    .required('O número de parcelas é obrigatório.')
    .integer('O número de parcelas deve ser um número inteiro.')
    .test('maxTerm', 'Número de parcelas acima do limite do produto.', function (value) {
      const { product } = this.parent;
      if (!product) return true;
      return value <= product.prazoMaximoMeses;
    }),
});

const formatCurrency = (value: string): string => {
  const sanitizedValue = value.replace(/[^0-9.]/g, '');
  const numberValue = parseFloat(sanitizedValue);
  if (isNaN(numberValue)) {
    return '';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export function Simulador() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [amountFormatted, setAmountFormatted] = useState("");

  const [simulatorData, setSimulatorData] = useState<SimulatorData>({
    product: null,
    amount: '',
    installments: '',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/produtos');
        setProducts(response.data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível carregar os produtos.',
        });
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchProducts);
    return unsubscribe;
  }, [navigation]);

  const handleSimulator = async () => {
    setLoading(true);
    setErrors({});

    try {
      await validationSchema.validate(
        {
          product: simulatorData.product,
          amount: parseFloat(simulatorData.amount),
          installments: parseInt(simulatorData.installments),
        },
        { abortEarly: false }
      );

      const response = await api.post('/simulacoes', {
        valorDesejado: parseFloat(simulatorData.amount),
        prazo: parseInt(simulatorData.installments),
        produtoId: simulatorData.product?.id,
      });

      if (response.status === 201) {
        navigation.navigate("ResultSimulator", { result: response.data });
        Toast.show({
          type: 'success',
          text1: 'Simulação realizada',
          text2: 'Confira os resultados',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro na simulação',
          text2: 'Falha ao realizar a simulação.',
        });
      }
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro na simulação',
          text2: 'Não foi possível realizar a simulação. Tente novamente.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: 'amount' | 'installments', value: string) => {
    if (field === 'amount') {
      const sanitizedValue = value.replace(/[^0-9,.]/g, '').replace(',', '.');
      setSimulatorData({ ...simulatorData, amount: sanitizedValue });
    } else {
      const sanitizedValue = value.replace(/[^0-9]/g, '');
      setSimulatorData({ ...simulatorData, installments: sanitizedValue });
    }
  };

  const handlePickerChange = (itemValue: number) => {
    const selectedProduct = products.find(p => p.id === itemValue);
    setSimulatorData({ ...simulatorData, product: selectedProduct });
  };

  const moneyMask = [
    'R$',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    ',',
    /\d/,
    /\d/,
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ScrollView style={{ flex: 1 }}>
          <Header>
            <ImageLogo source={iconeLogo} />
            <TitleHeader>Simulador de empréstimo</TitleHeader>
          </Header>

          <InfoContainer>
            <InfoTitle>
              Olá {user?.name}, vamos simular o empréstimo nas condições que melhor se encaixa para você.
            </InfoTitle>
          </InfoContainer>

          <SimulatorContainer>
            <SimulatorTitle>Produto</SimulatorTitle>
            <PickerWrapper>
              <ProductPicker
                selectedValue={simulatorData.product?.id}
                onValueChange={handlePickerChange}
              >
                <Picker.Item label="Selecione um produto..." value={null} />
                {products.map(product => (
                  <Picker.Item key={product.id} label={`${product.nome} - Tx ${product.taxaJurosAnual}%`} value={product.id} />
                ))}
              </ProductPicker>
            </PickerWrapper>
            {errors.product && <ErrorMessage>{errors.product}</ErrorMessage>}

            <SimulatorTitle>Valor desejado</SimulatorTitle>
            <MaskInput
              style={{
                height: 56,
                color: COLORS.CAIXA_BLUE,
                fontWeight: "bold",
                borderColor: !!errors.amount ? '#ff0000' : '#E0E0E0',
                borderWidth: 1,
                borderRadius: 8,
                fontSize: 16,
                paddingHorizontal: 24,
                marginBottom: 10,
                backgroundColor: '#fff',
              }}
              placeholder="R$ 0,00"
              placeholderTextColor={COLORS.CAIXA_BLUE}
              keyboardType="numeric"
              value={simulatorData.amount}
              onChangeText={(masked, unmasked) => handleInputChange('amount', unmasked)}
              mask={moneyMask}
            />
            {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}

            <SimulatorTitle>Parcelas desejadas</SimulatorTitle>
            <StyledInput
              onChangeText={(value) => handleInputChange('installments', value)}
              value={simulatorData.installments}
              placeholder="Nº parcelas"
              keyboardType="numeric"
              isInvalid={!!errors.installments}
            />
            {errors.installments && <ErrorMessage>{errors.installments}</ErrorMessage>}

          </SimulatorContainer>

        </ScrollView>
        <Button
          title="Simular"
          color={COLORS.CAIXA_YELLOW}
          loading={loading}
          onPress={handleSimulator}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}