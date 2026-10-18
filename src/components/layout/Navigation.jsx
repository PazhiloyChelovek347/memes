import { ui } from '../../data/ui.js'
import Button from '../ui/Button.jsx'

function Navigation({ pageIndex, pageCount, canGoPrevious, canGoNext, onPrevious, onNext }) {
  return (
    <nav className="nav" aria-label={ui.nav.label}>
      <Button variant="ghost" onClick={onPrevious} disabled={!canGoPrevious}>
        {ui.nav.previous}
      </Button>

      <ol className="nav__dots" aria-hidden="true">
        {Array.from({ length: pageCount }, (_, index) => (
          <li key={index} className={`nav__dot${index === pageIndex ? ' nav__dot--current' : ''}`} />
        ))}
      </ol>
      <span className="visually-hidden" aria-live="polite">
        {ui.nav.pageOf(pageIndex + 1, pageCount)}
      </span>

      <Button variant="ghost" onClick={onNext} disabled={!canGoNext}>
        {ui.nav.next}
      </Button>
    </nav>
  )
}

export default Navigation
