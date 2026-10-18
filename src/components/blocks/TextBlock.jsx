/** @param {{ block: import('../../types/story.js').TextBlock }} props */
function TextBlock({ block }) {
  return <p className="text-block">{block.text}</p>
}

export default TextBlock
