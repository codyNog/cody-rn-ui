"use client";
import type { ReactNode, Ref } from "react";
import {
  H2,
  Paragraph,
  Card as TamaguiCard,
  type TamaguiElement,
  XStack,
} from "tamagui";
import { Button } from "../Button";

type Props = {
  title?: string; // Optional title prop
  description?: string; // Optional description prop
  children?: ReactNode; // Optional children prop
  ref?: Ref<TamaguiElement>; // Optional ref prop
};

export const Card = ({ title, description, ref }: Props) => {
  return (
    <TamaguiCard
      ref={ref}
      padding="$4"
      borderRadius="$2"
      backgroundColor="$background"
    >
      <TamaguiCard.Header padded>
        {title && <H2>{title}</H2>}
        {description && <Paragraph theme="alt2">{description}</Paragraph>}
      </TamaguiCard.Header>
      <TamaguiCard.Footer padded>
        <XStack flex={1} />
        <Button>Purchase</Button>
      </TamaguiCard.Footer>
    </TamaguiCard>
  );
};
