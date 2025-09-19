export function isoToScreen(
  x: number,
  y: number,
  z: number
): { screenX: number; screenY: number } {
  const tileWidth = 64;
  const tileHeight = 32;
  const screenX = (x - y) * (tileWidth / 2);
  const screenY = (x + y) * (tileHeight / 2) - z * tileHeight; // 높이 보정 포함
  return { screenX, screenY };
}
