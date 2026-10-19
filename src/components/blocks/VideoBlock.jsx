import ReactionMark from "../story/ReactionMark.jsx";
import { assetUrl } from "../../lib/assetUrl.js";

/** Видео с плеером, опционально с подписью. Автоплея нет: запускает сам пользователь. @param {{ block: import('../../types/story.js').VideoBlock }} props */
function VideoBlock({ block }) {
  return (
    <figure className="video-block">
      <div className="media-frame">
        <video
          className="video-block__video"
          src={assetUrl(block.src)}
          poster={block.poster ? assetUrl(block.poster) : undefined}
          controls
          playsInline
          preload="metadata"
          // не даём жестам по плееру (перемотка) листать страницу
          onTouchStart={(event) => event.stopPropagation()}
        />
        <ReactionMark />
      </div>
      {block.caption && (
        <figcaption className="video-block__caption">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default VideoBlock;
