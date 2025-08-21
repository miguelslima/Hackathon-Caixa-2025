import React, { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  FlatList,
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import { Container, FlatListContainer, Header, ImageLogo, ProductDetails, ProductItemContainer, ProductName, Title } from './styles';
import { Button } from '@/components/Button';

import iconeLogo from "../../assets/icone-logo.png";
import { api } from '@/services/api';

interface Product {
  id: number;
  nome: string;
  taxaJurosAnual: number | string;
  taxaMensal: number | string;
  prazoMaximoMeses: number;
}

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/produtos');

      setProducts(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
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
      <ProductDetails>
        <Text style={{ fontWeight: 'bold' }}>Taxa Anual: </Text>
        {`${item.taxaJurosAnual === 'Variável' ? item.taxaJurosAnual : `${item.taxaJurosAnual}%`}`}
      </ProductDetails>
      <ProductDetails>
        <Text style={{ fontWeight: 'bold' }}>Taxa Mensal: </Text>
        {`${item.taxaMensal === 'Variável' ? item.taxaMensal : `${item.taxaMensal}%`}`}
      </ProductDetails>
      <ProductDetails>
        <Text style={{ fontWeight: 'bold' }}>Prazo Máximo: </Text>
        {item.prazoMaximoMeses} meses
      </ProductDetails>
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
