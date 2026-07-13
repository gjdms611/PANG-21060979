import { BALLOON_RADIUS } from './constants'
import type { Balloon } from './entities/balloon'
import type { Wire } from './entities/wire'

function isPointInCircle(px: number, py: number, cx: number, cy: number, r: number): boolean {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy <= r * r
}

export function wireHitsBalloon(wire: Wire, balloon: Balloon): boolean {
  return isPointInCircle(wire.x, wire.y, balloon.x, balloon.y, BALLOON_RADIUS[balloon.size])
}
