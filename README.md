<!-- Title & Badges -->
<p align="center">
  <h1 align="center">VxCloud Static Landing Page</h1>
  <p align="center">Lightning‑fast, modern, and production‑ready static site with CI and one‑command cloud deploys.</p>
  <p align="center">
    <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg"></a>
    <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
    <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white">
    <img alt="Terraform" src="https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white">
    <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-ready-222?logo=githubpages&logoColor=white">
  </p>
</p>

---

## ✨ Overview

This repository contains the VxCloud static landing page and a streamlined deployment path suitable for both hobby and production use.

- Local development is as simple as opening `index.html` or running a tiny HTTP server.
- Built‑in CI via GitHub Actions keeps your main branch reliable.
- Production hosting via two turnkey options:
  - GitHub Pages (fully managed, no infra to maintain)
  - AWS S3 Static Website Hosting using Terraform (`infra/main.tf`)

If you just need a fast, reliable, and secure landing page, this project gets you from zero to deployed in minutes.

## 🚀 Features

- Ultra‑fast static site (HTML + CSS) — zero backend required
- Mobile‑first, responsive layout
- Easy local preview via any static HTTP server
- GitHub Actions CI in place for automation and checks
- Two deployment paths:
  - GitHub Pages (no infrastructure)
  - AWS S3 static hosting via Terraform (infrastructure as code)
- Cloud‑friendly structure with clear separation of app and infra

## 🧰 Tech Stack

| Layer         | Technology             | Notes                                           |
|---------------|------------------------|-------------------------------------------------|
| Markup        | HTML5                  | Semantic, accessible structure (`index.html`)   |
| Styles        | CSS3                   | Custom stylesheet (`styles.css`)                |
| CI/CD         | GitHub Actions         | `.github/workflows/ci.yml`                      |
| IaC / Cloud   | Terraform + AWS S3     | `infra/main.tf` for static website hosting      |
| Hosting       | GitHub Pages / AWS S3  | Choose based on simplicity vs. control          |

## 🧑‍💻 Getting Started

No heavy toolchain required. You can open the site directly or serve it locally.

```bash
# 1) Clone the repository
git clone https://github.com/joelwembo/frontend-staticwebsite.git
cd frontend-staticwebsite

# 2a) Quickest option: open index.html in your browser
#    (Double-click or right-click → "Open With" your browser)

# 2b) Or run a simple HTTP server (Python example)
python3 -m http.server 8080
# now visit http://localhost:8080 in your browser

# 2c) Node alternative (if you prefer)
# npx serve . -l 8080
```

## 🗂 Project Structure

```text
frontend-staticwebsite/
├─ index.html                 # Landing page markup
├─ styles.css                 # Global styles for the static page
├─ .github/
│  └─ workflows/
│     └─ ci.yml              # GitHub Actions CI pipeline
├─ infra/
│  └─ main.tf                # Terraform for AWS S3 static website hosting
├─ public/
│  └─ __va_visual_edit_bridge.js
├─ nginx/
│  └─ docker-entrypoint.sh
├─ docker-compose.yml
├─ docker-compose.deploy.yml
├─ package.json
├─ DEPLOY.md
└─ README.md
```

Notes:
- For AWS deployment, see `infra/main.tf`.
- For GitHub Pages, use the repo Settings → Pages or a Pages workflow.

## 📦 Deployment

You can deploy via GitHub Pages for simplicity or AWS S3 (Terraform) for cloud‑native hosting and control.

### Option A — GitHub Pages (Zero Infra)

Prerequisites:
- A GitHub repository with this code (already done if you cloned from GitHub)

Steps (Deploy from Branch):
1. Commit all changes to `main` (or your default branch).
2. Go to your repository → Settings → Pages.
3. Set Source to “Deploy from a branch”, select `main` and the root directory `/`.
4. Save. GitHub Pages will publish your site at:
   `https://<your-github-username>.github.io/<repository-name>/`

Steps (Deploy via GitHub Actions):
- This repo includes a CI workflow at `.github/workflows/ci.yml`. You can also switch Pages to “GitHub Actions” and use or adapt a Pages workflow to upload the site artifact and deploy.
- For custom domains: add your domain in Settings → Pages and commit a `CNAME` file at the repository root containing your domain name.

### Option B — AWS S3 + Terraform (infra/main.tf)

Prerequisites:
- AWS account + credentials configured locally (`aws configure` or environment variables)
- Terraform installed (≥ 1.3)
- AWS CLI installed

Terraform: provision S3 bucket (and optional website configuration) using `infra/main.tf`.

```bash
# From the repository root
cd infra

# Initialize Terraform providers and modules
terraform init

# Review the execution plan (optional but recommended)
terraform plan

# Apply the changes to create the S3 bucket and related resources
terraform apply
# Confirm when prompted. Capture the bucket name (e.g., as an output or variable).
```

Deploy your static assets to the S3 bucket. From the repository root:

```bash
# Replace with your actual bucket name (ensure it matches infra/main.tf)
export S3_BUCKET_NAME="your-website-bucket-name"

# Sync all site files while excluding infra and CI directories
aws s3 sync ./ s3://$S3_BUCKET_NAME \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude "infra/*" \
  --exclude "nginx/*" \
  --exclude "docker-compose*.yml" \
  --delete

# If using S3 static website hosting (not CloudFront),
# ensure the bucket policy and public access settings are handled by Terraform.
```

Tip:
- If you wire CloudFront and Route 53 in Terraform, invalidate the CDN after each deploy:
  `aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"`

## 🤝 Contributing

Contributions are welcome! To propose changes:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes with a clear message: `git commit -m "feat: add amazing thing"`
4. Push your branch: `git push origin feat/your-feature`
5. Open a Pull Request describing what and why

For substantial changes, please discuss them in an issue first to align on approach.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 👤 Author

**Joel Wembo**

- GitHub: https://github.com/joelwembo
- LinkedIn: https://www.linkedin.com/in/joelwembo/ (if available)
- Email: hello@joelwembo.dev (optional)

---

Need help or found a bug? Open an issue and we’ll take a look promptly. Happy shipping! 🚀