import { useState } from 'react'
import MainScreen from './screens/MainScreen'
import Mission1Screen from './screens/Mission1Screen'

type Screen = 'main' | 'mission1'

function App() {
  const [screen, setScreen] = useState<Screen>('main')

  if (screen === 'mission1') {
    return <Mission1Screen />
  }

  return <MainScreen onStart={() => setScreen('mission1')} />
}

export default App
