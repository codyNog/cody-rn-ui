"use client";
import type { Ref } from "react";
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
  ref?: Ref<TamaguiElement>; // Optional ref prop
  actions?: {
    onClick: () => void;
    label: string;
  }[];
};

export const Card = ({ title, description, ref, actions }: Props) => {
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
        {actions?.map(({ onClick, label }) => (
          <Button key={label} onPress={onClick}>
            {label}
          </Button>
        ))}
      </TamaguiCard.Footer>
    </TamaguiCard>
  );
};
