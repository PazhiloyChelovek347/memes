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

  const goNext = () => {
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

  return (
    <main
      className="app"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="page-animation" key={pages[currentPage].id}>
        <Page
          page={pages[currentPage]}
          answer={answers}
          clickedButtons={clickedButtons}
          onAnswer={handleAnswer}
          onButtonClick={handleButtonClick}
        />
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
          disabled={currentPage === pages.length - 1}
        >
          Вперёд
        </button>
      </div>
    </main>
  )
}

export default App