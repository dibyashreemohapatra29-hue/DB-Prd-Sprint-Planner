# Changelog

## Stage 6: Admin dashboard
**Checkpoint:** `b5464dd144415b47b0332729ea638a36212d3bc9`

### Navigation
- Replaced single-page layout with tabbed navigation: **Output** and **History** tabs in the topbar
- History section moved to its own dedicated page — Output view is now clean and uncluttered
- "View History" sidebar button navigates directly to the History tab

### Workflow History dashboard
- Expandable workflow cards showing inputs, logic layer stats (tasks, insights, priority, risk, effort), full PRD, and insights
- **Reuse** button pre-fills the form and switches back to the Output tab instantly
- Auto-refresh: history re-fetches from `/api/history` after every successful plan generation

### Search & filter
- Search bar filters cards in real-time by title or description
- Priority filter pills: All / High / Medium / Low
- Risk filter pills: All / High / Medium / Low
- Filters compose together; subtitle shows match count; "Clear filters" button resets all

### Delete
- `DELETE /api/workflow/:id` endpoint — removes record from Supabase by id
- Each card has a `✕` delete button with an inline **"Delete? Yes / No"** confirmation
- Confirmed delete removes the card from the UI immediately with no page reload
- `GET /api/history` updated to include `id` field in the response

## Stage 4: Database integration
**Checkpoint:** `a61c328d5eb39b1817f0f31bcbd6abf3209f1ef5`

### PostgreSQL (local)
- Created `workflows` table via Drizzle ORM
- `POST /api/generate` saves every plan to local DB on success

### Supabase
- Installed `@supabase/supabase-js`; client initialized with service role key (bypasses RLS)
- `POST /api/generate` also saves to Supabase `workflows` table: `title`, `description`, `users`, `goal`, `output` (JSON), `created_at`
- `GET /api/history` fetches all records from Supabase, ordered by `created_at` DESC

### Frontend
- Inline **History section** added below Sprint Plan — fetches from `/api/history` on load
- Each card shows feature title + formatted date with a **Reuse** button
- Reuse fills all form fields and restores the full output instantly


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
