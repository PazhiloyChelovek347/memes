import PageCard from '../layout/PageCard.jsx'
import BlockRenderer from './BlockRenderer.jsx'

/** @param {{ page: import('../../types/story.js').Page, titleRef?: import('react').Ref<HTMLHeadingElement> }} props */
function StoryPage({ page, titleRef }) {
  return (
    <PageCard title={page.title} titleRef={titleRef}>
      {page.blocks.map((block, index) => (
        <BlockRenderer key={block.id ?? index} block={block} />
      ))}
    </PageCard>
  )
}

export default StoryPage
