// Shared Firebase Admin SDK bootstrap for one-off scripts (import, backfill,
// etc). Scripts run with full server authority, bypassing Firestore security
// rules — never expose this credential to client code or commit it to git.
import { config } from 'dotenv';
config({ path: '.env.local' });

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    console.error(
      'Missing FIREBASE_SERVICE_ACCOUNT_JSON in .env.local.\n' +
        'Firebase console → Project settings → Service accounts → Generate new private key,\n' +
        'then paste the ENTIRE downloaded JSON file as a single line into .env.local as:\n' +
        "FIREBASE_SERVICE_ACCOUNT_JSON='{\"type\":\"service_account\",...}'"
    );
    process.exit(1);
  }
  try {
    return JSON.parse(raw);
  } catch {
    console.error('FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON — check it was pasted as one unbroken line.');
    process.exit(1);
  }
}

export function getAdminDb() {
  if (getApps().length === 0) {
    initializeApp({ credential: cert(loadServiceAccount()) });
  }
  return getFirestore();
}
