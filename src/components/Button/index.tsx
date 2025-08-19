import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import {
  RectButtonProps,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { Container, Title } from "./styles";

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
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
}
