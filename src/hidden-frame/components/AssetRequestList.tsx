import type { HiddenFrameAssetRequest } from '../data/hiddenFrameExpansionManifest';

interface AssetRequestListProps {
  requests: HiddenFrameAssetRequest[];
}

export function AssetRequestList({ requests }: AssetRequestListProps) {
  return (
    <div className="hidden-frame-asset-request-list" aria-label="Hidden Frame asset requests">
      {requests.map((request) => (
        <article className="hidden-frame-asset-request" key={request.id}>
          <div>
            <p className="hidden-frame-kicker">{request.assetType}</p>
            <h2>{request.label}</h2>
          </div>
          <p>{request.note}</p>
          <p className="hidden-frame-asset-request__meta">
            {request.priority} priority / {request.status}
          </p>
        </article>
      ))}
    </div>
  );
}
