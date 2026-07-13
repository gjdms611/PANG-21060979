export type BalloonSize = 'large' | 'small'

export type Balloon = {
  x: number
  y: number
  vx: number
  vy: number
  size: BalloonSize
}

export function createBalloon(x: number, y: number, size: BalloonSize): Balloon {
  return { x, y, vx: 0, vy: 0, size }
}
