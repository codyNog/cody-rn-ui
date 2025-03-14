import { View, Text, StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { Ripple } from "./index";

const meta = {
  title: "UI/Ripple",
  component: Ripple,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "color" },
    duration: { control: { type: "range", min: 100, max: 1000, step: 50 } },
    disabled: { control: "boolean" },
    maxScale: { control: { type: "range", min: 1, max: 5, step: 0.5 } },
  },
} satisfies Meta<typeof Ripple>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なRippleエフェクトの例
 */
// スタイルを定義
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 60,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
  },
});

export const Basic: Story = {
  args: {
    color: "rgba(0, 0, 0, 0.5)",
    duration: 600,
    disabled: false,
    maxScale: 3,
    children: (
      <View style={styles.container}>
        <Text style={styles.text}>タップしてRippleを表示</Text>
      </View>
    ),
  },
};

/**
 * カラーバリエーションの例
 */
export const ColorVariations: Story = {
  args: {
    children: <View />,
  },
  render: () => (
    <View style={{ gap: 16, padding: 20 }}>
      <Ripple color="rgba(25, 118, 210, 0.5)">
        <View style={[styles.container, { backgroundColor: "#bbdefb" }]}>
          <Text style={styles.text}>ブルーのRipple</Text>
        </View>
      </Ripple>

      <Ripple color="rgba(211, 47, 47, 0.5)">
        <View style={[styles.container, { backgroundColor: "#ffcdd2" }]}>
          <Text style={styles.text}>レッドのRipple</Text>
        </View>
      </Ripple>

      <Ripple color="rgba(56, 142, 60, 0.5)">
        <View style={[styles.container, { backgroundColor: "#c8e6c9" }]}>
          <Text style={styles.text}>グリーンのRipple</Text>
        </View>
      </Ripple>
    </View>
  ),
};

/**
 * 異なる形状の例
 */
export const DifferentShapes: Story = {
  args: {
    children: <View />,
  },
  render: () => (
    <View style={{ gap: 16, padding: 20 }}>
      <Ripple>
        <View style={[styles.container, { borderRadius: 8 }]}>
          <Text style={styles.text}>角丸の四角形</Text>
        </View>
      </Ripple>

      <Ripple>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#f0f0f0",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
        >
          <Text style={styles.text}>円形</Text>
        </View>
      </Ripple>

      <Ripple>
        <View style={[styles.container, { borderRadius: 0 }]}>
          <Text style={styles.text}>四角形</Text>
        </View>
      </Ripple>
    </View>
  ),
};

/**
 * アニメーション速度の例
 */
export const AnimationSpeed: Story = {
  args: {
    children: <View />,
  },
  render: () => (
    <View style={{ gap: 16, padding: 20 }}>
      <Ripple duration={200}>
        <View style={styles.container}>
          <Text style={styles.text}>速いアニメーション (200ms)</Text>
        </View>
      </Ripple>

      <Ripple duration={600}>
        <View style={styles.container}>
          <Text style={styles.text}>標準アニメーション (600ms)</Text>
        </View>
      </Ripple>

      <Ripple duration={1000}>
        <View style={styles.container}>
          <Text style={styles.text}>遅いアニメーション (1000ms)</Text>
        </View>
      </Ripple>
    </View>
  ),
};
