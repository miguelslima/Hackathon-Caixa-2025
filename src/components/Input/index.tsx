import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { Container, IconContainer, InputText } from "./styles";

interface InputProps extends TextInputProps {
  iconName?: React.ComponentProps<typeof Feather>["name"];
  value?: string;
  isInvalid?: boolean;
}

export function Input({ iconName, value, ...rest }: InputProps) {

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        {iconName && (
          <Feather
            name={iconName}
            size={24}
            color={isFocused || isFilled ? '#005CA9' : '#666'}
          />
        )}
      </IconContainer>


      <InputText
        {...rest}
        value={value}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
      />
    </Container>
  );
}
