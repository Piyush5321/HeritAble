/**
 * HeritAble - AI Cultural Heritage Guide
 * Standalone Vanilla JavaScript logic
 * Fully interactive: Tab switching, Speech synthesis, AI Museum artifact analysis,
 * Heritage map exploration, Quiz gameplay, and Accessibility customizations.
 */

// Global State
const appState = {
  currentView: 'home',
  userXP: 1250,
  userLevel: 7,
  voiceSpeed: 1.0,
  voiceFirst: false,
  textSize: 'normal',
  highContrast: false,
  simplifiedMode: false,
  selectedMapSite: 'nalanda',
  speechSynth: window.speechSynthesis || null,
  currentUtterance: null,
  isPlayingAudio: false
};

// Cultural Database
const culturalDatabase = {
  artifacts: {
    terracotta_vase: {
      name: "Neolithic Terracotta Vessel",
      period: "c. 2500 BCE",
      origin: "Indus Valley Civilization, Harappa",
      category: "Ceramics & Pottery",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      description: "This hand-molded earthenware storage jar features delicate geometric cross-hatching and stylized pipal leaf motifs. Unearthed along the ancient riverbeds, it demonstrates early mastery in slip painting and high-temperature kiln firing.",
      culturalSignificance: "Such jars served both domestic food preservation and ritualistic ceremonial offerings during harvest cycles, showcasing the agricultural prosperity and community cohesion of Bronze Age urban settlements.",
      audioStory: "Centuries ago, an artisan gently turned clay along the fertile Indus basin. The painted curves preserved grain and oil through droughts, echoing prayers to the earth that sustained a great civilization."
    },
    bronze_statue: {
      name: "Chola Dancing Nataraja",
      period: "11th Century CE",
      origin: "Tamil Nadu, India",
      category: "Bronze Sculpture",
      image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80",
      description: "Cast using the lost-wax (cire perdue) technique, this iconic sculpture depicts Shiva enveloped in an aureole of cosmic fire, striking the Anandatandava pose that symbolizes creation and dissolution.",
      culturalSignificance: "A pinnacle of South Indian metallurgical art, balancing philosophical metaphors of time, motion, and cosmic order.",
      audioStory: "Within the ring of flames, the cosmic dance moves endlessly. One hand holds creation, another offers protection, reminding generations that destruction gives birth to new beginnings."
    },
    mayan_jade: {
      name: "Mayan Jadeite Ceremonial Mask",
      period: "600–900 CE (Late Classic)",
      origin: "Petén Basin, Guatemala",
      category: "Jade & Stone Carving",
      image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=800&q=80",
      description: "Intricately assembled mosaic tesserae of polished green jadeite depicting a divine ruler or the Maize Deity, with shell-inlaid eyes.",
      culturalSignificance: "Jade represented breath, life, and the verdant maize plant in Mesoamerican cosmology, connecting nobility with ancestral forces.",
      audioStory: "Gleaming with the vivid green of mountain forests, this mask preserved the breath of kings, ensuring their spirits walked safely into the celestial realm."
    }
  },
  sites: {
    nalanda: {
      name: "Nalanda Mahavihara",
      tag: "UNESCO SITE",
      location: "Bihar, India",
      era: "Ancient",
      coords: { x: 58, y: 46 },
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      history: "Nalanda was a renowned mahavihara (ancient residential Buddhist university) that flourished between the 5th and 12th centuries CE under the Gupta and Pala empires. It accommodated over 10,000 students and 2,000 teachers from Tibet, China, Korea, and Central Asia.",
      impact: "At its peak, it housed millions of manuscripts in the nine-story library Dharmaganja, pioneering systematic studies in astronomy, logic, linguistics, medicine, and philosophy.",
      insights: "Architectural marvel of red-brick viharas with subterranean drainage, meditation cells, and towering stupas.",
      speechText: "Nalanda University stood as the beacon of world learning for seven centuries, where scholars crossed deserts and mountains to read ancient manuscripts."
    },
    rajgir: {
      name: "Rajgir & Gridhrakuta",
      tag: "HISTORIC VALLEY",
      location: "Bihar, India",
      era: "Ancient",
      coords: { x: 54, y: 52 },
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      history: "Rajgir was the ancient capital of the Magadha kingdom. Nestled in a valley surrounded by seven hills, it was a pivotal retreat where the Buddha delivered his Lotus Sutra sermons on Vulture Peak.",
      impact: "Birthplace of the First Buddhist Council and historic site where Jain Tirthankara Mahavira spent numerous monsoon retreats.",
      insights: "Features ancient cyclopean stone walls dating back to the 6th century BCE stretching for over 40 kilometers.",
      speechText: "The tranquil valleys of Rajgir harbored great royal courts, thermal springs, and monastic peace where great philosophical dialogues took shape."
    },
    tikal: {
      name: "Tikal Citadel",
      tag: "MAYA HEARTLAND",
      location: "Petén, Guatemala",
      era: "Ancient",
      coords: { x: 28, y: 62 },
      image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80",
      history: "One of the most monumental urban centers of the pre-Columbian Maya civilization, flourishing deep within the lush rainforests.",
      impact: "Mastery of hydraulic reservoirs, limestone temple-pyramids aligned with astronomical solstices.",
      insights: "Temple IV rises over 65 meters above the jungle canopy, offering sweeping vistas of ancient ceremonial squares.",
      speechText: "Amid the dense canopy of Guatemala, Tikal's limestone pyramids pierced the clouds as centers of astronomy and sacred kingship."
    },
    kyoto_tea: {
      name: "Kyoto Uji Tea Gardens",
      tag: "LIVING HERITAGE",
      location: "Kyoto, Japan",
      era: "Medieval",
      coords: { x: 82, y: 38 },
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      history: "Developed during the Muromachi period, the Uji region pioneered the shade-grown cultivation method for matcha, giving birth to the Chanoyu tea ritual codified by Sen no Rikyu.",
      impact: "Fostered the wabi-sabi aesthetic—finding beauty in imperfection, simplicity, and mindful presence.",
      insights: "Every gesture in the tea ceremony is choreographed to honor guest, host, season, and transience.",
      speechText: "In Kyoto, the whisking of green tea is a timeless meditation on harmony, respect, purity, and tranquility."
    }
  },
  quizzes: [
    {
      title: "Cultural Heritage Quiz",
      question: "Which ancient university hosted over 10,000 scholars and housed the famous 9-story library Dharmaganja?",
      options: ["Nalanda Mahavihara", "Alexandria Library", "Taxila Academy", "Athens Lyceum"],
      correct: 0,
      xp: 150,
      explanation: "Nalanda Mahavihara in Bihar, India was the premier residential university of the ancient world."
    },
    {
      title: "Traditions & Rituals",
      question: "In the Japanese Chanoyu ceremony, what philosophical concept celebrates rustic simplicity and transience?",
      options: ["Kaizen", "Wabi-Sabi", "Ikigai", "Bushido"],
      correct: 1,
      xp: 150,
      explanation: "Wabi-sabi values unadorned authenticity and natural patina in ceramics and teahouse architecture."
    },
    {
      title: "Festivals of Light",
      question: "Which unique festival involves offering prayers to the rising and setting sun while standing waist-deep in water?",
      options: ["Diwali", "Chhath Puja", "Songkran", "Lantern Festival"],
      correct: 1,
      xp: 150,
      explanation: "Chhath Puja is an ancient Vedic festival worshiping Surya and Chhathi Maiya without idol worship."
    }
  ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFilterPills();
  setupMapInteraction();
  setupArtifactUpload();
  setupStorytellerChat();
  setupAccessibilityControls();
  setupAuthModals();
  setupQuizModal();
  initVoiceAssistantFloatingBtn();
});

