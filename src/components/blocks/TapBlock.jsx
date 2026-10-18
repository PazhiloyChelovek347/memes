import { ui } from '../../data/ui.js'
import { useProgress } from '../../hooks/progressContext.js'
import Button from '../ui/Button.jsx'
import Message from '../ui/Message.jsx'

/** Нажми N раз. @param {{ block: import('../../types/story.js').TapBlock }} props */
function TapBlock({ block }) {
  const { getTaps, addTap, isActive } = useProgress()
  const count = getTaps(block.id)
  const completed = isActive(block.id) || count >= block.target

  return (
    <div className="stack">
      {block.text && <p className="tap-block__text">{block.text}</p>}
      <Button done={completed} disabled={completed} onClick={() => addTap(block.id, block.target)}>
        {completed ? (block.doneLabel ?? ui.tap.done) : (block.buttonLabel ?? ui.tap.button)}
      </Button>
      <p className="tap-block__counter" aria-live="polite">
        {Math.min(count, block.target)} / {block.target}
      </p>
      {completed && <Message>{block.message}</Message>}
    </div>
  )
}

export default TapBlock
