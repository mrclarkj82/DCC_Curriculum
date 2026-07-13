import type { AssignmentGameInventoryState } from '../inventoryTypes';

interface AssignmentGameCollectibleLayerProps {
  inventoryState: AssignmentGameInventoryState;
}

export function AssignmentGameCollectibleLayer({
  inventoryState,
}: AssignmentGameCollectibleLayerProps) {
  return (
    <div className="assignment-game-collectible-layer" aria-label="Collectible layer">
      {inventoryState.items.map((item) => {
        const isNearby = inventoryState.nearbyItem?.id === item.id;

        return (
          <div
            className={`assignment-game-collectible assignment-game-collectible--${item.id} assignment-game-collectible--${item.status}${
              isNearby ? ' is-nearby' : ''
            }`}
            key={item.id}
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
            }}
            aria-label={`${item.name}, ${item.status}`}
            role="img"
            title={item.description}
          >
            <span className="assignment-game-collectible-sprite" aria-hidden="true" />
            <span className="assignment-game-collectible-name" aria-hidden="true">
              {item.shortName}
            </span>
            {isNearby && (
              <span className="assignment-game-collectible-prompt" aria-hidden="true">
                Press C
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
