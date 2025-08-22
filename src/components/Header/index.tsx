import { Container, ImageLogo, TitleHeader } from './style'

import iconeLogo from "@/assets/icone-logo.png";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <Container>
      <ImageLogo source={iconeLogo} />
      <TitleHeader>{title}</TitleHeader>
    </Container>
  )
}