// View Navigation
function showView(viewId) {
  appState.currentView = viewId;
  
  // Hide all sections
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });
  
  // Show target section
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.add('active');
  }
  
  // Update header nav link active states
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update storyteller sidebar active state if visible
  document.querySelectorAll('.storyteller-nav-btn').forEach(btn => {
    if (btn.getAttribute('data-view') === viewId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupNavigation() {
  document.querySelectorAll('[data-view]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = elem.getAttribute('data-view');
      if (targetView) {
        showView(targetView);
      }
    });
  });
}

// Explore Culture Filtering
function setupFilterPills() {
  const pills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('explore-search');
  const cards = document.querySelectorAll('.culture-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter') || 'all';
      filterCultureCards(filter, searchInput ? searchInput.value.toLowerCase() : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('.filter-pill.active');
      const filter = activePill ? activePill.getAttribute('data-filter') || 'all' : 'all';
      filterCultureCards(filter, e.target.value.toLowerCase());
    });
  }
}

function filterCultureCards(category, searchQuery) {
  const cards = document.querySelectorAll('.culture-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    const cardText = card.textContent.toLowerCase();
    
    const matchesCategory = category === 'all' || cardCat === category;
    const matchesSearch = !searchQuery || cardText.includes(searchQuery);
    
    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Heritage Map
function setupMapInteraction() {
  const pins = document.querySelectorAll('.map-site-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const siteId = pin.getAttribute('data-site');
      if (siteId && culturalDatabase.sites[siteId]) {
        loadSiteDetails(siteId);
      }
    });
  });

  const listItems = document.querySelectorAll('.site-list-item');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      const siteId = item.getAttribute('data-site');
      if (siteId && culturalDatabase.sites[siteId]) {
        loadSiteDetails(siteId);
      }
    });
  });

  const eraFilters = document.querySelectorAll('.era-filter-btn');
  eraFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      eraFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const era = btn.getAttribute('data-era');
      filterMapPins(era);
    });
  });
}

