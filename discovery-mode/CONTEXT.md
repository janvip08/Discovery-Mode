# Discovery Mode — AI Music Discovery MVP

## What This Is
Discovery Mode is an AI-native music discovery app built as Part 4 of a 
Spotify PM assignment. It is a SEPARATE product from the Review Discovery 
Engine (Part 1). This is the user-facing solution to the problem validated 
through research.

## The Problem It Solves
Long-term Spotify users (2+ years) are trapped in a familiarity loop — 
averaging 80% familiar listening despite wanting to discover new music. 
Spotify's algorithm over-optimizes for engagement with known content, 
making discovery progressively worse over time.

Validated through:
- AI analysis of 606 relevant reviews across 6 sources
- 5 user interviews ("Users who have been on Spotify for 2+ years and have progressively disengaged from discovery — now defaulting to familiar content despite wanting new music")
- Key finding: 5/5 users have migrated discovery to Instagram, YouTube, Reddit

## Why AI Is Uniquely Needed
Traditional recommendation systems:
- Match patterns ("users like you also listened to X")
- Cannot understand natural language intent
- Cannot explain WHY a recommendation breaks your usual pattern
- Optimize for familiarity, not discovery

This MVP uses AI to:
- Understand natural language intent ("I want something like X but more experimental")
- Reason about musical DNA across genres and cultures
- Generate crisp, specific explanations (max 15 words) for each recommendation
- Gradually drift users from familiar to fresh without overwhelming them

## Three Core Features

### 1. Quick Discover (commute/passive mode)
- Problem: Users on commute have no time to configure anything
- Solution: Pick a mood (1 tap) → get 10 songs that gradually drift from 
  familiar to adventurous
- No setup, works in 2 taps, gradual novelty so user barely notices 
  they're discovering

### 2. Deep Discover (active/intent mode)
- Problem: Users know what they want but can't express it to Spotify
- Solution: Natural language input + artist seeds + adventure slider → 
  5 AI-explained recommendations
- Each recommendation has a crisp 1-line reason (max 15 words) — 
  like a friend recommending, not a music critic

### 3. Trending Now (social-to-platform bridge)
- Problem: Users discover on Instagram Reels but have to manually 
  search on Spotify
- Solution: Surface Spotify Viral 50 India playlist with AI context 
  for why each song is trending
- Full songs, not 15-second clips

## Tech Stack
- Backend: FastAPI (Python), port 8000
- Frontend: Next.js 14 + Tailwind CSS, port 3001
- AI: Groq API (llama-3.3-70b-versatile) — primary LLM
- Music data: Spotify Web API (Client Credentials — no user OAuth)
- Deploy: Backend on HuggingFace Spaces, Frontend on Vercel

## Design Principles
- Spotify-style dark theme (black + green)
- Explanations MAX 15 words — crisp, like a friend recommending
- Audio previews inline (30-second Spotify previews)
"Web app (desktop-first, mobile-responsive) — primary review will happen on desktop browser"
- Zero friction for Quick Mode (2 taps max)

## File Structure
discovery-mode/
├── CONTEXT.md          ← this file
├── backend/
│   ├── main.py         ← FastAPI app
│   ├── requirements.txt
│   ├── .env            ← API keys (gitignored)
│   └── .gitignore
└── frontend/
    ├── app/
    │   ├── page.tsx    ← main dashboard
    │   └── globals.css
    ├── tailwind.config.ts
    ├── package.json
    └── .env.local      ← NEXT_PUBLIC_API_URL

## Key Constraints
- Explanations must be MAX 15 words — never longer
- No fabricated music data — all tracks must come from real Spotify API
- Groq/Llama is the only LLM — no Anthropic/OpenAI
- Audio previews use Spotify's preview_url (30 seconds, free)
- If preview_url is null, show graceful fallback (not an error)
- Mobile-responsive — primary use case is commuting
- Deploy-ready from day one — no localhost-only code

## Endpoints to Build
POST /recommend/deep   → Deep Discover feature
POST /recommend/quick  → Quick Discover feature  
GET  /trending         → Trending Now feature
GET  /health           → Health check

## Success Criteria
A reviewer should be able to:
1. Open the app on the webapp
2. Pick a mood and tap Start Discovering
3. Hear a 30-second preview of a song they've never heard
4. Understand in one line why it was recommended
5. Click through to Spotify to listen to the full song
All within 30 seconds of opening the app.
