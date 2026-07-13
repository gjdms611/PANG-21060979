import './GameOverScreen.css'

type GameOverScreenProps = {
  onRestart: () => void
  onExitToMain: () => void
}

function GameOverScreen({ onRestart, onExitToMain }: GameOverScreenProps) {
  return (
    <div className="gameover-screen-overlay">
      <p className="gameover-screen-text">게임 오버</p>
      <div className="gameover-screen-buttons">
        <button type="button" className="gameover-screen-button" onClick={onRestart}>
          다시 시작
        </button>
        <button type="button" className="gameover-screen-button" onClick={onExitToMain}>
          메인으로
        </button>
      </div>
    </div>
  )
}

export default GameOverScreen
