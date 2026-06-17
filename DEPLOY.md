# Deploying the VxCloud Landing Page to AWS S3

This repo contains:
- `index.html` and `styles.css` — the static site
- `infra/main.tf` — Terraform to provision an S3 bucket configured for static website hosting

Prerequisites:
- AWS account with permissions for S3
- AWS CLI configured (`aws configure`) or environment variables set
- Terraform v1.5+ installed

## 1) Provision infrastructure

Pick a globally-unique bucket name (e.g., `vxcloud-landing-yourname`), then:
