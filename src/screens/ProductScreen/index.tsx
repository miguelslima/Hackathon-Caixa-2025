import React, { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { Container, FlatListContainer, ProductDetails, ProductItemContainer, ProductName, SearchInput, SearchInputContainer } from './styles';
import { Button } from '@/components/Button';

import { api } from '@/services/api';
import { useTheme } from "styled-components/native";
import Header from '@/components/Header';

export interface Product {
  id: number;
  nome: string;
  taxaJurosAnual: number | string;
  taxaMensal: number | string;
  prazoMaximoMeses: number;
}

export default function ProductsScreen({ navigation }) {
  const { COLORS } = useTheme()
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/produtos');

      setProducts(response.data);
      setFilteredProducts(response.data);
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

  useEffect(() => {
    if (search) {
      const filtered = products.filter(product =>
        product.nome.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

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
      <Header title="Produtos" />

      <SearchInputContainer>
        <SearchInput
          placeholder="Buscar produto..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <Feather name="search" size={20} color={COLORS.CAIXA_BLUE} />
      </SearchInputContainer>

      <FlatListContainer>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <FlatList
            data={filteredProducts}
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
