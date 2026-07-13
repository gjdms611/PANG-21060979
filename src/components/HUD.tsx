import './HUD.css'

type HUDProps = {
  score: number
  lives: number
}

function HUD({ score, lives }: HUDProps) {
  return (
    <div className="hud">
      <span className="hud-score">SCORE {score}</span>
      <span className="hud-lives">LIVES {lives}</span>
    </div>
  )
}

export default HUD
