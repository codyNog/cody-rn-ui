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
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2025, 3, 10)); // 2025年4月10日

    return (
      <Component
        label="日付"
        value={date}
        onChange={setDate}
        helperText="YYYY/MM/DD形式で入力してください"
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    const datePicker = canvas.getByRole("textbox");

    // 初期値を確認
    expect(datePicker).toHaveValue("2025/04/10");

    // カレンダーダイアログを使用した日付選択
    // 日付ピッカーをクリックしてカレンダーダイアログを開く
    await userEvent.click(datePicker);

    // 日付を選択（20日を選択）
    try {
      // 日付の数字をテキストで検索して直接クリック
      await userEvent.click(canvas.getByText("20"));
    } catch {
      console.log("日付要素が見つかりませんでした");
    }

    // OKボタンをクリック
    try {
      await userEvent.click(canvas.getByText("OK"));
    } catch {
      console.log("OKボタンが見つかりませんでした");
    }

    // 選択した日付が入力フィールドに反映されていることを確認
    expect(datePicker).toHaveValue("2025/04/20");
  },
};
