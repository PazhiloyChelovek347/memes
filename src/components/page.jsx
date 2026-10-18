import { useState } from 'react'

import PageLayout from './PageLayout'

function Page({
  page,
  answer,
  clickedButtons,
  onAnswer,
  onButtonClick,
}) {
  const [tapCounts, setTapCounts] = useState({})
  const [messages, setMessages] = useState({})

  const handleTaskClick = (contentIndex, option, optionIndex) => {
    onAnswer(contentIndex, optionIndex)

    setMessages((current) => ({
      ...current,
      [contentIndex]: option.message,
    }))
  }

  const isVisible = (item) => {
    if (!item.visibleWhen) {
      return true
    }

    const {
      clicked,
      all,
      oneFrom,
      notClicked,
      none,
    } = item.visibleWhen

    if (clicked && !clickedButtons.includes(clicked)) {
      return false
    }

    if (all && !all.every((id) => clickedButtons.includes(id))) {
      return false
    }

    if (oneFrom && !oneFrom.some((id) => clickedButtons.includes(id))) {
      return false
    }

    if (notClicked && clickedButtons.includes(notClicked)) {
      return false
    }

    if (none && none.some((id) => clickedButtons.includes(id))) {
      return false
    }

    return true
  }

  const handleTap = (contentIndex, count, message) => {
    setTapCounts((current) => {
      const currentCount = current[contentIndex] || 0

      if (currentCount >= count) {
        return current
      }

      return {
        ...current,
        [contentIndex]: currentCount + 1,
      }
    })

    const currentCount = tapCounts[contentIndex] || 0

    if (currentCount + 1 >= count) {
      setMessages((current) => ({
        ...current,
        [contentIndex]: message,
      }))
    }
  }

  return (
    <PageLayout title={page.title}>
      {page.content.map((item, index) => {
        if (!isVisible(item)) {
          return null
        }

        if (item.type === 'text') {
          return <p key={index}>{item.value}</p>
        }

        if (item.type === 'image') {
          return (
            <img
              key={index}
              src={item.src}
              alt={item.alt || ''}
            />
          )
        }

        if (item.type === 'meme') {
          return (
            <div className="meme" key={index}>
              <img src={item.src} alt={item.alt || ''} />
              <p>{item.caption}</p>
            </div>
          )
        }

        if (item.type === 'button') {
          return (
            <div key={index} className="interactive">
              <button
                className={`button ${item.variant || 'neutral'} ${item.id && clickedButtons.includes(item.id) ? 'clicked' : ''
                  }`}
                onClick={() => {
                  if (item.id) {
                    onButtonClick(item.id)
                  }
                }}
              >
                {item.label}
              </button>

              {item.id &&
                clickedButtons.includes(item.id) &&
                item.message && (
                  <p className="button-message">
                    {item.message}
                  </p>
                )}
            </div>
          )
        }

        if (item.type === 'tap') {
          const currentCount = tapCounts[index] || 0
          const completed = currentCount >= item.count

          return (
            <div key={index} className="interactive">
              <p>{item.text}</p>

              <button
                onClick={() =>
                  handleTap(index, item.count, item.message)
                }
                disabled={completed}
              >
                {completed ? 'Готово' : 'Нажми меня'}
              </button>

              <p>
                {currentCount} / {item.count}
              </p>

              {completed && (
                <p className="button-message">
                  {item.message}
                </p>
              )}
            </div>
          )
        }

        if (item.type === 'task') {
          if (!Array.isArray(item.options)) {
            return null
          }

          const answerKey = `${page.id}-${index}`
          const selectedOption = answer[answerKey]

          return (
            <div key={index} className="task">
              <p className="task-question">
                {item.question}
              </p>

              <div className="task-options">
                {item.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() =>
                      handleTaskClick(
                        index,
                        option,
                        optionIndex,
                      )
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {selectedOption !== undefined && (
                <p className="task-message">
                  {item.options[selectedOption].message}
                </p>
              )}
            </div>
          )
        }

        return null
      })}
    </PageLayout>
  )
}

export default Page