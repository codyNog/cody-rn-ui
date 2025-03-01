import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { SegmentedButtons as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

// 基本的な使用例（単一選択）
export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("option1");

    return (
      <Component
        options={[
          { value: "option1", label: "オプション1" },
          { value: "option2", label: "オプション2" },
          { value: "option3", label: "オプション3" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// 複数選択
export const Multiple: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string[]>(["option1"]);

    return (
      <Component
        type="multiple"
        options={[
          { value: "option1", label: "オプション1" },
          { value: "option2", label: "オプション2" },
          { value: "option3", label: "オプション3" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// サイズバリエーション
export const Sizes: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [smallValue, setSmallValue] = useState("small1");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mediumValue, setMediumValue] = useState("medium1");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [largeValue, setLargeValue] = useState("large1");

    return (
      <YStack space="$4" width="100%">
        <Component
          size="small"
          options={[
            { value: "small1", label: "小 1" },
            { value: "small2", label: "小 2" },
            { value: "small3", label: "小 3" },
          ]}
          value={smallValue}
          onChange={setSmallValue}
        />

        <Component
          size="medium"
          options={[
            { value: "medium1", label: "中 1" },
            { value: "medium2", label: "中 2" },
            { value: "medium3", label: "中 3" },
          ]}
          value={mediumValue}
          onChange={setMediumValue}
        />

        <Component
          size="large"
          options={[
            { value: "large1", label: "大 1" },
            { value: "large2", label: "大 2" },
            { value: "large3", label: "大 3" },
          ]}
          value={largeValue}
          onChange={setLargeValue}
        />
      </YStack>
    );
  },
};

// 2つのオプション
export const TwoOptions: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("yes");

    return (
      <Component
        options={[
          { value: "yes", label: "はい" },
          { value: "no", label: "いいえ" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// 単一オプション
export const SingleOption: Story = {
  render: () => {
    return (
      <Component
        options={[{ value: "single", label: "単一オプション" }]}
        value="single"
        onChange={() => {}}
      />
    );
  },
};

// 無効状態
export const Disabled: Story = {
  render: () => {
    return (
      <Component
        options={[
          { value: "option1", label: "オプション1" },
          { value: "option2", label: "オプション2" },
          { value: "option3", label: "オプション3" },
        ]}
        value="option1"
        onChange={() => {}}
        disabled
      />
    );
  },
};

// 複数選択の無効状態
export const MultipleDisabled: Story = {
  render: () => {
    return (
      <Component
        type="multiple"
        options={[
          { value: "option1", label: "オプション1" },
          { value: "option2", label: "オプション2" },
          { value: "option3", label: "オプション3" },
        ]}
        value={["option1", "option3"]}
        onChange={() => {}}
        disabled
      />
    );
  },
};

// インタラクティブな動作テスト
export const Behavior: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("option1");

    return (
      <Component
        options={[
          { value: "option1", label: "オプション1" },
          { value: "option2", label: "オプション2" },
          { value: "option3", label: "オプション3" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};
