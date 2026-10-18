import { DEMO_QUERY_PARAM } from '../config/constants.js'
import { demoStory } from './demo.js'
import { story } from './story.js'

/** Основной рассказ, или демо всех блоков, если в адресе есть ?demo */
export function getActiveStory() {
  const params = new URLSearchParams(window.location.search)

  return params.has(DEMO_QUERY_PARAM) ? demoStory : story
}
