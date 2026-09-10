'use client'

import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { PhoneFrame } from '@/components/phone-frame'
import { NexusScreen } from '@/components/nexus-screen'
import { MatrixScreen } from '@/components/matrix-screen'
import { RecordingScreen } from '@/components/recording-screen'
import { TranscriptModal } from '@/components/transcript-modal'
import type { Space } from '@/lib/spaces'

type Screen = 'nexus' | 'matrix' | 'recording'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('nexus')
  const [activeSpace, setActiveSpace] = useState<Space | null>(null)
  const [showTranscript, setShowTranscript] = useState(false)

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        {screen === 'nexus' && (
          <NexusScreen key="nexus" onActivate={() => setScreen('matrix')} />
        )}

        {screen === 'matrix' && (
          <MatrixScreen
            key="matrix"
            onBack={() => setScreen('nexus')}
            onSelect={(space) => {
              setActiveSpace(space)
              setScreen('recording')
            }}
          />
        )}

        {screen === 'recording' && activeSpace && (
          <RecordingScreen
            key="recording"
            space={activeSpace}
            onBack={() => setScreen('matrix')}
            onFinish={() => setShowTranscript(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTranscript && activeSpace && (
          <TranscriptModal
            space={activeSpace}
            onClose={() => {
              setShowTranscript(false)
              setScreen('nexus')
            }}
          />
        )}
      </AnimatePresence>
    </PhoneFrame>
  )
}
