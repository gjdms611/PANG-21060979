import { BALLOON_RADIUS, BALLOON_SPEED_X, CANVAS_WIDTH, FLOOR_Y, GRAVITY } from '../constants'

export type BalloonSize = 'large' | 'small'
export type BalloonDirection = 'left' | 'right'

export type Balloon = {
  x: number
  y: number
  vx: number
  vy: number
  size: BalloonSize
}

export function createBalloon(
  x: number,
  y: number,
  size: BalloonSize,
  direction: BalloonDirection,
): Balloon {
  const vx = direction === 'left' ? -BALLOON_SPEED_X : BALLOON_SPEED_X
  return { x, y, vx, vy: 0, size }
}

export function updateBalloonVertical(balloon: Balloon, dt: number): void {
  balloon.vy += GRAVITY * dt
  balloon.y += balloon.vy * dt

  const radius = BALLOON_RADIUS[balloon.size]
  const floorY = FLOOR_Y - radius
  if (balloon.y >= floorY) {
    balloon.y = floorY
    balloon.vy = -balloon.vy
  } else if (balloon.y - radius <= 0) {
    balloon.y = radius
    balloon.vy = -balloon.vy
  }
}

export function updateBalloonHorizontal(balloon: Balloon, dt: number): void {
  balloon.x += balloon.vx * dt

  const radius = BALLOON_RADIUS[balloon.size]
  if (balloon.x - radius <= 0) {
    balloon.x = radius
    balloon.vx = -balloon.vx
  } else if (balloon.x + radius >= CANVAS_WIDTH) {
    balloon.x = CANVAS_WIDTH - radius
    balloon.vx = -balloon.vx
  }
}

export function updateBalloon(balloon: Balloon, dt: number): void {
  updateBalloonVertical(balloon, dt)
  updateBalloonHorizontal(balloon, dt)
}
