/**
 * カラーコードからRGBA色を生成するヘルパー関数
 *
 * @param hex カラーコード（例: "#49454e"）
 * @param alpha 不透明度（0.0〜1.0）
 * @returns RGBA形式の色文字列（例: "rgba(73, 69, 78, 0.12)"）
 */
export const hexToRgba = (hex: string | undefined, alpha: number): string => {
  if (!hex) return `rgba(0, 0, 0, ${alpha})`;

  // カラーコードからRGB成分を抽出
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  // RGBA形式の文字列を返す
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