function loadSiteDetails(siteId) {
  const site = culturalDatabase.sites[siteId];
  if (!site) return;

  appState.selectedMapSite = siteId;

  // Highlight pin
  document.querySelectorAll('.map-site-pin').forEach(p => {
    if (p.getAttribute('data-site') === siteId) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  // Update details panel
  const detailPanel = document.getElementById('map-detail-container');
  if (detailPanel) {
    detailPanel.innerHTML = `
      <img src="${site.image}" alt="${site.name}" class="map-detail-photo" />
      <div class="map-detail-body">
        <div class="flex items-center justify-between">
          <span class="pill-badge festivals">${site.tag}</span>
          <span class="meta-location"><span class="material-symbols-outlined text-sm">location_on</span> ${site.location}</span>
        </div>
        <h2 class="text-2xl font-bold text-primary">${site.name}</h2>
        
        <div class="card-actions-row">
          <button class="btn btn-primary btn-sm" onclick="speakText('${site.speechText}')">
            <span class="material-symbols-outlined">volume_up</span> Listen
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openStorytellerWithPrompt('Tell me about ${site.name} in ${site.location}')">
            <span class="material-symbols-outlined">visibility</span> Describe
          </button>
        </div>

        <div>
          <h4 class="font-semibold text-primary mb-1">History & Significance</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">${site.history}</p>
        </div>

        <div class="p-3 bg-surface-container rounded-lg border border-outline/10">
          <h4 class="font-semibold text-secondary flex items-center gap-1 text-sm mb-1">
            <span class="material-symbols-outlined text-sm">auto_awesome</span> Cultural Impact
          </h4>
          <p class="text-xs text-on-surface-variant leading-relaxed">${site.impact}</p>
        </div>

        <div>
          <h4 class="font-semibold text-primary mb-1">AI Guide Insights</h4>
          <p class="text-xs text-on-surface-variant leading-relaxed">${site.insights}</p>
        </div>

        <button class="btn btn-terracotta w-full" onclick="openStorytellerWithPrompt('Give me a detailed deep dive into ${site.name} and why it is historically remarkable')">
          <span class="material-symbols-outlined">chat</span> Ask AI About This Place
        </button>
      </div>
    `;
  }
}

function filterMapPins(era) {
  document.querySelectorAll('.map-site-pin').forEach(pin => {
    const pinEra = pin.getAttribute('data-era');
    if (era === 'all' || pinEra === era) {
      pin.style.display = 'flex';
    } else {
      pin.style.display = 'none';
    }
  });
}

// AI Museum Artifact Analysis
function setupArtifactUpload() {
  const dropzone = document.getElementById('museum-dropzone');
  const fileInput = document.getElementById('artifact-file-input');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          analyzeCustomArtifact(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
      }
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--color-secondary)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'rgba(116, 119, 125, 0.35)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(116, 119, 125, 0.35)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          analyzeCustomArtifact(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function selectSampleArtifact(artifactKey) {
  const artifact = culturalDatabase.artifacts[artifactKey];
  if (!artifact) return;

  const resultContainer = document.getElementById('museum-result-box');
  if (!resultContainer) return;

  // Add scanning animation
  resultContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center p-12 text-center">
      <div class="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
      <h3 class="font-bold text-lg text-primary">Analyzing Artifact Imagery...</h3>
      <p class="text-sm text-on-surface-variant mt-1">Cross-referencing global museum archives & archaeological databases...</p>
    </div>
  `;

  setTimeout(() => {
    displayArtifactAnalysis(artifact);
    awardXP(50, "Discovered new artifact");
  }, 600);
}

function analyzeCustomArtifact(imgSrc, fileName) {
  const resultContainer = document.getElementById('museum-result-box');
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center p-12 text-center">
      <div class="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
      <h3 class="font-bold text-lg text-primary">Scanning ${fileName}...</h3>
      <p class="text-sm text-on-surface-variant mt-1">Extracting historical motifs, patina textures, and period origins...</p>
    </div>
  `;

  setTimeout(() => {
    const customArtifact = {
      name: "User Uploaded Cultural Artifact",
      period: "Archaeological Specimen",
      origin: "Identified Region of Origin",
      category: "Historical Relic",
      image: imgSrc,
      description: "Visual analysis identifies hand-etched craftsmanship with decorative patterns characteristic of traditional ceremonial tools.",
      culturalSignificance: "Such relics served central roles in regional community gatherings and spiritual heritage rites across generations.",
      audioStory: "This artifact holds the memory of ancient hands, preserved across generations to connect us with the roots of our shared human story."
    };
    displayArtifactAnalysis(customArtifact);
    awardXP(50, "Uploaded & analyzed artifact");
  }, 900);
}

function displayArtifactAnalysis(artifact) {
  const resultContainer = document.getElementById('museum-result-box');
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-start">
        <img src="${artifact.image}" alt="${artifact.name}" class="w-32 h-32 object-cover rounded-lg border border-outline/20 flex-shrink-0" />
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="pill-badge traditions">${artifact.period}</span>
            <span class="pill-badge ancient">${artifact.category}</span>
          </div>
          <h2 class="text-xl font-bold text-primary">${artifact.name}</h2>
          <p class="text-sm text-on-surface-variant mt-0.5"><span class="material-symbols-outlined text-sm align-middle">place</span> ${artifact.origin}</p>
        </div>
      </div>

      <div class="p-4 bg-surface-container rounded-lg">
        <h4 class="font-semibold text-primary text-sm mb-1">Archaeological Analysis</h4>
        <p class="text-sm text-on-surface leading-relaxed">${artifact.description}</p>
      </div>

      <div class="p-4 bg-[#fff8f2] border border-[#fddbc2] rounded-lg">
        <h4 class="font-semibold text-secondary text-sm flex items-center gap-1 mb-1">
          <span class="material-symbols-outlined text-sm">menu_book</span> Cultural Significance
        </h4>
        <p class="text-sm text-on-surface-variant leading-relaxed">${artifact.culturalSignificance}</p>
      </div>

      <div class="story-audio-controls">
        <div class="audio-btn-group">
          <button class="audio-action-btn" onclick="speakText('${artifact.audioStory.replace(/'/g, "\\'")}')">
            <span class="material-symbols-outlined text-secondary">volume_up</span>
            <span>Listen</span>
          </button>
          <button class="audio-action-btn" onclick="pauseAudio()">
            <span class="material-symbols-outlined">pause</span>
            <span>Pause</span>
          </button>
          <button class="audio-action-btn" onclick="speakText('${artifact.audioStory.replace(/'/g, "\\'")}', 0.75)">
            <span class="material-symbols-outlined">speed</span>
            <span>Slower</span>
          </button>
        </div>
        <button class="btn btn-terracotta btn-sm" onclick="openStorytellerWithPrompt('Tell me the deep folklore story behind the ${artifact.name}')">
          <span class="material-symbols-outlined">forum</span> Ask AI Guide
        </button>
      </div>
    </div>
  `;
}

// AI Cultural Storyteller (Chat)
function setupStorytellerChat() {
  const sendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('storyteller-input');
  const micBtn = document.getElementById('chat-mic-btn');

  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => handleSendMessage());
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    });
  }

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      startVoiceRecognition();
    });
  }
}

function handleSendMessage() {
  const chatInput = document.getElementById('storyteller-input');
  if (!chatInput) return;
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  addUserMessage(text);
  generateAIStoryResponse(text);
}

function addUserMessage(text) {
  const chatHistory = document.getElementById('chat-messages-flow');
  if (!chatHistory) return;

  const bubble = document.createElement('div');
  bubble.className = 'user-bubble';
  bubble.innerHTML = `
    <span>${text}</span>
    <span class="material-symbols-outlined text-sm">person</span>
  `;
  chatHistory.appendChild(bubble);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function generateAIStoryResponse(prompt) {
  const chatHistory = document.getElementById('chat-messages-flow');
  if (!chatHistory) return;

  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'chat-bubble-agent';
  loadingBubble.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-4 h-4 rounded-full bg-secondary animate-ping"></div>
      <p class="text-sm font-medium text-on-surface-variant">HeritAble is weaving the cultural narrative...</p>
    </div>
  `;
  chatHistory.appendChild(loadingBubble);
  chatHistory.scrollTop = chatHistory.scrollHeight;

  setTimeout(() => {
    loadingBubble.remove();
    
    let storyTitle = "Cultural Insights & Story";
    let storyContent = "Traditions are living links between generations, preserving sacred rituals, music, culinary memories, and the spirit of community.";
    let photoUrl = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80";
    let locationTag = "Heritage Exploration";

    const promptLower = prompt.toLowerCase();
    if (promptLower.includes('chhath') || promptLower.includes('sun')) {
      storyTitle = "Chhath Puja: Worshipping the Sun";
      storyContent = "Chhath Puja is an ancient Vedic festival deeply rooted in expressing gratitude to Surya, the Sun God, and Chhathi Maiya, for sustaining life on earth. Devotees offer prayers directly to the setting and rising sun, standing waist-deep in clean rivers.";
      photoUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
      locationTag = "Bihar, India & Nepal";
    } else if (promptLower.includes('tea') || promptLower.includes('japan')) {
      storyTitle = "The Way of Tea (Chanoyu)";
      storyContent = "A choreographic ritual of preparing and serving powdered Japanese green tea (matcha). Every precise turn of the bowl reflects mindfulness, harmony (Wa), respect (Kei), purity (Sei), and tranquility (Jaku).";
      photoUrl = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80";
      locationTag = "Kyoto, Japan";
    } else if (promptLower.includes('holi') || promptLower.includes('colors')) {
      storyTitle = "Holi: The Festival of Colors";
      storyContent = "A jubilant festival heralding the arrival of spring and celebrating the victory of good over evil. Communities gather with colored organic powders (gulal), music, and feasts to dissolve social barriers.";
      photoUrl = "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80";
      locationTag = "India & Global Diaspora";
    }

    const storyCard = document.createElement('div');
    storyCard.className = 'story-rich-card';
    storyCard.innerHTML = `
      <div class="story-card-header">
        <span class="material-symbols-outlined text-secondary">wb_sunny</span>
        <span>${storyTitle}</span>
      </div>
      <p class="text-sm text-on-surface leading-relaxed">${storyContent}</p>
      <img src="${photoUrl}" alt="${storyTitle}" class="story-photo-banner" />
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">place</span> ${locationTag}</span>
        <button class="text-secondary font-medium hover:underline" onclick="toggleSimplifyText(this)">
          <span class="material-symbols-outlined text-xs align-middle">psychology</span> Simplify Language
        </button>
      </div>

      <div class="story-audio-controls">
        <div class="audio-btn-group">
          <button class="audio-action-btn" onclick="speakText('${storyContent.replace(/'/g, "\\'")}')">
            <span class="material-symbols-outlined text-secondary">volume_up</span>
            <span>Listen</span>
          </button>
          <button class="audio-action-btn" onclick="pauseAudio()">
            <span class="material-symbols-outlined">pause</span>
            <span>Pause</span>
          </button>
          <button class="audio-action-btn" onclick="speakText('${storyContent.replace(/'/g, "\\'")}')">
            <span class="material-symbols-outlined">replay</span>
            <span>Repeat</span>
          </button>
          <button class="audio-action-btn" onclick="speakText('${storyContent.replace(/'/g, "\\'")}', 0.8)">
            <span class="material-symbols-outlined">speed</span>
            <span>Slower</span>
          </button>
        </div>
      </div>
    `;

    chatHistory.appendChild(storyCard);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    if (appState.voiceFirst) {
      speakText(storyContent);
    }
  }, 700);
}

