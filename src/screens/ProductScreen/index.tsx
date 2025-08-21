import React, { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import axios from 'axios';
import { Container, FlatListContainer, Header, ImageLogo, ProductDetails, ProductItemContainer, ProductName, Title } from './styles';
import { Button } from '@/components/Button';

import iconeLogo from "../../assets/icone-logo.png";
import { api } from '@/services/api';

interface Product {
  id: number;
  nome: string;
  taxaJurosAnual: number;
  prazoMaximoMeses: number;
  valorMinimo: number;
  valorMaximo: number;
}

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/produtos');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos. Verifique se o JSON-Server está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductItemContainer>
      <ProductName>{item.nome}</ProductName>
      <ProductDetails>Taxa Anual: {item.taxaJurosAnual}%</ProductDetails>
      <ProductDetails>Prazo Máximo: {item.prazoMaximoMeses} meses</ProductDetails>
      <ProductDetails>Valor Mínimo: {formatCurrency(item.valorMinimo)}</ProductDetails>
      <ProductDetails>Valor Máximo: {formatCurrency(item.valorMaximo)}</ProductDetails>
    </ProductItemContainer>
  );

  return (
    <Container>
      <Header>
        <ImageLogo source={iconeLogo} />
        <Title>Produtos</Title>
      </Header>


      <FlatListContainer>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </FlatListContainer>

      <Button
        title='Cadastrar Novo Produto'
        onPress={() => navigation.navigate('RegisterProductScreen')}
      />

    </Container>
  );
}
