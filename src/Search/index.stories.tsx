import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowRight,
  Filter,
  Mic,
  Search as SearchIcon,
  X,
} from "@tamagui/lucide-icons";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { Search as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {};

export const Default: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Component
          {...args}
          value={value}
          onChange={setValue}
          placeholder="検索"
        />
      </YStack>
    );
  },
};

export const WithPlaceholder: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Component
          {...args}
          value={value}
          onChange={setValue}
          placeholder="カスタムプレースホルダー"
        />
      </YStack>
    );
  },
};

export const WithValue: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("検索キーワード");
    return (
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Component
          {...args}
          value={value}
          onChange={setValue}
          placeholder="検索"
        />
      </YStack>
    );
  },
};

export const WithError: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Component
          {...args}
          value={value}
          onChange={setValue}
          placeholder="エラー状態"
          error={true}
        />
      </YStack>
    );
  },
};

export const Disabled: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Component
          {...args}
          value={value}
          onChange={setValue}
          placeholder="無効状態"
          disabled={true}
        />
      </YStack>
    );
  },
};

export const WithCustomIcons: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");

    const handleClickFilter = () => {
      console.log("Filter clicked");
    };

    return (
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Component
          {...args}
          value={value}
          onChange={setValue}
          placeholder="カスタムアイコン"
          leadingIcon={<Mic size={24} color="$onSurfaceVariant" />}
          trailingIcon={<Filter size={24} color="$onSurfaceVariant" />}
          onClickTrailingIcon={handleClickFilter}
        />
      </YStack>
    );
  },
};

export const WithSearchAction: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const handleSearch = (searchValue: string) => {
      setSearchResult(`「${searchValue}」の検索結果`);
    };

    return (
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Component
          {...args}
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
          placeholder="Enterキーで検索"
          trailingIcon={<ArrowRight size={24} color="$primary" />}
          onClickTrailingIcon={() => handleSearch(value)}
        />
        {searchResult && <YStack padding="$2">{searchResult}</YStack>}
      </YStack>
    );
  },
};

export const Behavior: Story = {
  args,
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};
