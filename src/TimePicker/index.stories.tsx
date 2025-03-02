import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { TimePicker as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// 基本的な使用例
export const Default: Story = {
  args: {
    label: "時間を選択",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<{
      hours: number;
      minutes: number;
    } | null>({
      hours: 14,
      minutes: 30,
    });

    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// 24時間表示
export const Format24Hour: Story = {
  args: {
    label: "時間を選択 (24時間表示)",
    use24Hour: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<{
      hours: number;
      minutes: number;
    } | null>({
      hours: 14,
      minutes: 30,
    });

    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// フィルドバリアント
export const FilledVariant: Story = {
  args: {
    label: "時間を選択",
    variant: "filled",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<{
      hours: number;
      minutes: number;
    } | null>({
      hours: 10,
      minutes: 15,
    });

    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// エラー状態
export const WithError: Story = {
  args: {
    label: "時間を選択",
    error: "有効な時間を入力してください",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<{
      hours: number;
      minutes: number;
    } | null>(null);

    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// ヘルパーテキスト付き
export const WithHelperText: Story = {
  args: {
    label: "時間を選択",
    helperText: "24時間形式で入力してください",
    use24Hour: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<{
      hours: number;
      minutes: number;
    } | null>({
      hours: 9,
      minutes: 0,
    });

    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// 無効状態
export const Disabled: Story = {
  args: {
    label: "時間を選択",
    disabled: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<{
      hours: number;
      minutes: number;
    } | null>({
      hours: 12,
      minutes: 0,
    });

    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// 複数のTimePickerを表示
export const MultipleTimePickers: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [startTime, setStartTime] = useState<{
      hours: number;
      minutes: number;
    } | null>({
      hours: 9,
      minutes: 0,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [endTime, setEndTime] = useState<{
      hours: number;
      minutes: number;
    } | null>({
      hours: 17,
      minutes: 30,
    });

    return (
      <YStack space={24} width={300}>
        <Component
          label="開始時間"
          value={startTime}
          onChange={setStartTime}
          helperText="勤務開始時間"
        />
        <Component
          label="終了時間"
          value={endTime}
          onChange={setEndTime}
          helperText="勤務終了時間"
          variant="filled"
        />
      </YStack>
    );
  },
};

// インタラクションテスト
export const Behavior: Story = {
  args: {
    label: "時間を選択",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<{
      hours: number;
      minutes: number;
    } | null>(null);

    return <Component {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};
