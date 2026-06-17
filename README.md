<!-- Centered Title, Tagline, and Badges -->
<p align="center">
  <h1 align="center">VxCloud Static Landing Page</h1>
  <p align="center">Lightning‑fast, modern, and production‑ready static site with CI and one‑command cloud deploys.</p>
  <p align="center">
    <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg"></a>
    <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
    <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white">
    <img alt="Terraform" src="https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white">
    <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-ready-222?logo=github&logoColor=white">
  </p>
</p>

---

## ✨ Overview

This repository hosts the VxCloud static landing page and a streamlined deployment path for both hobby and production scenarios.

- Zero back‑end: pure HTML/CSS with instant load times.
- Local development is trivial—open `index.html` or run a tiny HTTP server.
- CI is preconfigured with GitHub Actions to keep the main branch healthy.
- Two production hosting options out of the box:
  - GitHub Pages (fully managed, no infra to maintain)
  - AWS S3 Static Website Hosting via Terraform (`infra/main.tf`)

Whether you’re iterating quickly or shipping to production, this gets you from zero to deployed in minutes.

## 🚀 Features

- Ultra‑fast static site (HTML + CSS) with no runtime dependencies
- Mobile‑first, responsive layout
- One‑file simplicity: edit `index.html` (and `styles.css` if present) to customize content and styles
- GitHub Actions CI prewired via `.github/workflows/ci.yml`
- Two deployment paths:
  - GitHub Pages (no infrastructure)
  - AWS S3 + Terraform (infrastructure as code)
- Cloud‑friendly project structure with clear separation of app and infra

## 🧰 Tech Stack

| Layer         | Technology             | Purpose / Notes                                       |
|---------------|------------------------|--------------------------------------------------------|
| Markup        | HTML5                  | Semantic and accessible structure (`index.html`)       |
| Styles        | CSS3                   | Custom stylesheet (`styles.css`)                       |
| CI/CD         | GitHub Actions         | Automation and checks (`.github/workflows/ci.yml`)     |
| IaC / Cloud   | Terraform + AWS S3     | Static website hosting (`infra/main.tf`)               |
| Hosting       | GitHub Pages / AWS S3  | Simplicity vs. control—choose what fits your needs     |

## 🧑‍💻 Getting Started

No heavy toolchain required. Open the site directly or serve it locally.

```bash
# 1) Clone the repository
git clone https://github.com/joelwembo/frontend-staticwebsite.git
cd frontend-staticwebsite

# 2a) Quickest option: open index.html in your browser
#    (Double-click or right-click → "Open With" your browser)

# 2b) Or run a simple HTTP server (Python 3)
python3 -m http.server 8080
# now visit http://localhost:8080

# 2c) Node alternative (if you prefer)
# npx serve . -l 8080
```

Tip: Customize content in `index.html` and styles in `styles.css` (if present). For advanced dev, a Vite-based setup exists (see `package.json` scripts), but it’s optional for the static page.

## 🗂 Project Structure

```text
frontend-staticwebsite/
├─ index.html                      # Landing page markup (entry point)
├─ styles.css                      # Global styles for the static page (optional)
├─ .github/
│  └─ workflows/
│     └─ ci.yml                   # GitHub Actions CI pipeline
├─ infra/
│  └─ main.tf                     # Terraform for AWS S3 static website hosting
├─ public/
│  └─ __va_visual_edit_bridge.js  # Auxiliary script (optional)
├─ nginx/
│  └─ docker-entrypoint.sh        # Nginx entrypoint (ops/dev convenience)
├─ docker-compose.yml             # Local dev/ops convenience
├─ docker-compose.deploy.yml      # Example compose for deployment
├─ package.json                   # Optional Vite-based tooling (not required)
├─ src/                           # App components (for advanced usage)
├─ templates/                     # Reusable template components (optional)
├─ DEPLOY.md                      # Additional deployment notes
└─ README.md                      # This document
```

Notes:
- The static site runs from `index.html`. The infra code in `infra/main.tf` provisions S3 website hosting.
- CI is defined in `.github/workflows/ci.yml` and can be extended for linting, tests, or deploys.

## 📦 Deployment

Choose GitHub Pages for simplicity or AWS S3 (Terraform) for cloud‑native hosting and granular control.

### Option A — GitHub Pages (Zero Infra)

Prerequisites:
- A GitHub repository with this code (done)
- Pages enabled for the repository

Steps:
1) Push changes to your default branch (e.g., `main`).
2) In GitHub, go to Settings → Pages.
3) Build and deployment: choose “Deploy from a branch”.
4) Branch: select `main`, folder: `/root` (or `/docs` if you move the site there).
5) Save. GitHub will publish a Pages URL like:
   https://<your-username>.github.io/<repo-name>/

Optional: Deploy via a GitHub Actions workflow that uploads the static site to `gh-pages`:
```bash
# Install gh-pages CLI (optional approach)
npm i -g gh-pages

# Publish the root as a static site to gh-pages branch (one-off)
gh-pages -d . -b gh-pages
```

### Option B — AWS S3 + Terraform (Infrastructure as Code)

Prerequisites:
- Terraform installed (>= 1.3)
- AWS CLI installed and configured (`aws configure`)
- An S3 bucket and website config managed by `infra/main.tf`

1) Review and adjust Terraform variables/resources in `infra/main.tf` (bucket name, region, ACL, website index/error docs, etc.).

2) Initialize and apply the infrastructure:
```bash
cd infra

# Initialize Terraform providers and modules
terraform init

# See what will be created/changed
terraform plan

# Apply the changes (you may pass variables as needed)
terraform apply
# Confirm with 'yes' when prompted
```

3) Sync your static assets to the provisioned S3 bucket:
```bash
# From repo root (exclude infra and VCS metadata)
aws s3 sync . s3://<your-bucket-name> \
  --exclude "infra/*" \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude "node_modules/*" \
  --delete
```

4) Access your site:
- If the bucket is configured for “Static website hosting”, visit the website endpoint shown in the S3 console or Terraform outputs (e.g., `http://<bucket-name>.s3-website-<region>.amazonaws.com`).
- Optionally front this with CloudFront for HTTPS and caching.

Pro tip: Store your bucket name and region as Terraform outputs, and add an S3 sync step to your CI on tagged releases.

## 🤝 Contributing

Contributions are welcome! To propose changes:
- Fork the repo and create a feature branch
- Make focused, well‑documented commits
- Open a pull request with a clear description and, if relevant, screenshots
- Ensure CI passes (see `.github/workflows/ci.yml`)

For larger features, please open an issue first to discuss scope and approach.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

## 👤 Author

**Joel Wembo**
- GitHub: https://github.com/joelwembo
- LinkedIn: https://www.linkedin.com/in/ (add your profile)
- Website: https://vxcloud.com (optional)

---

Made with care for speed, simplicity, and reliability. If this saved you time, consider starring the repo!