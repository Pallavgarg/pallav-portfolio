# Changelog

All notable changes to this project will be documented in this file.

## 2026-05-01

### Added
- Initial Next.js + TypeScript + Tailwind project scaffold
- Portfolio sections: Navbar, Hero, About, Skills, Experience, Projects, Certifications, Contact, Footer
- Data-driven content files under `data/`
- Local SVG skill icons under `public/icons/skills`
- Project high-level flow representation in project cards
- Custom favicon (`public/favicon.svg`)
- Light/Dark theme support with persisted preference
- Theme toggle switch in header
- Font size controls (`A-` / `A+`) in header
- Contact flow with OTP verification step
- OTP countdown display and resend throttling

### Changed
- Theme migrated to gingerbread-brown palette
- Font system unified to Ubuntu across sections
- Skills UI upgraded to show icon per skill item
- README converted to PRD-style tracker with implementation checklist
- `.gitignore` hardened for sensitive and temporary files

### Security
- Blocked known disposable email domains in contact flow
- Added resend frequency limits for OTP to reduce abuse

### Notes
- Current OTP implementation is frontend-managed and should be moved to backend for production-grade security.
