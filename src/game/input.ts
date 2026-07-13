import { useEffect, useRef } from 'react'

export function useKeyboardState(): Set<string> {
  const keysRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      keysRef.current.add(event.key)
    }
    function handleKeyUp(event: KeyboardEvent) {
      keysRef.current.delete(event.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keysRef.current
}
