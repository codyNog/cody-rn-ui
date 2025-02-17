"use client";
import { ChevronDown } from "@tamagui/lucide-icons";
import type { ReactNode, Ref } from "react";
import {
  Paragraph,
  Square,
  Accordion as TamaguiAccordion,
  type TamaguiElement,
} from "tamagui";

type Props = {
  ref?: Ref<TamaguiElement>;
  items: {
    title: string;
    content: ReactNode;
  }[];
};

export const Accordion = ({ ref, items }: Props) => {
  return (
    <TamaguiAccordion ref={ref} overflow="hidden" width="$20" type="multiple">
      {items.map(({ title, content }) => (
        <TamaguiAccordion.Item key={title} value={title}>
          <TamaguiAccordion.Trigger
            flexDirection="row"
            justifyContent="space-between"
          >
            {({
              open,
            }: {
              open: boolean;
            }) => (
              <>
                <Paragraph>{title}</Paragraph>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </TamaguiAccordion.Trigger>
          <TamaguiAccordion.HeightAnimator animation="medium">
            <TamaguiAccordion.Content
              animation="medium"
              exitStyle={{ opacity: 0 }}
            >
              {content}
            </TamaguiAccordion.Content>
          </TamaguiAccordion.HeightAnimator>
        </TamaguiAccordion.Item>
      ))}
    </TamaguiAccordion>
  );
};
