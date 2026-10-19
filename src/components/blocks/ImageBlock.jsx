import ReactionMark from "../story/ReactionMark.jsx";
import { assetUrl } from "../../lib/assetUrl.js";

/** Картинка, опционально с подписью. @param {{ block: import('../../types/story.js').ImageBlock }} props */
function ImageBlock({ block }) {
  return (
    <figure className="image-block">
      <div className="media-frame">
        <img
          className="image-block__img"
          src={assetUrl(block.src)}
          alt={block.alt ?? ""}
          loading="lazy"
          decoding="async"
        />
        <ReactionMark />
      </div>
      {block.caption && (
        <figcaption className="image-block__caption">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default ImageBlock;