function openStorytellerWithPrompt(promptText) {
  showView('storyteller');
  addUserMessage(promptText);
  generateAIStoryResponse(promptText);
}

function toggleSimplifyText(btnElem) {
  const card = btnElem.closest('.story-rich-card');
  if (!card) return;
  const p = card.querySelector('p');
  if (!p) return;

  if (btnElem.classList.contains('active-simplified')) {
    btnElem.classList.remove('active-simplified');
    btnElem.innerHTML = `<span class="material-symbols-outlined text-xs align-middle">psychology</span> Simplify Language`;
    p.textContent = p.getAttribute('data-original') || p.textContent;
  } else {
    p.setAttribute('data-original', p.textContent);
    btnElem.classList.add('active-simplified');
    btnElem.innerHTML = `<span class="material-symbols-outlined text-xs align-middle">undo</span> Show Original`;
    p.textContent = "In simple words: This is a celebrated tradition where people come together in joyful devotion to thank nature and the sun for food, life, and health.";
  }
}

// Web Speech & Audio Narration
function speakText(text, rateMultiplier = 1.0) {
  if (!('speechSynthesis' in window)) {
    alert("Text-to-speech is not supported by your current browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = appState.voiceSpeed * rateMultiplier;
  utterance.pitch = 1.0;
  
  // Choose warm natural voice if available
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  utterance.onstart = () => {
    appState.isPlayingAudio = true;
  };
  utterance.onend = () => {
    appState.isPlayingAudio = false;
  };

  window.speechSynthesis.speak(utterance);
}

function pauseAudio() {
  if (window.speechSynthesis) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }
}

function startVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser. Please type your question.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  const micBtn = document.getElementById('chat-mic-btn');
  if (micBtn) micBtn.style.backgroundColor = '#ba1a1a';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('storyteller-input');
    if (input) {
      input.value = transcript;
      handleSendMessage();
    }
    if (micBtn) micBtn.style.backgroundColor = 'var(--color-secondary)';
  };

  recognition.onerror = () => {
    if (micBtn) micBtn.style.backgroundColor = 'var(--color-secondary)';
  };

  recognition.onend = () => {
    if (micBtn) micBtn.style.backgroundColor = 'var(--color-secondary)';
  };

  recognition.start();
}

