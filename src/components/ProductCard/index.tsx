import { Text, TouchableOpacity, View } from "react-native";

import { Feather } from '@expo/vector-icons'
import { useTheme } from "styled-components/native";
import { Product } from "@/screens/ProductScreen";

import { ProductDetails, ProductItemContainer, ProductName } from "./styles";

export default function ProductCard({ product, onPress }: { product: Product, onPress: () => void }) {
  const { COLORS } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <ProductItemContainer>
        <ProductName>{product.nome}</ProductName>
        <ProductDetails>
          <Text style={{ fontWeight: 'bold' }}>Taxa Anual: </Text>
          {`${product.taxaJurosAnual === 'Variável' ? product.taxaJurosAnual : `${product.taxaJurosAnual}%`}`}
        </ProductDetails>
        <ProductDetails>
          <Text style={{ fontWeight: 'bold' }}>Taxa Mensal: </Text>
          {`${product.taxaMensal === 'Variável' ? product.taxaMensal : `${product.taxaMensal}%`}`}
        </ProductDetails>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <ProductDetails style={{ fontWeight: 'bold' }}>Prazo Máximo: </ProductDetails>
            <ProductDetails>
              {product.prazoMaximoMeses} meses
            </ProductDetails>
          </View>
          <Feather name='trending-up' size={20} color={COLORS.CAIXA_BLUE} />
        </View>
      </ProductItemContainer>
    </TouchableOpacity>
  );
};
