const LIFE_ICON_SIZE = 16
const LIFE_ICON_GAP = 6

export function drawHUD(ctx: CanvasRenderingContext2D, score: number, lives: number): void {
  ctx.fillStyle = '#08060d'
  ctx.font = 'bold 20px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(`SCORE ${score}`, 12, 28)

  const scoreWidth = ctx.measureText(`SCORE ${score}`).width
  let iconX = 12 + scoreWidth + 24
  const iconY = 28 - LIFE_ICON_SIZE
  ctx.fillStyle = '#aa3bff'
  for (let i = 0; i < lives; i++) {
    ctx.fillRect(iconX, iconY, LIFE_ICON_SIZE, LIFE_ICON_SIZE)
    iconX += LIFE_ICON_SIZE + LIFE_ICON_GAP
  }
}
