# Product Requirements Document (PRD)
## Pallav Garg - Personal Portfolio Website

**Version:** 2.1  
**Date:** 2026-05-01  
**Author:** Pallav Garg  
**Status:** In Progress  

---

## 1. Executive Summary

This PRD defines a modern, recruiter-focused portfolio website for **Pallav Garg**, a Senior Data Engineer with 6+ years of experience across Azure, AWS, Microsoft Fabric, Databricks, Snowflake, and large-scale data platform delivery.

The website should:
- Establish a strong personal brand for senior data engineering opportunities
- Showcase enterprise-grade project impact with clear outcomes and technology depth
- Enable qualified recruiter outreach through a structured and verified contact flow
- Support easy long-term updates as new projects and certifications are added

**Design inspiration:** https://github.com/statichunt/hydrogen-nextjs and https://github.com/ar2029/prasoon-portfolio

---

## 2. Goals & Success Metrics

| Goal | Success Metric |
|---|---|
| Build high-credibility portfolio presence | Live site with complete experience + projects |
| Increase relevant recruiter outreach | >= 8 qualified outreach messages/month |
| Highlight measurable project impact | Every project includes metrics and business outcomes |
| Keep portfolio easy to maintain | New project added in <30 minutes via config-only update |
| Improve screening efficiency | Structured intake captures role, skills, location, and budget |

---

## 3. Target Audience

| Persona | Description | Goal on Site |
|---|---|---|
| Technical Recruiter | Hiring teams for data/platform roles | Validate fit and initiate outreach |
| Data Engineering Manager | Evaluates architecture and delivery capability | Assess technical depth and impact |
| Engineering Leadership | Looking for senior IC/lead contributors | Review cross-cloud platform experience |
| Professional Network | Peers and collaborators | Discover work and connect |

---

## 4. Site Architecture & Sections

The website should be a single-page portfolio with section-based navigation.

```
/
|- Navbar
|- Hero
|- About
|- Skills
|- Experience
|- Featured Projects
|- Certifications
|- Contact
`- Footer
```

---

## 5. Detailed Section Requirements

### 5.1 Navbar
- Sticky top navigation with smooth scroll links
- Links: About | Skills | Experience | Projects | Certifications | Contact
- Mobile responsive behavior
- Theme switcher and font size controls

### 5.2 Hero
- Name and headline: `Pallav Garg` / `Senior Data Engineer`
- Rotating profile keywords with fade animation
- Primary CTA: `View Projects`
- Secondary CTA: `Contact`
- Stats strip with key metrics

### 5.3 About
- Resume-aligned professional summary
- Highlights and education

### 5.4 Skills
- Grouped cards by category
- Icon support at category and item level

### 5.5 Experience Timeline
- Reverse chronological timeline: Nagarro, EY, TCS
- Impact-oriented bullet points

### 5.6 Featured Projects
- Data-driven project cards
- Tools, outcomes, and high-level flow steps

### 5.7 Certifications
- Certifications list with card display

### 5.8 Contact
- Multi-step contact flow with OTP gate
- Domain filtering and resend throttling

---

## 6. Design System

### 6.1 Visual Direction
- Gingerbread-brown themed color palette
- Light/Dark mode support
- Ubuntu font consistency across the site

### 6.2 Motion
- Fade-based keyword animation in hero
- Smooth transitions for controls and interactive elements

### 6.3 Responsive
- Mobile-first implementation

---

## 7. Technical Architecture

### 7.1 Stack
- Framework: Next.js + TypeScript
- Styling: Tailwind CSS
- Content model: TS config-driven sections
- Deployment target: Vercel

### 7.2 Content-Driven Structure
- `data/profile.ts`
- `data/skills.ts`
- `data/experience.ts`
- `data/projects.ts`
- `data/certifications.ts`

---

## 8. Data Models (Current)

### 8.1 Project
```ts
interface Project {
  title: string;
  duration: string;
  company: string;
  domain: string;
  summary: string;
  tools: string[];
  outcomes: string[];
  flow: string[];
}
```

### 8.2 Experience
```ts
interface Experience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}
```

---

## 9. SEO & Metadata

- Title: `Pallav Garg | Senior Data Engineer`
- Description: `Senior Data Engineer with 6+ years building Azure, AWS, and Fabric data platforms.`
- Favicon configured (`public/favicon.svg`)

---

## 10. Deployment & Operations

- Local dev: `npm run dev`
- Production target: Vercel

---

## 11. Implemented So Far

- [x] Next.js + TypeScript + Tailwind setup
- [x] All primary portfolio sections
- [x] Data-driven content modules
- [x] Skill icons copied locally and wired
- [x] Project high-level architecture flow blocks
- [x] Ubuntu font applied globally
- [x] Light/Dark theme support with toggle switch
- [x] Font size increase/decrease controls
- [x] Gingerbread-brown color theming
- [x] Custom favicon
- [x] Contact form with OTP flow
- [x] OTP expiry countdown and resend limits
- [x] Disposable-domain filtering

---

## 12. Pending / Next Steps

- [ ] Move OTP flow from frontend-only to secure backend API
- [ ] Add mobile hamburger menu
- [ ] Add stronger anti-spam protections (server-side rate limits)
- [ ] Add automated tests for contact flow and UI smoke checks

---

*PRD v2.1 - Updated with implementation tracking.*
