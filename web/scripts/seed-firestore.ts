// One-off seed: pushes the local card catalog into Firestore's `cards`
// collection. Safe to re-run — it overwrites each doc with the current
// local values. Run with: npm run seed:firestore
import { config } from 'dotenv';
config({ path: '.env.local' });
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { CARDS } from '../src/lib/cards';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error('Missing NEXT_PUBLIC_FIREBASE_* env vars (check .env.local).');
  process.exit(1);
}

async function main() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const ids = Object.keys(CARDS);
  for (const id of ids) {
    await setDoc(doc(db, 'cards', id), CARDS[id]);
    console.log(`seeded: ${id}`);
  }
  console.log(`Done — ${ids.length} cards written to the "cards" collection.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
