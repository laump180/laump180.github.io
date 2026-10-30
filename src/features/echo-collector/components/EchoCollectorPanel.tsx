import { Container, FramedPanel, Reveal } from '@/shared/ui'
import { useEchoCollector } from '../hooks/useEchoCollector'
import { GameCanvas } from './GameCanvas'
import { GameHud } from './GameHud'
import { GameIntro } from './GameIntro'

export function EchoCollectorPanel() {
  const { canvasRef, state, play } = useEchoCollector()

  return (
    <Container className="py-4 sm:py-5 lg:px-6">
      <Reveal>
        <FramedPanel aria-labelledby="echo-collector-title">
          <div className="grid lg:h-[164px] lg:grid-cols-[236px_minmax(0,1fr)_252px]">
            <GameIntro showControls={state.status === 'playing'} />
            <div className="h-44 sm:h-52 lg:h-full">
              <GameCanvas canvasRef={canvasRef} state={state} />
            </div>
            <div className="flex items-center justify-center p-5 lg:my-4 lg:border-l lg:border-ash-800 lg:px-6 lg:py-0">
              <GameHud state={state} onPlay={play} />
            </div>
          </div>
        </FramedPanel>
      </Reveal>
    </Container>
  )
}