function initVoiceAssistantFloatingBtn() {
  const floatBtn = document.getElementById('floating-talk-btn');
  if (floatBtn) {
    floatBtn.addEventListener('click', () => {
      showView('storyteller');
    });
  }
}

// Accessibility Controls
function setupAccessibilityControls() {
  const accessModal = document.getElementById('accessibility-modal');
  const openBtns = document.querySelectorAll('.open-accessibility-btn');
  const closeBtn = document.getElementById('close-accessibility-modal');
  const saveBtn = document.getElementById('save-accessibility-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (accessModal) accessModal.classList.add('open');
    });
  });

  if (closeBtn && accessModal) {
    closeBtn.addEventListener('click', () => accessModal.classList.remove('open'));
  }

  if (saveBtn && accessModal) {
    saveBtn.addEventListener('click', () => {
      accessModal.classList.remove('open');
    });
  }

  // Preference option cards inside modal
  const prefCards = document.querySelectorAll('.pref-option-card');
  prefCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
      const pref = card.getAttribute('data-pref');
      applyAccessibilityPref(pref, card.classList.contains('active'));
    });
  });

  // Text size slider
  const textSizeSlider = document.getElementById('setting-text-size');
  if (textSizeSlider) {
    textSizeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val === 1) {
        document.documentElement.removeAttribute('data-text-size');
      } else if (val === 2) {
        document.documentElement.setAttribute('data-text-size', 'large');
      } else if (val === 3) {
        document.documentElement.setAttribute('data-text-size', 'xlarge');
      }
    });
  }

  // Voice speed slider
  const voiceSpeedSlider = document.getElementById('setting-voice-speed');
  if (voiceSpeedSlider) {
    voiceSpeedSlider.addEventListener('input', (e) => {
      appState.voiceSpeed = parseFloat(e.target.value);
    });
  }

  // High contrast toggle
  const contrastToggle = document.getElementById('setting-high-contrast');
  if (contrastToggle) {
    contrastToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-contrast', 'high');
      } else {
        document.documentElement.removeAttribute('data-contrast');
      }
    });
  }
}

function applyAccessibilityPref(pref, isActive) {
  if (pref === 'large-text') {
    if (isActive) document.documentElement.setAttribute('data-text-size', 'large');
    else document.documentElement.removeAttribute('data-text-size');
  } else if (pref === 'high-contrast') {
    if (isActive) document.documentElement.setAttribute('data-contrast', 'high');
    else document.documentElement.removeAttribute('data-contrast');
  } else if (pref === 'voice-first') {
    appState.voiceFirst = isActive;
  }
}

// Authentication Modals & Logic
let isVoiceAuthActive = false;

