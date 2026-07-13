import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../constants'
import type { Player } from '../entities/player'

export function drawPlayer(ctx: CanvasRenderingContext2D, player: Player): void {
  ctx.fillStyle = '#aa3bff'
  ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT)
}
