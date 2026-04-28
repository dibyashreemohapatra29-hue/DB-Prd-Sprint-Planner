# Changelog

## Stage 4: Database integration
**Checkpoint:** _(auto-generated at next save)_
- Provisioned PostgreSQL database; created `workflows` table via Drizzle ORM
- `POST /api/generate` now persists every generated plan (inputs + full output + timestamp)
- `GET /api/history` returns all past records (newest first, limit 50)
- `GET /api/history/:id` retrieves a single record by ID
- History panel: "🕑 View History" button in sidebar opens a modal listing past plans with feature title, timestamp, priority/risk badges
- Reuse button pre-fills the form and restores the full output for any past record


## Stage 3: End-to-end integration
**Checkpoint:** `d5c593b34db407994f4279e74114fbfff6f31a05`
- Added "View Full Report" modal with all output sections (PRD, Tasks, Sprint Plan, Insights)
- Fixed output area scrolling — each section now properly visible and scrollable
- Structured PRD now rendered with 5 labeled rows in both inline and modal views

## Stage 2: Backend processing + logic layer
**Checkpoint:** `31ce4cadce7303568bd04a3ba9caa2a9220a9129`
- Added Node.js/Express backend with `POST /api/generate` endpoint
- Logic layer: effort scoring (description length), risk detection (keyword matching), priority derivation
- Structured PRD generation: Problem Statement, Goals, Target Users, Use Cases, Success Metrics
- Frontend wired to API with loading state, error handling, and live output rendering

## Stage 1: User UI setup
**Checkpoint:** `302089a3c74d83497d88ed1541db6a84994de5bf`
- Sidebar layout: fixed left panel for input, scrollable right panel for output
- Input form: Feature Title, Target Users, Business Goal, Description
- Output sections: PRD (placeholder rows), Tasks table, Sprint board (Team A/B/C)
