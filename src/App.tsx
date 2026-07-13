import { useState } from 'react'
import HowToPlayScreen from './screens/HowToPlayScreen'
import MainScreen from './screens/MainScreen'
import Mission1Screen from './screens/Mission1Screen'

type Screen = 'main' | 'mission1' | 'howToPlay'

function App() {
  const [screen, setScreen] = useState<Screen>('main')

  if (screen === 'mission1') {
    return <Mission1Screen onExitToMain={() => setScreen('main')} />
  }

  if (screen === 'howToPlay') {
    return <HowToPlayScreen onBack={() => setScreen('main')} />
  }

  return (
    <MainScreen
      onStart={() => setScreen('mission1')}
      onHowToPlay={() => setScreen('howToPlay')}
    />
  )
}

export default App
