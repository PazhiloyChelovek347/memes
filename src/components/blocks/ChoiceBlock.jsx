import { useProgress } from '../../hooks/progressContext.js'
import Button from '../ui/Button.jsx'
import Message from '../ui/Message.jsx'

/** Вопрос с вариантами ответа. @param {{ block: import('../../types/story.js').ChoiceBlock }} props */
function ChoiceBlock({ block }) {
  const { getAnswer, setAnswer } = useProgress()
  const selected = getAnswer(block.id)
  const options = block.options ?? []

  return (
    <div className="stack" role="group" aria-labelledby={`${block.id}-question`}>
      <p className="choice-block__question" id={`${block.id}-question`}>
        {block.question}
      </p>
      {options.map((option, index) => (
        <Button key={index} aria-pressed={selected === index} onClick={() => setAnswer(block.id, index)}>
          {option.label}
        </Button>
      ))}
      <Message>{options[selected]?.message}</Message>
    </div>
  )
}

export default ChoiceBlock
