import { useProgress } from '../../hooks/progressContext.js'
import Button from '../ui/Button.jsx'
import Message from '../ui/Message.jsx'

/** Кнопка-реакция: после нажатия показывает message. @param {{ block: import('../../types/story.js').ButtonBlock }} props */
function ButtonBlock({ block }) {
  const { isActive, activate } = useProgress()
  const clicked = isActive(block.id)

  return (
    <div className="stack">
      <Button variant={block.variant} done={clicked} onClick={() => activate(block.id)}>
        {block.label}
      </Button>
      {clicked && <Message>{block.message}</Message>}
    </div>
  )
}

export default ButtonBlock
