# Backend Optimization — AI Agent Brief

> Hand this document to an AI coding assistant (Copilot, Cursor, etc.) when working on the **personality-collection-api** backend.

---

## Project Context

This is the **Node.js / Express** backend for a YouTube creator personality survey platform.  
The frontend sends survey answers one-by-one, and after the survey is completed the backend calls an AI model (OpenAI / LLM) to generate a personalised growth recommendation.

### Core Domain Flow

```
Invitation Email (with logo + link)
  └─► Logo upload path triggers survey instance creation
        └─► Link contains: youtuber email + YouTube channel URL
              └─► Frontend opens → POST /api/survey  (creates survey doc)
                    └─► Each answer → PATCH /api/survey/:id  (appended)
                          └─► Survey complete → PATCH  (isSurveyCompleted: true)
                                └─► Channel confirm → PATCH (isChannelLinkConfirmed: true)
                                      └─► GET /api/survey/result/:id
                                            └─► AI recommendation generated & returned
```

### API Endpoints (consumed by frontend)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/get-questionnaire` | Return ordered list of survey questions |
| POST | `/api/survey` | Create new survey instance `{ email, link }` |
| PATCH | `/api/survey/:id` | Save individual answer / mark completed / confirm channel |
| GET | `/api/survey/result/:id` | Fetch AI-generated personality report |
| POST | `/api/survey/share-email/:id` | Share survey link with another creator |

---

## Optimization Checklist

### 1. Database & Data Model
- [ ] Add compound index on `(email, createdAt)` for survey lookup
- [ ] Consider separating answers into a sub-collection if document size grows beyond 16 MB BSON limit
- [ ] Add TTL index to auto-expire incomplete surveys after N days
- [ ] Validate incoming answer schema at the API level (Joi / Zod)

### 2. AI Result Generation
- [ ] Move LLM call to a background job queue (Bull / BullMQ) — the current synchronous approach blocks the request
- [ ] Cache generated results so re-fetching `/result/:id` doesn't re-invoke the model
- [ ] Add retry + exponential backoff for LLM API failures
- [ ] Stream the AI response to the frontend via SSE or WebSocket for better perceived performance
- [ ] Implement token budget tracking / cost monitoring per survey

### 3. API Security
- [ ] Rate-limit the `POST /api/survey` endpoint to prevent abuse (express-rate-limit)
- [ ] Validate `email` and `link` parameters server-side — reject non-YouTube URLs
- [ ] Sign or encrypt the survey link params (email, link) to prevent forgery
- [ ] Add CORS allowlist instead of wildcard `*`
- [ ] Sanitize all user input before storing in DB (XSS prevention)

### 4. Email / Invitation System
- [ ] Move email sending to a queue to decouple from request lifecycle
- [ ] Add HTML email template with inline CSS for cross-client compatibility
- [ ] Track email open / click events for analytics
- [ ] Add unsubscribe link to comply with CAN-SPAM / GDPR

### 5. Architecture & Code Quality
- [ ] Extract route handlers into controller + service layers (separation of concerns)
- [ ] Centralise error handling middleware instead of try/catch in every handler
- [ ] Add request validation middleware (celebrate / express-validator)
- [ ] Add structured logging (pino / winston) with correlation IDs
- [ ] Write integration tests for the full survey flow (supertest + in-memory MongoDB)
- [ ] Add health-check endpoint (`GET /health`) for monitoring
- [ ] Dockerise the backend with a multi-stage build for production

### 6. Performance
- [ ] Enable gzip / brotli compression (compression middleware)
- [ ] Add response caching headers for the questionnaire endpoint (rarely changes)
- [ ] Use connection pooling for MongoDB driver
- [ ] Add Helmet.js for security headers

### 7. Observability
- [ ] Add request duration logging per endpoint
- [ ] Track survey completion funnel (started → completed → confirmed → result viewed)
- [ ] Expose Prometheus metrics or use APM (Datadog, New Relic)

---

## Tech Stack Expectations

| Layer | Recommendation |
|-------|---------------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Job Queue | BullMQ (Redis-backed) |
| AI | OpenAI API (GPT-4 / similar) |
| Validation | Zod |
| Testing | Jest + Supertest |
| Deployment | Docker + any cloud (Railway, Render, AWS) |
