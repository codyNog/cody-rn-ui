import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Text, View, YStack } from "tamagui";
import { Grid } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid.Container,
};

export default meta;

type Story = StoryObj<typeof Grid.Container>;

export const Basic: Story = {
  render: () => (
    <YStack gap="$4">
      <Text>
        現在の画面幅に応じてカラム数が変わります： - 600px未満: 4カラム -
        600px以上905px未満: 8カラム - 905px以上: 12カラム
      </Text>
      <Grid.Container>
        <Grid.Row>
          <Grid.Column span={6}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">Column 1 (span=6)</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={6}>
            <View backgroundColor="$secondary" padding="$4">
              <Text color="$onSecondary">Column 2 (span=6)</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>
    </YStack>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <YStack gap="$4">
      <Text>3カラムレイアウト</Text>
      <Grid.Container>
        <Grid.Row>
          <Grid.Column span={4}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">Column 1 (span=4)</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={4}>
            <View backgroundColor="$secondary" padding="$4">
              <Text color="$onSecondary">Column 2 (span=4)</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={4}>
            <View backgroundColor="$tertiary" padding="$4">
              <Text color="$onTertiary">Column 3 (span=4)</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>
    </YStack>
  ),
};

export const NestedGrid: Story = {
  render: () => (
    <Grid.Container>
      <Grid.Row>
        <Grid.Column span={6}>
          <View backgroundColor="$primary" padding="$4">
            <Text color="$onPrimary">Column 1 (span=6)</Text>
          </View>
        </Grid.Column>
        <Grid.Column span={6}>
          <Grid.Row>
            <Grid.Column span={6}>
              <View backgroundColor="$secondary" padding="$4">
                <Text color="$onSecondary">Nested 1 (span=6)</Text>
              </View>
            </Grid.Column>
            <Grid.Column span={6}>
              <View backgroundColor="$tertiary" padding="$4">
                <Text color="$onTertiary">Nested 2 (span=6)</Text>
              </View>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid.Container>
  ),
};

export const WithOffset: Story = {
  render: () => (
    <Grid.Container>
      <Grid.Row>
        <Grid.Column span={6}>
          <View backgroundColor="$primary" padding="$4">
            <Text color="$onPrimary">Column 1 (span=6)</Text>
          </View>
        </Grid.Column>
        <Grid.Column span={4} offset={2}>
          <View backgroundColor="$secondary" padding="$4">
            <Text color="$onSecondary">Column 2 (span=4, offset=2)</Text>
          </View>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column span={4}>
          <View backgroundColor="$tertiary" padding="$4">
            <Text color="$onTertiary">Column 3 (span=4)</Text>
          </View>
        </Grid.Column>
        <Grid.Column span={4} offset={4}>
          <View backgroundColor="$error" padding="$4">
            <Text color="$onError">Column 4 (span=4, offset=4)</Text>
          </View>
        </Grid.Column>
      </Grid.Row>
    </Grid.Container>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <YStack gap="$4">
      <Text>
        レスポンシブなカラム： - スモールスクリーン（xs）: 4カラム中2カラム -
        ミディアムスクリーン（sm）: 8カラム中4カラム -
        ラージスクリーン（md以上）: 12カラム中6カラム
      </Text>
      <Grid.Container>
        <Grid.Row>
          <Grid.Column span={6} sm={2} md={4} lg={6}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">レスポンシブカラム</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={6} sm={2} md={4} lg={6}>
            <View backgroundColor="$secondary" padding="$4">
              <Text color="$onSecondary">レスポンシブカラム</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>
    </YStack>
  ),
};

export const Behavior: Story = {
  render: () => (
    <YStack gap="$4">
      <Text>ブラウザのサイズを変更して、グリッドの動作を確認してください</Text>
      <Grid.Container>
        <Grid.Row>
          <Grid.Column span={6} sm={4} md={6} lg={6}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">Column 1 (レスポンシブ)</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={6} sm={4} md={6} lg={6}>
            <View backgroundColor="$secondary" padding="$4">
              <Text color="$onSecondary">Column 2 (レスポンシブ)</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>
    </YStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

export const SingleColumn: Story = {
  render: () => (
    <YStack gap="$4">
      <Text>1つのカラムのみの例（gapが適用されない）</Text>
      <Grid.Container>
        <Grid.Row>
          <Grid.Column span={12}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">単一カラム (span=12)</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>
    </YStack>
  ),
};
