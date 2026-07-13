import { BALLOON_RADIUS, FLOOR_Y, PLAYER_HEIGHT, PLAYER_WIDTH } from './constants'
import type { Balloon } from './entities/balloon'
import type { Player } from './entities/player'
import type { Wire } from './entities/wire'

export function wireHitsBalloon(wire: Wire, balloon: Balloon): boolean {
  const closestY = Math.max(wire.y, Math.min(balloon.y, FLOOR_Y))
  const dx = wire.x - balloon.x
  const dy = closestY - balloon.y
  const r = BALLOON_RADIUS[balloon.size]
  return dx * dx + dy * dy <= r * r
}

function rectIntersectsCircle(
  rectX: number,
  rectY: number,
  rectW: number,
  rectH: number,
  cx: number,
  cy: number,
  r: number,
): boolean {
  const closestX = Math.max(rectX, Math.min(cx, rectX + rectW))
  const closestY = Math.max(rectY, Math.min(cy, rectY + rectH))
  const dx = cx - closestX
  const dy = cy - closestY
  return dx * dx + dy * dy <= r * r
}

export function playerHitsBalloon(player: Player, balloon: Balloon): boolean {
  return rectIntersectsCircle(
    player.x,
    player.y,
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    balloon.x,
    balloon.y,
    BALLOON_RADIUS[balloon.size],
  )
}
