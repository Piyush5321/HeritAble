/**
 * ==============================================================================
 * HeritAble - Firebase Backend (Real Config)
 * ==============================================================================
 * Uses Firebase v11 via CDN ESM. Provides:
 *  - Google Sign-In (Popup)
 *  - Email / Password Sign-In & Sign-Up
 *  - Password Reset Email
 *  - Sign Out
 *  - Firestore user-profile sync
 *  - onAuthStateChanged listener
 * ==============================================================================
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// ── Your Firebase project credentials ────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyBr6UkWrNBkbg96wbRNO5_mC1d8f0UfqqM",
  authDomain:        "loginfac-fd6a7.firebaseapp.com",
  projectId:         "loginfac-fd6a7",
  storageBucket:     "loginfac-fd6a7.firebasestorage.app",
  messagingSenderId: "316932861517",
  appId:             "1:316932861517:web:d9b3fee3da853cdf9ef604"
};
// ─────────────────────────────────────────────────────────────────────────────

// Singleton init (safe to call multiple times)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db   = getFirestore(app);

// Google provider – always show account chooser
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

console.log("✅ Firebase connected →", firebaseConfig.projectId);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Write / merge a user document into the `users` collection */
async function syncUserToFirestore(user, extra = {}) {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid:         user.uid,
      displayName: user.displayName || extra.displayName || "Explorer",
      email:       user.email,
      photoURL:    user.photoURL || "",
      lastLogin:   serverTimestamp(),
      ...extra
    }, { merge: true });
  } catch (e) {
    // Firestore is optional – log but never block auth
    console.warn("Firestore sync skipped:", e.message);
  }
}

// ── Auth API ──────────────────────────────────────────────────────────────────

/** Google popup sign-in */
async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  await syncUserToFirestore(result.user, { provider: "google" });
  return { user: result.user, isDemo: false };
}

/** Email + password sign-in */
async function loginWithEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await syncUserToFirestore(cred.user, { provider: "password" });
  return { user: cred.user, isDemo: false };
}

/** Create a new account with email + password */
async function signupWithEmail(email, password, displayName, language = "English") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(cred.user, { displayName });
  await syncUserToFirestore(cred.user, {
    displayName,
    language,
    provider:  "password",
    createdAt: serverTimestamp(),
    xp:        100
  });
  return { user: cred.user, isDemo: false };
}

/** Send a password-reset email */
async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
  return { isDemo: false };
}

/** Sign out */
async function logoutUser() {
  await signOut(auth);
}

/** Subscribe to auth state (returns unsubscribe fn) */
function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Expose on window so non-module script.js can call these ──────────────────
window.firebaseAuth = {
  loginWithGoogle,
  loginWithEmail,
  signupWithEmail,
  resetPassword,
  logoutUser,
  onAuthChange,
  isConfigured: () => true
};
