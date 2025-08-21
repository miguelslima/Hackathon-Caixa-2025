import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import axios from 'axios';
import * as yup from 'yup';
import { BackButton, BackButtonTitle, Container, ErrorMessage, FormContainer, StyledInput, Title } from './styles';
import { Button } from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import MaskInput from 'react-native-mask-input';
import { api } from '@/services/api';

interface ProductData {
  name: string;
  annualInterestRate: string;
  maxTerm: string;
  minAmount: string;
  maxAmount: string;
}

interface FormErrors {
  name?: string;
  annualInterestRate?: string;
  maxTerm?: string;
  minAmount?: string;
  maxAmount?: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('O nome do produto é obrigatório.'),
  annualInterestRate: yup
    .number()
    .typeError('A taxa de juros deve ser um número.')
    .positive('A taxa de juros deve ser um número positivo.')
    .required('A taxa de juros é obrigatória.'),
  maxTerm: yup
    .number()
    .typeError('O prazo máximo deve ser um número inteiro.')
    .integer('O prazo máximo deve ser um número inteiro.')
    .positive('O prazo máximo deve ser um número positivo.')
    .required('O prazo máximo é obrigatório.'),
  minAmount: yup
    .number()
    .typeError('O valor mínimo deve ser um número.')
    .positive('O valor mínimo deve ser um número positivo.')
    .required('O valor mínimo é obrigatório.'),
  maxAmount: yup
    .number()
    .typeError('O valor máximo deve ser um número.')
    .positive('O valor máximo deve ser um número positivo.')
    .required('O valor máximo é obrigatório.')
    .test(
      'is-greater',
      'O valor máximo deve ser maior que o valor mínimo.',
      function (value) {
        const { minAmount } = this.parent;
        return value > minAmount;
      }
    ),
});



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

export default function RegisterProductScreen() {
  const { COLORS } = useTheme();
  const navigate = useNavigation()

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [product, setProduct] = useState<ProductData>({
    name: '',
    annualInterestRate: '',
    maxTerm: '',
    minAmount: '',
    maxAmount: '',
  });

  const handleInputChange = (field: keyof ProductData, value: string) => {
    if (field === 'annualInterestRate' || field === 'maxTerm') {
      const sanitizedValue = value.replace(/[^0-9]/g, '');
      setProduct({ ...product, [field]: sanitizedValue });
    } else {
      setProduct({ ...product, [field]: value });
    }
  };
  const handleMaskedAmountChange = (field: 'minAmount' | 'maxAmount', unmasked: string) => {
    setProduct({ ...product, [field]: unmasked });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      await validationSchema.validate(
        {
          name: product.name,
          annualInterestRate: parseFloat(product.annualInterestRate),
          maxTerm: parseInt(product.maxTerm),
          minAmount: parseFloat(product.minAmount),
          maxAmount: parseFloat(product.maxAmount),
        },
        { abortEarly: false }
      );

      const response = await api.post('/produtos', {
        nome: product.name,
        taxaJurosAnual: parseFloat(product.annualInterestRate),
        prazoMaximoMeses: parseInt(product.maxTerm),
        valorMinimo: parseFloat(product.minAmount),
        valorMaximo: parseFloat(product.maxAmount),
      });

      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Produto cadastrado com sucesso!',
        });
        setProduct({
          name: '',
          annualInterestRate: '',
          maxTerm: '',
          minAmount: '',
          maxAmount: '',
        });
        navigate.navigate('Produtos')

      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Falha ao cadastrar o produto.',
        });
      }
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        Toast.show({
          type: 'error',
          text1: 'Erro de Validação',
          text2: 'Por favor, corrija os campos inválidos.',
        });
      } else {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível conectar ao servidor. Verifique se o JSON-Server está rodando e o IP está correto.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BackButton
        onPress={() => navigate.navigate('Produtos')}>
        <Feather
          name='arrow-left'
          size={20}
          color={"#fff"}
        />

        <BackButtonTitle>Voltar</BackButtonTitle>
      </BackButton>
      <FormContainer>
        <Title>Cadastrar Novo Produto</Title>
        <StyledInput
          placeholder="Nome do Produto"
          value={product.name}
          onChangeText={(text) => handleInputChange('name', text)}
          isInvalid={!!errors.name}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <StyledInput
          placeholder="Taxa de Juros Anual (%)"
          keyboardType="numeric"
          value={product.annualInterestRate}
          onChangeText={(text) => handleInputChange('annualInterestRate', text)}
          isInvalid={!!errors.annualInterestRate}
        />
        {errors.annualInterestRate && <ErrorMessage>{errors.annualInterestRate}</ErrorMessage>}

        <StyledInput
          placeholder="Prazo Máximo (em meses)"
          keyboardType="numeric"
          value={product.maxTerm}
          onChangeText={(text) => handleInputChange('maxTerm', text)}
          isInvalid={!!errors.maxTerm}
        />
        {errors.maxTerm && <ErrorMessage>{errors.maxTerm}</ErrorMessage>}

        <MaskInput
          style={{
            height: 56,
            fontWeight: "bold",
            color: COLORS.CAIXA_BLUE,
            borderColor: !!errors.minAmount ? '#ff0000' : '#E0E0E0',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 24,
            fontSize: 16,
            marginBottom: 10,
            backgroundColor: '#fff',
          }}
          placeholder="Valor Mínimo"
          keyboardType="numeric"
          placeholderTextColor={COLORS.CAIXA_BLUE}
          value={product.minAmount}
          onChangeText={(masked, unmasked) => handleMaskedAmountChange('minAmount', unmasked)}
          mask={moneyMask}
        />
        {errors.minAmount && <ErrorMessage>{errors.minAmount}</ErrorMessage>}

        <MaskInput
          style={{
            height: 56,
            fontWeight: "bold",
            color: COLORS.CAIXA_BLUE,
            borderColor: !!errors.maxAmount ? '#ff0000' : '#E0E0E0',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 24,
            fontSize: 16,
            marginBottom: 10,
            backgroundColor: '#fff',
          }}
          placeholder="Valor Máximo"
          placeholderTextColor={COLORS.CAIXA_BLUE}
          keyboardType="numeric"
          value={product.maxAmount}
          onChangeText={(masked, unmasked) => handleMaskedAmountChange('maxAmount', unmasked)}
          mask={moneyMask}
        />
        {errors.maxAmount && <ErrorMessage>{errors.maxAmount}</ErrorMessage>}
      </FormContainer>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            title='Cadastrar produto'
            color={COLORS.CAIXA_YELLOW}
            onPress={handleSubmit}
          />
        )}
      </View>
    </Container>
  );
}
