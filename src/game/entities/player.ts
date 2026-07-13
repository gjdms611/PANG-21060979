import { CANVAS_WIDTH, PLAYER_SPEED, PLAYER_WIDTH, PLAYER_Y } from '../constants'

export type Player = {
  x: number
  y: number
}

export function createPlayer(): Player {
  return {
    x: (CANVAS_WIDTH - PLAYER_WIDTH) / 2,
    y: PLAYER_Y,
  }
}

export function updatePlayer(player: Player, keys: Set<string>, dt: number): void {
  if (keys.has('ArrowLeft')) {
    player.x -= PLAYER_SPEED * dt
  }
  if (keys.has('ArrowRight')) {
    player.x += PLAYER_SPEED * dt
  }
  player.x = Math.max(0, Math.min(player.x, CANVAS_WIDTH - PLAYER_WIDTH))
}
