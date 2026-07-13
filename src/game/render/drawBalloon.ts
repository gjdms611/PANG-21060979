import { BALLOON_RADIUS } from '../constants'
import type { Balloon } from '../entities/balloon'

export function drawBalloon(ctx: CanvasRenderingContext2D, balloon: Balloon): void {
  const radius = BALLOON_RADIUS[balloon.size]
  ctx.fillStyle = '#ff5b5b'
  ctx.beginPath()
  ctx.arc(balloon.x, balloon.y, radius, 0, Math.PI * 2)
  ctx.fill()
}
