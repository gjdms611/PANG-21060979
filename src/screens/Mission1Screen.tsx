import { useRef } from 'react'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game/constants'
import { createPlayer, updatePlayer, type Player } from '../game/entities/player'
import { drawPlayer } from '../game/render/drawPlayer'
import { useKeyboardState } from '../game/input'
import { useGameLoop } from '../game/loop'

type GameState = {
  player: Player
}

function Mission1Screen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<GameState>({ player: createPlayer() })
  const keys = useKeyboardState()

  useGameLoop((dt) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    updatePlayer(gameStateRef.current.player, keys, dt)

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    drawPlayer(ctx, gameStateRef.current.player)
  })

  return <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
}

export default Mission1Screen
