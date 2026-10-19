import { REACTION_EMOJI } from "../../config/constants.js";
import {
  BlockKeyContext,
  useReactionsContext,
} from "../../hooks/reactionsContext.js";
import { use } from "react";

/**
 * Значок реакции на блоке: у клиента — маленький эмодзи, в админке — бейджи устройств.
 * Лежит поверх блока в правом нижнем углу (position: absolute относительно .block
 * или .media-frame у картинок и видео).
 */
function ReactionMark() {
  const key = use(BlockKeyContext);
  const reactions = useReactionsContext();

  if (!reactions || !key) return null;

  if (reactions.getBadges) {
    const badges = reactions.getBadges(key);
    if (badges.length === 0) return null;

    return (
      <ul className="reactions reactions--admin">
        {badges.map((badge) => (
          <li
            key={badge.device_id}
            className="reactions__badge"
            title={badge.device_label}
          >
            {REACTION_EMOJI[badge.reaction]} <span>{badge.device_label}</span>
          </li>
        ))}
      </ul>
    );
  }

  const current = reactions.getReaction?.(key);
  if (!current) return null;

  return (
    <span
      className="reactions reactions--mark"
      key={current}
      aria-label={current === "like" ? "Нравится" : "Не нравится"}
    >
      {REACTION_EMOJI[current]}
    </span>
  );
}

export default ReactionMark;
