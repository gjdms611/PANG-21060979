import './HowToPlayScreen.css'

type HowToPlayScreenProps = {
  onBack: () => void
}

function HowToPlayScreen({ onBack }: HowToPlayScreenProps) {
  return (
    <div className="how-to-play-screen">
      <h1 className="how-to-play-title">조작 방법</h1>
      <ul className="how-to-play-list">
        <li>이동: 방향키 ←/→</li>
        <li>발사: 스페이스바 (Wire 발사, 화면에 한 발만 존재)</li>
        <li>회피: 풍선(대/소 모두)에 닿으면 사망하므로 위치를 잘 살펴 피할 것</li>
      </ul>
      <button type="button" className="how-to-play-back-button" onClick={onBack}>
        뒤로가기
      </button>
    </div>
  )
}

export default HowToPlayScreen
