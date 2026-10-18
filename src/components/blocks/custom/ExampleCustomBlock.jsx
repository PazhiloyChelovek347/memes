import { useProgress } from '../../../hooks/progressContext.js'
import Button from '../../ui/Button.jsx'
import Message from '../../ui/Message.jsx'

/**
 * Пример своего блока. Получает весь объект блока из data-файла (любые поля)
 * и через useProgress может отметить себя выполненным — это откроет allowNext.
 */
function ExampleCustomBlock({ block }) {
  const { isActive, activate } = useProgress()
  const done = isActive(block.id)

  return (
    <div className="stack">
      <p className="tap-block__text">{block.text}</p>
      <Button variant="positive" done={done} onClick={() => activate(block.id)}>
        {block.buttonLabel}
      </Button>
      {done && <Message>{block.message}</Message>}
    </div>
  )
}

export default ExampleCustomBlock
