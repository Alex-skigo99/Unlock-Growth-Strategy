# Personality Collection — Portfolio Description

## Project Overview

**Personality Collection** is a full-stack web platform that assesses YouTube creators' personality types through a structured survey and delivers AI-generated, personalised growth recommendations. The platform is designed as a B2B tool for agencies or networks that manage YouTuber talent.

---

## Business Logic

1. **Invitation Flow** — A YouTuber receives a branded email containing a unique survey link with their email and YouTube channel URL encoded as query parameters.
2. **Survey Instance Creation** — When the logo in the email is loaded (image tracking pixel), the system initialises a new survey record on the backend.
3. **Personality Assessment** — The survey consists of questions based on the Big 5 Personality Model. Each answer is saved individually to the server as the user progresses, enabling resume-from-where-you-left-off functionality.
4. **Engagement Mechanics** — Motivational "meme breaks" appear every 5 questions with progress-based encouragement messages and images to reduce drop-off.
5. **Channel Verification** — After completing the survey, the YouTuber must confirm ownership of their YouTube channel via a modal with URL validation.
6. **AI-Powered Results** — The backend feeds the collected answers into an LLM (OpenAI) that generates a multi-section personality report: creator type, superpower, weakness, growth tip, personality summary, and growth strategy.
7. **Viral Sharing** — Users can share the survey with other creators via email directly from the result page.

---

## Architecture & Patterns

### Frontend (this repo)

| Concern | Tool / Pattern |
|---------|----------------|
| **UI Framework** | React 18 with functional components and hooks |
| **Routing** | React Router v6 — 4 routes (Home, Survey, Result, Sample Result) |
| **Server State** | TanStack React Query — caching, background refetch, query keys |
| **Client State** | Redux Toolkit — single slice for global loading spinner |
| **HTTP Layer** | Axios with global interceptors (auth headers, loader toggle, error modals) |
| **Styling** | Tailwind CSS + Ant Design — utility-first layout with AntD modals, inputs, checkboxes |
| **Responsive Design** | Custom Tailwind breakpoints: `mobile`, `tablet`, `desktop` |
| **Theme Support** | Dark/light mode via Tailwind `dark:` variant + `localStorage` persistence |
| **State Persistence** | `localStorage` for surveyId and theme — allows survey resume across sessions |

### Backend (separate repo)

| Concern | Tool / Pattern |
|---------|----------------|
| **Runtime** | Node.js + Express |
| **Database** | MongoDB + Mongoose |
| **AI Integration** | OpenAI API for personality analysis |
| **Email** | Invitation email with tracking pixel |

### Key Design Decisions

- **Individual Answer Saving** — Each survey response is PATCHed to the server independently rather than batched. This ensures no data is lost if the user closes the browser, and allows resume support.
- **React Query over Redux for Server State** — Survey data, questionnaire, and results are managed by React Query (cache + refetch), while Redux is intentionally minimal (loader only).
- **Interceptor Pattern** — A single `InterceptorsComponent` wraps the app tree, setting up Axios interceptors once and rendering a global `<Spin>` overlay for all in-flight requests.
- **Sample Result Route** — A `/resultSample` route shows a static demo of the results page, useful for marketing and onboarding without requiring a completed survey.

---

## Tech Stack Summary

**Frontend:** React 18 · React Router 6 · Redux Toolkit · TanStack React Query · Axios · Tailwind CSS · Ant Design  
**Backend:** Node.js · Express · MongoDB · Mongoose · OpenAI API  
**Infrastructure:** Create React App · REST API · LocalStorage-based session continuity
