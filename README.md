<!-- Title & Badges -->
<p align="center">
  <h1 align="center">VxCloud Landing Page</h1>
  <p align="center">A fast, modern, static landing page with CI and one-command cloud deploys.</p>
  <p align="center">
    <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg"></a>
    <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
    <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white">
    <img alt="Terraform" src="https://img.shields.io/badge/Terraform-844FBA?logo=terraform&logoColor=white">
    <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-ready-222?logo=githubpages&logoColor=white">
  </p>
</p>

---

## ✨ Overview

This repository contains the VxCloud static landing page and a streamlined deployment path:
- Local development is as simple as opening `index.html` or running a tiny HTTP server.
- Production hosting via two turn-key options:
  - GitHub Pages (zero infrastructure to manage)
  - AWS S3 Static Website Hosting using Terraform (`infra/main.tf`)

Automated checks run in CI to help keep the page fast and correct.

## 🚀 Features

- Blazing-fast static site (HTML + CSS) — zero backend
- Mobile-first responsive layout
- Simple local preview via any static HTTP server
- GitHub Actions CI in place for easy automation
- Two deployment paths:
  - GitHub Pages (no infra)
  - AWS S3 static hosting via Terraform (infra as code)

## 🧰 Tech Stack

| Layer         | Technology                 | Notes                                |
|---------------|----------------------------|--------------------------------------|
| Markup        | HTML5                      | Semantic, accessible base            |
| Styles        | CSS3                       | Custom stylesheet (`styles.css`)     |
| CI/CD         | GitHub Actions             | `.github/workflows/ci.yml`           |
| IaC / Cloud   | Terraform + AWS S3         | `infra/main.tf` for static hosting   |
| Hosting       | GitHub Pages or AWS S3     | Choose based on your needs           |

## 🗂 Project Structure
