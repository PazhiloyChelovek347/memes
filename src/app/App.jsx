import { useEffect, useRef } from "react";

import AdminApp from "../components/admin/AdminApp.jsx";
import Navigation from "../components/layout/Navigation.jsx";
import { blockRegistry } from "../components/blocks/registry.js";
import StoryPage from "../components/story/StoryPage.jsx";
import { getActiveStory } from "../data/index.js";
import { ADMIN_QUERY_PARAM } from "../config/constants.js";
import { ProgressContext } from "../hooks/progressContext.js";
import { ReactionsContext } from "../hooks/reactionsContext.js";
import { useReactions } from "../hooks/useReactions.js";
import { useArrowKeys } from "../hooks/useArrowKeys.js";
import { useStoryProgress } from "../hooks/useStoryProgress.js";
import { useSwipe } from "../hooks/useSwipe.js";
import { validateStory } from "../lib/story.js";

const story = getActiveStory();
validateStory(story, Object.keys(blockRegistry));

function App() {
  if (new URLSearchParams(window.location.search).has(ADMIN_QUERY_PARAM)) {
    return <AdminApp />;
  }

  return <Reader />;
}

function Reader() {
  const reactions = useReactions();
  const progress = useStoryProgress(story);
  const { page, pageIndex, goNext, goPrevious } = progress;
  const titleRef = useRef(null);
  const isFirstRender = useRef(true);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrevious,
  });
  useArrowKeys({ onLeft: goPrevious, onRight: goNext });

  // При смене страницы — наверх и фокус на заголовок (для скринридеров)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
  }, [pageIndex]);

  return (
    <ProgressContext value={progress}>
      <ReactionsContext value={reactions}>
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
      </ReactionsContext>
    </ProgressContext>
  );
}

export default App;
