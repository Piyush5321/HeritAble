# HeritAble - AI Cultural Heritage Guide
## Complete Project Documentation

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [File Structure](#file-structure)
4. [Features & Functionality](#features--functionality)
5. [File Descriptions](#file-descriptions)
6. [Setup & Configuration](#setup--configuration)

---

## 🌍 Project Overview

**HeritAble** is an interactive, AI-powered cultural heritage platform that celebrates global traditions, historical sites, and ancestral knowledge. It combines cutting-edge web technologies with cultural education to create an accessible, engaging experience for exploring humanity's diverse heritage.

### Key Objectives
- Make cultural heritage accessible to everyone through AI-driven storytelling
- Provide interactive heritage maps with historical sites
- Enable museum artifact analysis with cultural insights
- Deliver personalized learning experiences through quizzes and challenges
- Ensure accessibility for all users (WCAG compliance focus)

### Target Users
- Cultural enthusiasts and heritage explorers
- Students and educators
- Museum visitors and heritage tourists
- Individuals researching ancestral roots

---

## 🛠 Tech Stack

### Frontend Framework
- **React 19.0.1** - Modern UI library with hooks and concurrent rendering
- **TypeScript ~5.8.2** - Type-safe JavaScript for better development experience
- **Vite 6.2.3** - Lightning-fast build tool and dev server (port 3000)

### Styling & Design
- **Tailwind CSS 4.1.14** - Utility-first CSS framework for rapid UI development
- **Tailwind Vite Plugin 4.1.14** - Optimized Tailwind integration with Vite
- **Autoprefixer 10.4.21** - Vendor prefix management for cross-browser compatibility
- **Material Symbols Outlined** - Google's Material Design icon library (via CDN)
- **Inter Font (Google Fonts)** - Modern, accessible typeface

### Backend & APIs
- **Express.js 4.21.2** - Node.js web framework for API endpoints
- **Google Generative AI (@google/genai ^2.4.0)** - Gemini API for AI-powered cultural storytelling
- **Dotenv 17.2.3** - Environment variable management for secure configuration

### Authentication & Database
- **Firebase v11.4.0** (via CDN ESM)
  - Firebase Auth (Google Sign-In, Email/Password)
  - Firestore (Real-time NoSQL database for user profiles)

### Animation & Motion
- **Motion 12.23.24** - Smooth animation library for dynamic UI transitions

### Development Tools
- **TSX 4.21.0** - TypeScript execution for Node.js scripts
- **ESBuild 0.25.0** - Fast JavaScript bundler
- **@types/node ^22.14.0** - TypeScript types for Node.js
- **@types/express ^4.17.21** - TypeScript types for Express
- **@vitejs/plugin-react ^5.0.4** - React Fast Refresh plugin for Vite

### Build & Preview
- **Vite Build** - Optimized production build
- **Vite Preview** - Local production build preview

---

## 📁 File Structure

```
HeritAble/
├── .git/                          # Git repository (version control)
├── .gitignore                     # Git ignore rules
├── .env.example                   # Environment variable template
├── package.json                   # Project dependencies & scripts
├── package-lock.json              # Locked dependency versions
├── tsconfig.json                  # TypeScript configuration
├── index.html                     # Main HTML entry point
├── firebase-config.js             # Firebase initialization & auth functions
├── script.js                      # Main vanilla JavaScript logic
├── style.css                      # Global styling and design system
├── metadata.json                  # Project metadata & capabilities
├── README.md                      # Project readme (currently empty)
├── vite.config.ts                 # Vite build configuration (if exists)
│
└── src/                           # React source directory
    ├── App.tsx                    # Root React component
    ├── main.tsx                   # React entry point
    └── index.css                  # React component styles
```

### Total Files: 14 Core Files
- **Configuration Files**: 5 (.env.example, package.json, tsconfig.json, metadata.json, .gitignore)
- **Frontend Files**: 4 (index.html, script.js, style.css, README.md)
- **React Files**: 3 (App.tsx, main.tsx, index.css)
- **Backend Files**: 1 (firebase-config.js)
- **Version Control**: 1 (.git folder)

---

## ✨ Features & Functionality

### 1. **Home Page (Hero & Exploration Hub)**
- Hero banner with call-to-action buttons
- "Explore Your Culture" section with featured cards
- Quick access cards for Traditions, Culinary Roots
- Festival of Lights featured banner with interactive prompt

### 2. **Explore Culture Section**
- **Search Bar**: Full-text search with voice recognition
- **Filter Pills**: All, Country, State, Culture, Festivals, Traditions, Food
- **Culture Cards Grid**: 5+ culture cards with:
  - Holi Festival of Colors
  - The Way of Tea (Chanoyu) - Japanese Tea Ceremony
  - Tikal Citadel - Maya Architecture
  - Chhath Puja - Sun Gratitude Festival
  - Ayurvedic Spice Traditions
- **Interactive Actions**: Explore button & Listen (text-to-speech)

### 3. **Heritage Map (Interactive)**
- **3-Panel Layout**:
  - Left: Filter by Era (All, Ancient, Medieval, Modern) + Site List
  - Middle: Interactive stylized map with pinned heritage sites
  - Right: Detailed site information panel

- **Heritage Sites**:
  - Nalanda Mahavihara (Ancient Buddhist University, Bihar, India)
  - Rajgir Hills (Historic Valley, Bihar, India)
  - Tikal Citadel (Maya Heartland, Guatemala)
  - Kyoto Uji Tea Gardens (Living Heritage, Japan)

- **Features**:
  - Click pins to load details
  - Era-based filtering
  - Audio narration for sites
  - AI guide descriptions

### 4. **AI Museum Guide**
- **Artifact Upload Interface**:
  - Drag-and-drop file upload
  - File picker dialog
  - Drag-over visual feedback

- **Sample Museum Artifacts** (3 pre-loaded):
  - Terracotta Vase (2500 BCE, Indus Valley)
  - Chola Bronze Nataraja (11th Century, Tamil Nadu)
  - Mayan Jade Mask (600-900 CE, Guatemala)

- **Analysis Output**:
  - Archaeological Analysis
  - Cultural Significance
  - Audio storytelling
  - Listen, Pause, Slower speed controls

### 5. **AI Cultural Storyteller (Chat Interface)**
- **Sidebar Navigation**: Links to all sections
- **Chat History**: Message flow with agent & user bubbles
- **Rich Story Cards**: With images, metadata, audio controls
- **Quick Prompts**: Predefined prompts for quick exploration
- **Voice Integration**: Microphone button for voice queries
- **Simplify Language**: Toggle for simplified explanations

### 6. **Learn & Play Section** (Interactive Quizzes)
- **3 Quiz Questions**:
  1. Which ancient university hosted 10,000+ scholars?
  2. What philosophical concept celebrates rustic simplicity in Chanoyu?
  3. Which festival involves sun worship in rivers?

- **Quiz Mechanics**:
  - Multiple choice (4 options)
  - XP rewards (150 XP per correct answer)
  - Detailed explanations
  - User level tracking

### 7. **Accessibility Features**
- **Accessibility Button** (Top-right header)
- **Settings**:
  - Voice Speed Control (0.5x - 2.0x)
  - Text Size Adjustment (small, normal, large)
  - High Contrast Mode
  - Simplified Mode
  - Voice-First Option
  - Language Selection

- **Implementations**:
  - ARIA labels on buttons
  - Semantic HTML
  - Keyboard navigation
  - Screen reader support
  - Color contrast compliance
  - Material Symbols for icon consistency

### 8. **Authentication System**
- **Firebase Auth Integration**:
  - Google Sign-In (with account chooser)
  - Email/Password Login
  - Email/Password Sign-Up
  - Password Reset Email
  - Logout functionality

- **User Profile Sync**:
  - Firestore document storage
  - Last login tracking
  - Display name & language preference
  - XP & Level tracking
  - Provider identification

### 9. **Header Navigation**
- Brand Logo (Account Balance icon + "HeritAble.")
- Nav Links: Home, Explore Culture, Heritage Map, AI Museum, Learn & Play
- Accessibility Button (left-aligned)
- User Profile Button (person icon)

### 10. **Voice & Audio**
- **Text-to-Speech**:
  - Native Web Speech API
  - Multiple voice selection
  - Speed control
  - Natural voice prioritization
  - Pause/Resume functionality

- **Voice Recognition**:
  - Microphone input for search
  - Voice queries in chat
  - Fallback for unsupported browsers

---

## 📄 File Descriptions

### **index.html**
- **Size**: 1062+ lines
- **Purpose**: Main HTML entry point
- **Contains**:
  - DOCTYPE, meta tags, viewport configuration
  - Google Fonts & Material Symbols CDN imports
  - Firebase v11 ESM imports (Auth & Firestore)
  - Root div for React app
  - All view sections (home, explore, map, museum, storyteller)
  - Modal overlays (auth, accessibility, quiz)
  - Complete DOM structure for all features
- **Key Sections**:
  - Header with navigation
  - Main content area with 5+ views
  - Culture cards grid
  - Heritage map layout
  - Museum guide interface
  - Chat storyteller interface
  - Modals for auth & accessibility

### **script.js**
- **Size**: 1341+ lines (truncated in view)
- **Purpose**: Core vanilla JavaScript logic
- **Contains**:
  - Global app state management
  - Cultural database (artifacts, sites, quizzes)
  - View navigation & switching
  - Filter & search functionality
  - Map interaction (pin clicks, era filtering)
  - Artifact upload & analysis
  - Chat/storyteller message handling
  - Text-to-speech & voice recognition
  - Accessibility controls
  - Auth modal handlers
  - XP & level system
  - Quiz mechanics
- **Key Functions**:
  - `showView()` - Switch between main views
  - `setupNavigation()` - Attach click handlers
  - `filterCultureCards()` - Search & filter logic
  - `loadSiteDetails()` - Load heritage site info
  - `selectSampleArtifact()` - Museum artifact selection
  - `speakText()` - Web Speech API wrapper
  - `generateAIStoryResponse()` - AI response generation
  - `setupAccessibilityControls()` - A11y setup

### **firebase-config.js**
- **Size**: ~100 lines
- **Purpose**: Firebase initialization & authentication
- **Contains**:
  - Firebase v11 ESM imports
  - Firebase project configuration (API keys, auth domain, etc.)
  - Auth provider setup (Google OAuth with account chooser)
  - Firestore database initialization
  - Helper functions for user sync
- **Exported Functions**:
  - `loginWithGoogle()` - Google Sign-In popup
  - `loginWithEmail()` - Email/password login
  - `signupWithEmail()` - Create new account
  - `resetPassword()` - Send password reset email
  - `logoutUser()` - Sign out
  - `onAuthChange()` - Subscribe to auth state changes
- **Firestore Collections**:
  - `users/` - User profiles with metadata

### **style.css**
- **Size**: ~600+ lines
- **Purpose**: Global styling & design system
- **Contains**:
  - CSS custom properties (design tokens)
  - Color palette (primary, secondary, tertiary, surface, etc.)
  - Typography scales
  - Component styles:
    - Navigation header
    - Hero card
    - Culture cards
    - Map layout (sidebar, interactive stage, detail panel)
    - Museum guide interface
    - Chat storyteller
    - Buttons & CTAs
    - Modals & overlays
  - Responsive grid layouts
  - Animation definitions
  - Accessibility utilities

### **src/App.tsx**
- **Size**: 8 lines
- **Purpose**: Root React component (minimal)
- **Currently**: Empty `<div></div>` - placeholder for future React implementation
- **Future**: Will contain React components for UI

### **src/main.tsx**
- **Size**: 12 lines
- **Purpose**: React entry point
- **Contains**:
  - React imports (StrictMode, createRoot)
  - App component import
  - Global CSS import
  - createRoot render call with StrictMode wrapper

### **src/index.css**
- **Size**: Not fully specified
- **Purpose**: React component-specific styles
- **May contain**: Tailwind imports, component-specific CSS

### **package.json**
- **Size**: ~40 lines
- **Purpose**: Project configuration & dependency management
- **Metadata**:
  - Name: "react-example"
  - Version: "0.0.0"
  - Type: "module" (ES modules)
- **Scripts**:
  - `dev`: Start Vite dev server (port 3000, host 0.0.0.0)
  - `build`: Production build
  - `preview`: Preview production build
  - `clean`: Remove dist & server.js
  - `lint`: TypeScript type checking (no emit)
- **Dependencies**: React, Vite, Tailwind, Google Generative AI, Firebase, Express, etc.
- **DevDependencies**: TypeScript, ESBuild, TSX, etc.

### **tsconfig.json**
- **Size**: ~30 lines
- **Purpose**: TypeScript compiler configuration
- **Key Settings**:
  - Target: ES2022
  - Module: ESNext
  - JSX: react-jsx
  - Strict mode enabled
  - Path aliases (@/*)
  - Skip lib check enabled

### **firebase-config.js**
- **Firebase Project ID**: loginfac-fd6a7
- **API Key**: AIzaSyBr6UkWrNBkbg96wbRNO5_mC1d8f0UfqqM
- **Auth Domain**: loginfac-fd6a7.firebaseapp.com
- **Storage Bucket**: loginfac-fd6a7.firebasestorage.app

### **.env.example**
- **Purpose**: Template for environment variables
- **Variables**:
  - `GEMINI_API_KEY`: Gemini AI API key for cultural storytelling
  - `APP_URL`: Application hosting URL for OAuth callbacks

### **metadata.json**
- **Purpose**: Project metadata for hosting/deployment
- **Key Fields**:
  - Name: "HeritAble - AI Cultural Heritage Guide"
  - Description: Interactive cultural heritage platform
  - Requested Permissions: microphone, camera
  - Major Capabilities: MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API

### **.gitignore**
- **Purpose**: Exclude files from version control
- **Likely excludes**: node_modules/, dist/, .env, .DS_Store

### **README.md**
- **Status**: Currently empty
- **Purpose**: Project documentation (to be completed)

---

## 🔧 Setup & Configuration

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/HeritAble.git
   cd HeritAble
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials:
   # - GEMINI_API_KEY: Get from Google AI Studio
   # - APP_URL: Your application URL
   ```

4. **Firebase Configuration**
   - Update `firebase-config.js` with your Firebase project credentials
   - Or configure via Firestore console

5. **Start Development Server**
   ```bash
   npm run dev
   # Opens at http://localhost:3000
   ```

6. **Build for Production**
   ```bash
   npm run build
   # Output in /dist folder
   ```

7. **Preview Production Build**
   ```bash
   npm run preview
   ```

### Required API Keys
- **Google Generative AI (Gemini)**: For AI cultural storytelling
- **Firebase**: For authentication & Firestore database
- **Google Maps API** (optional): For enhanced heritage mapping

### Browser Support
- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Mobile Browsers: ✅ Full support (responsive design)

### Accessibility Compliance
- WCAG 2.1 Level AA target
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Adjustable text size
- Alt text for all images
- ARIA labels on interactive elements

---

## 🎯 Core Technologies Summary

| Category | Technology | Version |
|----------|-----------|---------|
| **Frontend Framework** | React | 19.0.1 |
| **Language** | TypeScript | ~5.8.2 |
| **Build Tool** | Vite | 6.2.3 |
| **CSS Framework** | Tailwind CSS | 4.1.14 |
| **Backend** | Express.js | 4.21.2 |
| **AI/API** | Google Generative AI | ^2.4.0 |
| **Database** | Firebase Firestore | v11 |
| **Authentication** | Firebase Auth | v11 |
| **Icons** | Material Symbols | via CDN |
| **Fonts** | Google Fonts (Inter) | via CDN |
| **Animation** | Motion | 12.23.24 |
| **Environment** | Node.js + npm | Latest |

---

## 📊 Statistics

- **Total Project Files**: 14 main files
- **Lines of Code**: 3000+ (including HTML structure)
- **Culture Database Records**: 8+ (5 cultures, 4 heritage sites, 3 artifacts, 3 quizzes)
- **Views/Sections**: 6 main views
- **Interactive Elements**: 50+ buttons & interactive components
- **API Integrations**: 3 (Firebase Auth, Firebase Firestore, Google Generative AI)
- **Accessibility Features**: 6+ customizable settings
- **Supported Languages**: Extensible via localization

---

## 🚀 Future Enhancements

- [ ] Multi-language support (i18n)
- [ ] Advanced heritage search filters
- [ ] User profile customization
- [ ] Social sharing features
- [ ] Offline support (PWA)
- [ ] Real-time collaborative learning
- [ ] Advanced AI image recognition for artifacts
- [ ] Virtual AR museum tours
- [ ] Community contribution system
- [ ] Performance optimizations & caching

---

## 📝 License

This project is licensed under Apache 2.0 (indicated in App.tsx header)

---

## 👥 Contributors

Currently in active development.

---

**Last Updated**: August 18, 2026
**Project Status**: In Development
**Version**: 0.0.0
