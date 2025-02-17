"use client";
import type { ReactNode, Ref } from "react";
import {
  Separator,
  SizableText,
  type TamaguiElement,
  Tabs as TamaguiTabs,
} from "tamagui";

type Tab = {
  children: ReactNode;
  value: string;
  label: string;
};

type Props = {
  ref?: Ref<TamaguiElement>;
  tabs: Tab[];
  onValueChange: (value: string) => void;
};

export const Tabs = ({ ref, tabs, onValueChange }: Props) => {
  return (
    <TamaguiTabs
      ref={ref}
      defaultValue={tabs[0].value || ""}
      orientation="horizontal"
      flexDirection="column"
      borderRadius="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
      onValueChange={onValueChange}
    >
      <TamaguiTabs.List disablePassBorderRadius="bottom" aria-label="tabs">
        {tabs.map(({ value, label }) => {
          return (
            <TamaguiTabs.Tab
              key={value}
              value={value}
              focusStyle={{ backgroundColor: "$color3" }}
              flex={1}
            >
              <SizableText fontFamily="$body">{label}</SizableText>
            </TamaguiTabs.Tab>
          );
        })}
      </TamaguiTabs.List>
      <Separator />
      {tabs.map(({ value, children }) => {
        return (
          <TamaguiTabs.Content
            key={value}
            value={value}
            backgroundColor="$background"
            padding="$2"
            alignItems="center"
            justifyContent="center"
            flex={1}
            borderColor="$background"
            borderRadius="$2"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth="$2"
          >
            {children}
          </TamaguiTabs.Content>
        );
      })}
    </TamaguiTabs>
  );
};
