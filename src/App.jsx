import { useRef, useState } from 'react'
import { pages } from './content'
import Page from './components/Page'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage')

    return savedPage ? Number(savedPage) : 0
  })

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('answers')

    return savedAnswers ? JSON.parse(savedAnswers) : {}
  })

  const [clickedButtons, setClickedButtons] = useState(() => {
    const savedButtons = localStorage.getItem('clickedButtons')
    return savedButtons ? JSON.parse(savedButtons) : []
  })

  const [confirmedPages, setConfirmedPages] = useState(() => {
    const savedPages = localStorage.getItem('confirmedPages')

    return savedPages ? JSON.parse(savedPages) : []
  })

  const touchStartX = useRef(null)

  const saveProgress = (page, newAnswers) => {
    localStorage.setItem('currentPage', String(page))
    localStorage.setItem('answers', JSON.stringify(newAnswers))
  }

  const handleButtonClick = (buttonId) => {
    setClickedButtons((current) => {
      if (current.includes(buttonId)) {
        return current
      }

      const updated = [...current, buttonId]

      localStorage.setItem(
        'clickedButtons',
        JSON.stringify(updated),
      )

      return updated
    })
  }

  const handleConfirm = (pageId) => {
    setConfirmedPages((current) => {
      if (current.includes(pageId)) {
        return current
      }

      const updated = [...current, pageId]

      localStorage.setItem(
        'confirmedPages',
        JSON.stringify(updated),
      )

      return updated
    })
  }

  const canGoNext = () => {
    const page = pages[currentPage]

    if (!page.requireConfirmation) {
      return true
    }

    if (page.type === 'custom') {
      return confirmedPages.includes(page.id)
    }

    const confirmationButton = page.content.find(
      (item) => item.type === 'button' && item.confirm === true
    )

    if (!confirmationButton?.id) {
      return false
    }

    return clickedButtons.includes(confirmationButton.id)
  }

  const goNext = () => {
    if (!canGoNext()) {
      return
    }

    if (currentPage < pages.length - 1) {
      const nextPage = currentPage + 1

      setCurrentPage(nextPage)
      saveProgress(nextPage, answers)
    }
  }

  const goPrevious = () => {
    if (currentPage > 0) {
      const previousPage = currentPage - 1

      setCurrentPage(previousPage)
      saveProgress(previousPage, answers)
    }
  }

  const handleAnswer = (contentIndex, optionIndex) => {
    const newAnswers = {
      ...answers,
      [`${pages[currentPage].id}-${contentIndex}`]: optionIndex,
    }

    setAnswers(newAnswers)
    saveProgress(currentPage, newAnswers)
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) {
      return
    }

    const touchEndX = event.changedTouches[0].clientX
    const distance = touchEndX - touchStartX.current

    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        goNext()
      } else {
        goPrevious()
      }
    }

    touchStartX.current = null
  }

  const currentPageData = pages[currentPage]
  const CustomPage = currentPageData.component

  return (
    <main
      className="app"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="page-animation" key={pages[currentPage].id}>
        {currentPageData.type === 'custom' ? (
          <CustomPage
            page={currentPageData}
            onConfirm={() => handleConfirm(currentPageData.id)}
          />
        ) : (
          <Page
            page={currentPageData}
            answer={answers}
            clickedButtons={clickedButtons}
            onAnswer={handleAnswer}
            onButtonClick={handleButtonClick}
          />
        )}
      </div>

      <div className="navigation">
        <button onClick={goPrevious} disabled={currentPage === 0}>
          Назад
        </button>

        <span>
          {currentPage + 1} / {pages.length}
        </span>

        <button
          onClick={goNext}
          disabled={
            currentPage === pages.length - 1 ||
            !canGoNext()
          }
        >
          Вперёд
        </button>
      </div>
    </main>
  )
}

export default App