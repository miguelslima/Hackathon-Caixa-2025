import { Text, FlatList } from "react-native";

import { Container } from "./styles";

interface ResultTipoProps {
  numero: number;
  valorAmortizacao: number;
  valorJuros: number;
  valorPrestacao: number;
  saldoDevedor: number;
}
[];

interface Props {
  price: string;
  parcelas: ResultTipoProps[];
}

export function PriceType({ parcelas }: Props) {
  return (
    <Container>
      <FlatList
        data={parcelas}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <Text style={{ fontSize: 16 }}>Parcela nº: {item.numero}</Text>
            <Text style={{ fontSize: 16 }}>
              Amortização: R$ {item.valorAmortizacao}
            </Text>
            <Text style={{ fontSize: 16 }}>Juros: R$ {item.valorJuros}</Text>
            <Text style={{ fontSize: 16 }}>
              Prestação: R$ {item.valorPrestacao}
            </Text>
            <Text style={{ borderTopWidth: 1 }} />
          </>
        )}
        keyExtractor={(item) => item.numero.toString()}
      />
    </Container>
  );
}
