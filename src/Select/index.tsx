"use client";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { type Ref, useMemo } from "react";
import type { FontSizeTokens, SelectProps, TamaguiElement } from "tamagui";
import {
  Adapt,
  Sheet,
  Select as TamaguiSelect,
  YStack,
  getFontSize,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

type Option = {
  value: string;
  label: string;
};

type Group = {
  group: string;
  options: Option[];
};

type Props = SelectProps & {
  ref?: Ref<TamaguiElement>;
  options: Option[] | Group[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Select = ({
  value,
  onChange,
  options,
  ref,
  placeholder,
  ...props
}: Props) => {
  const normalizedOptions = useMemo(() => {
    // フラットな配列の場合は、デフォルトグループに包む
    if (options.length > 0 && "value" in options[0]) {
      return [
        {
          group: "",
          options: options as Option[],
        },
      ];
    }
    return options as Group[];
  }, [options]);

  return (
    <TamaguiSelect
      value={value}
      onValueChange={onChange}
      disablePreventBodyScroll
      {...props}
    >
      <TamaguiSelect.Trigger ref={ref} width={220} iconAfter={ChevronDown}>
        <TamaguiSelect.Value placeholder={placeholder} />
      </TamaguiSelect.Trigger>

      <Adapt platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animation="medium"
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <TamaguiSelect.Content zIndex={200000}>
        <TamaguiSelect.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </TamaguiSelect.ScrollUpButton>

        <TamaguiSelect.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          {normalizedOptions.map((group, groupIndex) => {
            return (
              <TamaguiSelect.Group key={group.group || groupIndex}>
                {group.group && (
                  <TamaguiSelect.Label>{group.group}</TamaguiSelect.Label>
                )}
                {group.options.map((item, i) => {
                  return (
                    <TamaguiSelect.Item
                      index={i}
                      key={item.value}
                      value={item.value}
                    >
                      <TamaguiSelect.ItemText>
                        {item.label}
                      </TamaguiSelect.ItemText>
                      <TamaguiSelect.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </TamaguiSelect.ItemIndicator>
                    </TamaguiSelect.Item>
                  );
                })}
              </TamaguiSelect.Group>
            );
          })}
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </TamaguiSelect.Viewport>

        <TamaguiSelect.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </TamaguiSelect.ScrollDownButton>
      </TamaguiSelect.Content>
    </TamaguiSelect>
  );
};
