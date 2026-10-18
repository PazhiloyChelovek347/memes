import { useEffect, useRef } from 'react'

import Navigation from '../components/layout/Navigation.jsx'
import { blockRegistry } from '../components/blocks/registry.js'
import StoryPage from '../components/story/StoryPage.jsx'
import { getActiveStory } from '../data/index.js'
import { ProgressContext } from '../hooks/progressContext.js'
import { useArrowKeys } from '../hooks/useArrowKeys.js'
import { useStoryProgress } from '../hooks/useStoryProgress.js'
import { useSwipe } from '../hooks/useSwipe.js'
import { validateStory } from '../lib/story.js'

const story = getActiveStory()
validateStory(story, Object.keys(blockRegistry))

function App() {
  const progress = useStoryProgress(story)
  const { page, pageIndex, goNext, goPrevious } = progress
  const titleRef = useRef(null)
  const isFirstRender = useRef(true)

  const swipeHandlers = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrevious })
  useArrowKeys({ onLeft: goPrevious, onRight: goNext })

  // При смене страницы — наверх и фокус на заголовок (для скринридеров)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    window.scrollTo({ top: 0 })
    titleRef.current?.focus({ preventScroll: true })
  }, [pageIndex])

  return (
    <ProgressContext value={progress}>
      <main className="app" {...swipeHandlers}>
        <div className="app__stage" key={page.id}>
          <StoryPage page={page} titleRef={titleRef} />
        </div>

        <Navigation
          pageIndex={pageIndex}
          pageCount={progress.pageCount}
          canGoPrevious={progress.canGoPrevious}
          canGoNext={progress.canGoNext}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      </main>
    </ProgressContext>
  )
}

export default App