function setupAuthModals() {
  const authModal = document.getElementById('auth-modal');
  const openAuthBtns = document.querySelectorAll('.open-auth-modal-btn');
  const closeAuthBtn = document.getElementById('close-auth-modal');

  openAuthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (authModal) {
        if (appState.currentUser && appState.currentUser.isLoggedIn) {
          showUserAccountMenu(btn);
        } else {
          toggleAuthMode('login');
          authModal.classList.add('open');
        }
      }
    });
  });

  if (closeAuthBtn && authModal) {
    closeAuthBtn.addEventListener('click', () => {
      authModal.classList.remove('open');
    });
  }

  // Close modal when clicking outside modal-card
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.classList.remove('open');
      }
    });
  }
}

function toggleAuthMode(mode) {
  const loginForm = document.getElementById('auth-login-form');
  const signupForm = document.getElementById('auth-signup-form');
  const forgotForm = document.getElementById('auth-forgot-form');
  const tabLogin = document.getElementById('tab-auth-login');
  const tabSignup = document.getElementById('tab-auth-signup');
  const visualCol = document.getElementById('auth-visual-col');
  const visualHeading = document.getElementById('auth-visual-heading');
  const visualSub = document.getElementById('auth-visual-sub');

  if (!loginForm || !signupForm || !forgotForm) return;

  if (mode === 'signup') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    forgotForm.style.display = 'none';

    if (tabLogin) tabLogin.classList.remove('active');
    if (tabSignup) tabSignup.classList.add('active');

    if (visualCol) {
      visualCol.style.backgroundImage = "url('https://images.unsplash.com/photo-1507842229450-79989d952a61?auto=format&fit=crop&w=1000&q=80')";
    }
    if (visualHeading) visualHeading.textContent = "Preserving the past, designing the future.";
    if (visualSub) visualSub.textContent = "Join thousands of researchers, historians, and culture enthusiasts unlocking narratives hidden within global artifacts.";
  } else if (mode === 'forgot') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    forgotForm.style.display = 'block';

    if (tabLogin) tabLogin.classList.remove('active');
    if (tabSignup) tabSignup.classList.remove('active');

    if (visualHeading) visualHeading.textContent = "Account Recovery";
    if (visualSub) visualSub.textContent = "We will verify your credentials and restore your personalized cultural collections.";
  } else {
    // default to 'login'
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    forgotForm.style.display = 'none';

    if (tabLogin) tabLogin.classList.add('active');
    if (tabSignup) tabSignup.classList.remove('active');

    if (visualCol) {
      visualCol.style.backgroundImage = "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80')";
    }
    if (visualHeading) visualHeading.textContent = "Welcome Back to HeritAble";
    if (visualSub) visualSub.textContent = "Pick up your cultural exploration, voice guides, and interactive heritage discoveries.";
  }
}

// Initialize Firebase Auth listener if available
function initFirebaseAuthState() {
  if (window.firebaseAuth && typeof window.firebaseAuth.onAuthChange === 'function') {
    window.firebaseAuth.onAuthChange((user) => {
      if (user) {
        setUserLoggedIn({
          uid: user.uid,
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          photoURL: user.photoURL || "",
          language: "English",
          isLoggedIn: true
        });
      }
    });
  }
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('btn-submit-login');

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showAuthToast("Please enter both email and password.", "error");
    return;
  }

  if (submitBtn) {
    submitBtn.innerHTML = `<span class="material-symbols-outlined text-sm">hourglass_top</span> Logging in...`;
    submitBtn.disabled = true;
  }

  try {
    let result = null;
    if (window.firebaseAuth && typeof window.firebaseAuth.loginWithEmail === 'function') {
      result = await window.firebaseAuth.loginWithEmail(email, password);
    }

    const rawName = (result && result.user && result.user.displayName) 
      ? result.user.displayName 
      : email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    setUserLoggedIn({
      uid: result?.user?.uid || "user_" + Date.now(),
      name: formattedName,
      email: email,
      photoURL: result?.user?.photoURL || "",
      language: 'English',
      isLoggedIn: true
    });

    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.classList.remove('open');

    if (result && result.isDemo) {
      showAuthToast(`Logged in as ${formattedName}! (Paste Firebase config in firebase-config.js for live sync)`, "info");
    } else {
      showAuthToast(`Welcome back, ${formattedName}! Signed in successfully.`, "success");
    }
  } catch (err) {
    console.error("Login failed:", err);
    showAuthToast(err.message || "Failed to sign in. Please verify your credentials.", "error");
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Login</span><span class="material-symbols-outlined text-sm">arrow_forward</span>`;
      submitBtn.disabled = false;
    }
  }
}

async function handleSignupSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('signup-name');
  const emailInput = document.getElementById('signup-email');
  const pwdInput = document.getElementById('signup-password');
  const cpwdInput = document.getElementById('signup-confirm-password');
  const langSelect = document.getElementById('signup-language');
  const submitBtn = document.getElementById('btn-submit-signup');

  if (!nameInput || !emailInput || !pwdInput || !cpwdInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const pwd = pwdInput.value;
  const cpwd = cpwdInput.value;
  const lang = langSelect ? langSelect.options[langSelect.selectedIndex].text : 'English';

  if (pwd !== cpwd) {
    showAuthToast("Passwords do not match. Please re-enter.", "error");
    cpwdInput.focus();
    return;
  }

  if (pwd.length < 6) {
    showAuthToast("Password must be at least 6 characters.", "error");
    pwdInput.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.innerHTML = `<span class="material-symbols-outlined text-sm">hourglass_top</span> Creating Account...`;
    submitBtn.disabled = true;
  }

  try {
    let result = null;
    if (window.firebaseAuth && typeof window.firebaseAuth.signupWithEmail === 'function') {
      result = await window.firebaseAuth.signupWithEmail(email, pwd, name, lang);
    }

    setUserLoggedIn({
      uid: result?.user?.uid || "user_" + Date.now(),
      name: name,
      email: email,
      photoURL: result?.user?.photoURL || "",
      language: lang,
      isLoggedIn: true
    });

    awardXP(100, "Created an account bonus");

    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.classList.remove('open');

    if (result && result.isDemo) {
      showAuthToast(`Welcome to HeritAble, ${name}! (Configure firebase-config.js for live cloud backend)`, "info");
    } else {
      showAuthToast(`Welcome to HeritAble, ${name}! Your account is ready.`, "success");
    }
  } catch (err) {
    console.error("Signup failed:", err);
    showAuthToast(err.message || "Failed to create account. Please try again.", "error");
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Create Account</span><span class="material-symbols-outlined text-sm">arrow_forward</span>`;
      submitBtn.disabled = false;
    }
  }
}

