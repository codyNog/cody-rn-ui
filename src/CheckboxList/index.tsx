"use client";
import { type ForwardedRef, forwardRef, useCallback, useMemo } from "react";
import { type CheckedState, View, YStack, type TamaguiElement } from "tamagui";
import { Checkbox } from "../Checkbox";

type Parent = {
  id: string;
  label: string;
};

type Check<T> = {
  id: T;
  label: string;
};

/**
 * @param {Parent} parent Parent checkbox, if this value is provided, the parent checkbox will be rendered
 * @param {Check[]} checks List of checkboxes
 * @param {(checks: Check[]) => void} onChangeChecks Callback function to handle checkbox changes
 */
type Props<T> = {
  parent?: Parent;
  checks: Check<T>[];
  checkedIds: T[];
  onChangeChecks: (checkedIds: T[]) => void;
};

/**
 * CheckboxList component
 * A checkbox list with parent-child relationships
 */
export const CheckboxList = forwardRef(
  <T extends string>(
    { parent, checks, checkedIds, onChangeChecks }: Props<T>,
    ref: ForwardedRef<TamaguiElement>,
  ) => {
    const onChangeChild = useCallback(
      (id: T) => {
        if (checkedIds.includes(id)) {
          onChangeChecks(checkedIds.filter((checkId) => checkId !== id));
          return;
        }
        onChangeChecks(checkedIds.concat(id));
      },
      [onChangeChecks, checkedIds],
    );

    const checked: CheckedState = useMemo(() => {
      // when all checkboxes are checked, check the parent checkbox
      if (checks.every((check) => checkedIds.includes(check.id))) return true;
      // when some checkboxes are checked, make the parent checkbox indeterminate
      if (checks.some((check) => checkedIds.includes(check.id)))
        return "indeterminate";
      // when all checkboxes are unchecked, uncheck the parent checkbox
      return false;
    }, [checks, checkedIds]);

    const onChangeParent = useCallback(() => {
      // when some checkboxes are checked, uncheck all checkboxes
      if (checked) {
        onChangeChecks([]);
        return;
      }
      // when all checkboxes are unchecked, check all checkboxes
      onChangeChecks(checks.map((check) => check.id));
    }, [checked, checks, onChangeChecks]);

    return (
      <YStack ref={ref} gap="$2">
        {parent && (
          <View>
            <Checkbox
              id={parent.id}
              label={parent.label}
              checked={checked}
              onCheckedChange={onChangeParent}
            />
          </View>
        )}
        <View marginLeft={"$6"} gap="$2">
          {checks.map((check) => (
            <Checkbox
              key={check.id}
              {...check}
              checked={checkedIds.includes(check.id)}
              onCheckedChange={() => onChangeChild(check.id)}
            />
          ))}
        </View>
      </YStack>
    );
  },
);
