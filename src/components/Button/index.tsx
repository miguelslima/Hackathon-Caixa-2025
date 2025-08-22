import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components";
import {
  RectButton,
  RectButtonProps,
} from "react-native-gesture-handler";
import styled from "styled-components/native";

// Componentes estilizados
export const Container = styled(RectButton)`
  margin-top: 12px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 12px;
  min-height: 56px;
  max-height: 64px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  font-size: 20px;
  color: ${({ theme, light }) =>
    light ? theme.COLORS.CAIXA_BLUE : theme.COLORS.CAIXA_BLANK};
`;

// O componente agora recebe a prop de estilo
interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  onPress,
}: Props) {
  const theme = useTheme();

  return (
    <View style={{ width: '100%' }}>
      <Container
        onPress={onPress}
        enabled={enabled}
        color={color ? color : theme.COLORS.CAIXA_YELLOW}
        style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      >
        {loading ? (
          <ActivityIndicator color={theme.COLORS.CAIXA_BLUE} />
        ) : (
          <Title light={light}>{title}</Title>
        )}
      </Container>
    </View>
  );
}