async function handleForgotPasswordSubmit(event) {
  event.preventDefault();
  const forgotEmail = document.getElementById('forgot-email');
  if (!forgotEmail || !forgotEmail.value) return;

  const email = forgotEmail.value.trim();
  try {
    if (window.firebaseAuth && typeof window.firebaseAuth.resetPassword === 'function') {
      await window.firebaseAuth.resetPassword(email);
    }
    showAuthToast(`Password reset link sent to ${email}. Check your inbox!`, "success");
    toggleAuthMode('login');
  } catch (err) {
    console.error("Reset password failed:", err);
    showAuthToast(err.message || "Could not send reset email. Verify the address.", "error");
  }
}

async function handleGoogleAuth() {
  showAuthToast("Connecting to Google Authentication...", "info");

  try {
    let result = null;
    if (window.firebaseAuth && typeof window.firebaseAuth.loginWithGoogle === 'function') {
      result = await window.firebaseAuth.loginWithGoogle();
    }

    const user = result?.user || {
      displayName: "Google Cultural Explorer",
      email: "explorer.google@heritable.org",
      photoURL: ""
    };

    setUserLoggedIn({
      uid: user.uid || "google_user_" + Date.now(),
      name: user.displayName || "Explorer",
      email: user.email,
      photoURL: user.photoURL || "",
      language: "English",
      isLoggedIn: true
    });

    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.classList.remove('open');

    if (result && result.isDemo) {
      showAuthToast("Signed in with Google! (Paste your credentials into firebase-config.js for live Google Auth)", "info");
    } else {
      showAuthToast(`Signed in with Google as ${user.displayName || user.email}!`, "success");
    }
  } catch (err) {
    console.error("Google Auth error:", err);
    showAuthToast(err.message || "Google sign-in was cancelled or failed.", "error");
  }
}

function startVoiceLogin() {
  const voiceBtn = document.getElementById('btn-voice-login');
  const voiceLabel = document.getElementById('voice-login-label');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (voiceBtn) voiceBtn.classList.add('listening');
    if (voiceLabel) voiceLabel.textContent = "Listening... (Simulating Voice)";
    speakText("Voice authentication activated. Authenticating your voice.");

    setTimeout(() => {
      if (voiceBtn) voiceBtn.classList.remove('listening');
      if (voiceLabel) voiceLabel.textContent = "Use Voice to Login";

      setUserLoggedIn({
        uid: "voice_user_" + Date.now(),
        name: "Voice Explorer",
        email: "voice.user@heritable.org",
        language: "English",
        isLoggedIn: true
      });

      const authModal = document.getElementById('auth-modal');
      if (authModal) authModal.classList.remove('open');

      showAuthToast("Voice verified! Welcome back, Explorer.", "success");
    }, 2400);
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  if (voiceBtn) voiceBtn.classList.add('listening');
  if (voiceLabel) voiceLabel.textContent = "Listening... (Say 'Hello HeritAble')";
  speakText("Say 'Hello HeritAble' to sign in.");

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    if (voiceBtn) voiceBtn.classList.remove('listening');
    if (voiceLabel) voiceLabel.textContent = "Use Voice to Login";

    const name = transcript ? transcript.split(' ')[0] : 'Explorer';
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    setUserLoggedIn({
      uid: "voice_" + Date.now(),
      name: formattedName,
      email: `${name.toLowerCase()}@heritable.org`,
      language: "English",
      isLoggedIn: true
    });

    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.classList.remove('open');

    showAuthToast(`Voice recognized: "${transcript}". Welcome back, ${formattedName}!`, "success");
  };

  recognition.onerror = () => {
    if (voiceBtn) voiceBtn.classList.remove('listening');
    if (voiceLabel) voiceLabel.textContent = "Use Voice to Login";
    showAuthToast("Voice login timed out. Please try again or type credentials.", "error");
  };

  recognition.onend = () => {
    if (voiceBtn) voiceBtn.classList.remove('listening');
    if (voiceLabel) voiceLabel.textContent = "Use Voice to Login";
  };

  recognition.start();
}

