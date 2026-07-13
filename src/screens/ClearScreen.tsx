import './ClearScreen.css'

type ClearScreenProps = {
  onExitToMain: () => void
}

function ClearScreen({ onExitToMain }: ClearScreenProps) {
  return (
    <div className="clear-screen-overlay">
      <p className="clear-screen-text">Mission 1 클리어!</p>
      <button type="button" className="clear-screen-button" onClick={onExitToMain}>
        메인으로
      </button>
    </div>
  )
}

export default ClearScreen
