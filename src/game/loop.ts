import { useEffect, useRef } from 'react'

export function useGameLoop(onFrame: (dt: number) => void): void {
  const onFrameRef = useRef(onFrame)
  onFrameRef.current = onFrame

  useEffect(() => {
    let frameId: number
    let lastTime = performance.now()

    function tick(time: number) {
      const dt = (time - lastTime) / 1000
      lastTime = time
      onFrameRef.current(dt)
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])
}