function setUserLoggedIn(user) {
  appState.currentUser = user;

  const headerUserBtn = document.getElementById('btn-header-user');
  if (headerUserBtn) {
    if (user.photoURL) {
      headerUserBtn.innerHTML = `<img src="${user.photoURL}" alt="${user.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />`;
    } else {
      const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      headerUserBtn.innerHTML = `<span style="font-weight: 700; font-size: 13px; color: var(--color-primary);">${initials}</span>`;
    }
    headerUserBtn.title = `${user.name} (${user.email}) - Click to manage account`;
    headerUserBtn.style.borderColor = 'var(--color-secondary)';
    headerUserBtn.style.backgroundColor = '#fff3e6';
  }
}

async function showUserAccountMenu(btn) {
  const confirmLogout = confirm(`Signed in as ${appState.currentUser.name} (${appState.currentUser.email}).\n\nWould you like to log out?`);
  if (confirmLogout) {
    if (window.firebaseAuth && typeof window.firebaseAuth.logoutUser === 'function') {
      await window.firebaseAuth.logoutUser();
    }
    appState.currentUser = null;
    const headerUserBtn = document.getElementById('btn-header-user');
    if (headerUserBtn) {
      headerUserBtn.innerHTML = `<span class="material-symbols-outlined text-sm">person</span>`;
      headerUserBtn.title = "User profile and login";
      headerUserBtn.style.borderColor = 'var(--color-primary)';
      headerUserBtn.style.backgroundColor = 'var(--color-surface-container)';
    }
    showAuthToast("You have been signed out.", "success");
  }
}

function showAuthToast(message, type = 'info') {
  const container = document.getElementById('auth-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `auth-toast ${type}`;

  const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-base">${iconName}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';

    icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    icon.textContent = 'visibility';
  }
}

// Quiz & Challenges Gameplay
let currentQuizIndex = 0;
function setupQuizModal() {
  const quizModal = document.getElementById('quiz-modal');
  const closeQuizBtn = document.getElementById('close-quiz-modal');

  if (closeQuizBtn && quizModal) {
    closeQuizBtn.addEventListener('click', () => quizModal.classList.remove('open'));
  }
}

function startQuizChallenge(quizType) {
  const quizModal = document.getElementById('quiz-modal');
  if (!quizModal) return;

  currentQuizIndex = 0;
  renderQuizQuestion();
  quizModal.classList.add('open');
}

function renderQuizQuestion() {
  const quiz = culturalDatabase.quizzes[currentQuizIndex];
  const container = document.getElementById('quiz-content-area');
  if (!container || !quiz) return;

  container.innerHTML = `
    <div class="mb-4">
      <span class="pill-badge festivals">Question ${currentQuizIndex + 1} of ${culturalDatabase.quizzes.length}</span>
      <span class="text-xs font-semibold text-secondary ml-2">+${quiz.xp} XP</span>
    </div>
    <h3 class="text-xl font-bold text-primary mb-6">${quiz.question}</h3>
    <div class="space-y-3">
      ${quiz.options.map((opt, idx) => `
        <button class="w-full text-left p-4 rounded-lg border-2 border-outline/20 hover:border-primary bg-surface transition-all flex items-center justify-between" onclick="checkQuizAnswer(${idx})">
          <span class="font-medium text-on-surface">${opt}</span>
          <span class="material-symbols-outlined text-outline-variant">radio_button_unchecked</span>
        </button>
      `).join('')}
    </div>
  `;
}

function checkQuizAnswer(selectedIdx) {
  const quiz = culturalDatabase.quizzes[currentQuizIndex];
  const container = document.getElementById('quiz-content-area');
  if (!container || !quiz) return;

  const isCorrect = selectedIdx === quiz.correct;
  if (isCorrect) {
    awardXP(quiz.xp, "Correct quiz answer");
  }

  container.innerHTML = `
    <div class="text-center py-6">
      <span class="material-symbols-outlined text-6xl ${isCorrect ? 'text-[#2e5200]' : 'text-error'} mb-2">
        ${isCorrect ? 'check_circle' : 'cancel'}
      </span>
      <h3 class="text-2xl font-bold text-primary mb-2">${isCorrect ? 'Marvelous!' : 'Good Effort!'}</h3>
      <p class="text-sm text-on-surface-variant max-w-md mx-auto mb-6">${quiz.explanation}</p>
      
      ${currentQuizIndex < culturalDatabase.quizzes.length - 1 ? `
        <button class="btn btn-primary" onclick="nextQuizQuestion()">Next Question <span class="material-symbols-outlined">arrow_forward</span></button>
      ` : `
        <button class="btn btn-terracotta" onclick="finishQuizChallenge()">Complete Challenge <span class="material-symbols-outlined">emoji_events</span></button>
      `}
    </div>
  `;
}

function nextQuizQuestion() {
  currentQuizIndex++;
  renderQuizQuestion();
}

function finishQuizChallenge() {
  const quizModal = document.getElementById('quiz-modal');
  if (quizModal) quizModal.classList.remove('open');
  showView('learn');
}

function awardXP(amount, reason) {
  appState.userXP += amount;
  const xpElem = document.getElementById('user-xp-display');
  if (xpElem) {
    xpElem.textContent = `${appState.userXP.toLocaleString()} XP`;
  }
}
