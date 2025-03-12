import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { useState } from "react";
import { DatePicker as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  label: "日付",
  helperText: "YYYY/MM/DD形式で入力してください",
};

export const Default: Story = {
  args,
  render: (args) => <Component {...args} />,
};

export const Filled: Story = {
  args: {
    ...args,
    variant: "filled",
  },
  render: (args) => <Component {...args} />,
};

export const WithError: Story = {
  args: {
    ...args,
    error: "有効な日付を入力してください",
  },
  render: (args) => <Component {...args} />,
};

export const Disabled: Story = {
  args: {
    ...args,
    disabled: true,
    value: new Date(2025, 2, 10), // 2025年3月10日
  },
  render: (args) => <Component {...args} />,
};

export const WithMinMaxDate: Story = {
  args: {
    ...args,
    minDate: new Date(2025, 0, 1), // 2025年1月1日
    maxDate: new Date(2025, 11, 31), // 2025年12月31日
  },
  render: (args) => <Component {...args} />,
};

export const WithCustomFormat: Story = {
  args: {
    ...args,
    format: "YYYY年M月D日",
  },
  render: (args) => <Component {...args} />,
};

export const WithMondayStart: Story = {
  args: {
    ...args,
    firstDayOfWeek: 1, // 月曜始まり
  },
  render: (args) => <Component {...args} />,
};

// 状態を持つコンポーネント
const ControlledDatePicker = () => {
  const [date, setDate] = useState<Date | null>(new Date(2025, 2, 10)); // 2025年3月10日

  return (
    <div>
      <Component
        label="日付"
        value={date}
        onChange={setDate}
        helperText={
          date
            ? `選択された日付: ${date.toLocaleDateString()}`
            : "日付を選択してください"
        }
      />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDatePicker />,
};

export const Behavior: Story = {
  args,
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    const datePicker = canvas.getByRole("textbox");

    // 日付ピッカーをクリック
    await userEvent.click(datePicker);

    // 日付を選択（実際のDOM構造に依存するため、テスト環境によっては調整が必要）
    // 注: このテストはStorybook環境で実行されるため、実際のSheetコンポーネントが
    // 表示されるかどうかはプラットフォームに依存します

    // 直接入力をテスト
    await userEvent.clear(datePicker);
    await userEvent.type(datePicker, "2025/03/15");
    await userEvent.tab(); // フォーカスを外す

    // 入力値が正しく設定されていることを確認
    expect(datePicker).toHaveValue("2025/03/15");
  },
};
