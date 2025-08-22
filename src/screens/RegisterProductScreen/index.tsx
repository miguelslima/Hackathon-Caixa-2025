import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import * as yup from 'yup';
import { BackButton, BackButtonTitle, Container, ErrorMessage, FormContainer, StyledInput, Title } from './styles';
import { Button } from '@/components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { api } from '@/services/api';
import Header from '@/components/Header';

interface ProductData {
  name: string;
  annualInterestRate: string;
  maxTerm: string;
}

interface FormErrors {
  name?: string;
  annualInterestRate?: string;
  maxTerm?: string;
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
});


export default function RegisterProductScreen() {
  const { COLORS } = useTheme();
  const navigate = useNavigation()

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [product, setProduct] = useState<ProductData>({
    name: '',
    annualInterestRate: '',
    maxTerm: ''
  });

  const resetForm = useCallback(() => {
    setProduct({
      name: '',
      annualInterestRate: '',
      maxTerm: ''
    });
    setErrors({});
  }, []);

  useFocusEffect(
    resetForm
  );

  const handleInputChange = (field: keyof ProductData, value: string) => {
    if (field === 'annualInterestRate' || field === 'maxTerm') {
      const sanitizedValue = value.replace(/[^0-9]/g, '');
      setProduct({ ...product, [field]: sanitizedValue });
    } else {
      setProduct({ ...product, [field]: value });
    }
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
        },
        { abortEarly: false }
      );

      const response = await api.post('/produtos', {
        nome: product.name,
        taxaJurosAnual: parseFloat(product.annualInterestRate),
        prazoMaximoMeses: parseInt(product.maxTerm),
      });

      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Produto cadastrado com sucesso!',
        });
        resetForm();
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
      <Header title='Cadastre um novo produto' />
      <FormContainer>

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
