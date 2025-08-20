import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container, FormContainer, Input, Title } from './styles';
import { Button } from '@/components/Button';

interface ProductData {
  name: string;
  annualInterestRate: string;
  maxTerm: string;
}


export default function RegisterProductScreen() {

  const { COLORS } = useTheme();

  const [product, setProduct] = useState<ProductData>({
    name: '',
    annualInterestRate: '',
    maxTerm: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProductData, value: string) => {
    setProduct({ ...product, [field]: value });
  };

  const validateForm = () => {
    if (!product.name || !product.annualInterestRate || !product.maxTerm) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return false;
    }
    if (isNaN(parseFloat(product.annualInterestRate)) || isNaN(parseInt(product.maxTerm))) {
      Alert.alert('Erro', 'Taxa de juros e prazo máximo devem ser números.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          annualInterestRate: parseFloat(product.annualInterestRate),
          maxTerm: parseInt(product.maxTerm),
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
        setProduct({ name: '', annualInterestRate: '', maxTerm: '' });
      } else {
        Alert.alert('Erro', 'Falha ao cadastrar o produto.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique se o JSON-Server está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Cadastrar Novo Produto</Title>
      <FormContainer>
        <Input
          placeholder="Nome do Produto"
          value={product.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <Input
          placeholder="Taxa de Juros Anual (%)"
          keyboardType="numeric"
          value={product.annualInterestRate}
          onChangeText={(text) => handleInputChange('annualInterestRate', text)}
        />
        <Input
          placeholder="Prazo Máximo (em meses)"
          keyboardType="numeric"
          value={product.maxTerm}
          onChangeText={(text) => handleInputChange('maxTerm', text)}
        />


      </FormContainer>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            title='Cadastrar produto'
            color={COLORS.CAIXA_YELLOW}
            onPress={() => { }} />
        )}
      </View>
    </Container>
  );
}
