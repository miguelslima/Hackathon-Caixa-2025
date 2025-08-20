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
import { Container, ErrorMessage, FormContainer, StyledInput, Title } from './styles';
import { Button } from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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

const formatCurrency = (value: string): string => {
  const numberValue = parseFloat(value.replace(',', '.'));
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
    setProduct({ ...product, [field]: value });
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

      const response = await axios.post('http://192.168.0.100:3001/produtos', {
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
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
        onPress={() => navigate.goBack()}>
        <Feather name='arrow-left' size={20} color={"#fff"} />
        {/* <Text style={{ color: '#fff', fontSize: 20 }}>Voltar</Text> */}
      </TouchableOpacity>
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

        <StyledInput
          placeholder="Valor Mínimo"
          keyboardType="numeric"
          value={formatCurrency(product.minAmount)}
          onChangeText={(text) => handleInputChange('minAmount', text)}
          isInvalid={!!errors.minAmount}
        />
        {errors.minAmount && <ErrorMessage>{errors.minAmount}</ErrorMessage>}

        <StyledInput
          placeholder="Valor Máximo"
          keyboardType="numeric"
          value={formatCurrency(product.maxAmount)}
          onChangeText={(text) => handleInputChange('maxAmount', text)}
          isInvalid={!!errors.maxAmount}
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
