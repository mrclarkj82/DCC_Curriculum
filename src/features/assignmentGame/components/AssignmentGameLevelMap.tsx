import type { CSSProperties } from 'react';
import { assignmentGameTileAssets } from '../levels/ruinedCourtyardLevel';
import type {
  AssignmentGameLevel,
  AssignmentGameLevelFeature,
  AssignmentGameLevelZone,
  AssignmentGameTileId,
} from '../levels/assignmentGameLevelTypes';
import type { AssignmentGameProgressionState } from '../progressionTypes';

interface AssignmentGameLevelMapProps {
  level: AssignmentGameLevel;
  progressionState: AssignmentGameProgressionState;
}

function tileStyle(tileId: AssignmentGameTileId): CSSProperties {
  const tileAsset = assignmentGameTileAssets[tileId];

  return {
    backgroundImage: `url("${tileAsset.src}"), ${tileAsset.fallbackBackground}`,
  };
}

function gridOverlayStyle(
  level: AssignmentGameLevel,
  overlay: AssignmentGameLevelZone,
): CSSProperties {
  return {
    left: `${(overlay.x / level.dimensions.columns) * 100}%`,
    top: `${(overlay.y / level.dimensions.rows) * 100}%`,
    width: `${(overlay.width / level.dimensions.columns) * 100}%`,
    height: `${(overlay.height / level.dimensions.rows) * 100}%`,
  };
}

function featureStyle(
  level: AssignmentGameLevel,
  feature: AssignmentGameLevelFeature,
  isUnlockedGate = false,
): CSSProperties {
  if (isUnlockedGate) {
    return {
      ...gridOverlayStyle(level, feature),
      backgroundImage:
        'radial-gradient(circle, rgba(0, 229, 255, 0.78), transparent 52%), linear-gradient(180deg, rgba(255, 176, 0, 0.32), rgba(8, 3, 18, 0.64))',
    };
  }

  return {
    ...gridOverlayStyle(level, feature),
    ...tileStyle(feature.tileId),
  };
}

export function AssignmentGameLevelMap({ level, progressionState }: AssignmentGameLevelMapProps) {
  const mapStyle = {
    '--assignment-game-level-columns': level.dimensions.columns,
    '--assignment-game-level-rows': level.dimensions.rows,
  } as CSSProperties;

  return (
    <div className="assignment-game-level">
      <div
        className="assignment-game-level-map"
        style={mapStyle}
        aria-label={`${level.name} level map. ${level.objectiveText}`}
        role="img"
      >
        {level.tileRows.map((row, rowIndex) =>
          row.map((tileId, columnIndex) => {
            const tileAsset = assignmentGameTileAssets[tileId];
            const tileKey = `${rowIndex}-${columnIndex}-${tileId}`;

            return (
              <span
                className={`assignment-game-map-tile assignment-game-map-tile--${tileId}`}
                key={tileKey}
                style={tileStyle(tileId)}
                title={tileAsset.label}
                aria-hidden="true"
              />
            );
          }),
        )}

        {level.features.map((feature) => {
          const isUnlockedGate =
            feature.kind === 'lockedGate' &&
            progressionState.unlockedGateIds.some((gateId) => gateId === feature.id);

          return (
            <span
              className={`assignment-game-level-feature assignment-game-level-feature--${feature.kind}${
                isUnlockedGate ? ' is-unlocked' : ''
              }`}
              key={feature.id}
              style={featureStyle(level, feature, isUnlockedGate)}
              title={isUnlockedGate ? `${feature.label} restored` : feature.label}
              aria-hidden="true"
            />
          );
        })}

        {level.blockedZones.map((zone) => (
          <span
            className="assignment-game-level-blocked-zone"
            key={zone.id}
            style={gridOverlayStyle(level, zone)}
            title={zone.label}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="assignment-game-level-objective">
        <p className="retro-label">First Level</p>
        <h3>{level.name}</h3>
        <p>{level.objectiveText}</p>
        <p className="assignment-game-level-progress">{progressionState.statusText}</p>
      </div>

      <dl className="assignment-game-level-meta" aria-label={`${level.name} data`}>
        <div>
          <dt>Level</dt>
          <dd>{level.id}</dd>
        </div>
        <div>
          <dt>Grid</dt>
          <dd>
            {level.dimensions.columns} x {level.dimensions.rows}
          </dd>
        </div>
        <div>
          <dt>Tile</dt>
          <dd>{level.dimensions.tileSize}px</dd>
        </div>
      </dl>
    </div>
  );
}
