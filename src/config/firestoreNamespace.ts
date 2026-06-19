export const dccFirestoreNamespace =
  import.meta.env.VITE_FIRESTORE_NAMESPACE?.replace(/^\/+|\/+$/g, '') || 'apps/dcc';

export const dccCollectionPath = (collectionName: string): string =>
  `${dccFirestoreNamespace}/${collectionName}`;

export const dccDocumentPath = (collectionName: string, documentId: string): string =>
  `${dccCollectionPath(collectionName)}/${documentId}`;
