# 🏗️ Pulumi Infrastructure Studio
> **Compile cloud native infrastructure. Generate Pulumi stack configurations, write deployment scripts in TypeScript, Python, or Go, manage state backends, and configure deployment pipelines.**

[![Studio](https://img.shields.io/badge/Developer_Studio-Live-brightgreen)](https://pradeeptalari14.github.io/portfolio/tools/pulumi/)
[![Category](https://img.shields.io/badge/Category-cloud-blue)]()

---

## 🎛️ Studio Options — What the UI Generates

The studio has multiple configurable options. Each combination produces different output files.
This repository contains **one working example per option variant** so you can learn by diffing.

### Output Tabs (files the studio generates)
| Tab | Description |
|-----|-------------|
| `Pulumi.yaml` | Generated in studio Output tab |
| `index.ts / __main__.py / main.go` | Generated in studio Output tab |
| `Pulumi.dev.yaml` | Generated in studio Output tab |
| `README.md` | Generated in studio Output tab |
| `Flow Diagram` | Generated in studio Output tab |

### Configurable Options
| Option | Available Values |
|--------|-----------------|
| **Cloud Provider** | `AWS` / `Azure` / `GCP` |
| **Language** | `TypeScript` / `Python` / `Go` |
| **Resources** | `VPC` / `NAT Gateway` / `Security Groups` / `Virtual Machine` / `SQL Database` / `S3 Bucket` |
| **KMS Encryption Key** | `enabled` / `disabled` |

---

## 🏗️ Architecture Flow Diagram

![SRE Architecture Flow](docs/sre_architecture_flow.png)

```mermaid
graph TD
  PC[📄 Pulumi Files] -->|pulumi init| Init[⚙️ Init Stack]
  Init -->|pulumi preview| Preview[🔍 Plan Dryrun]
  Preview -->|pulumi up| Cloud[☁️ Cloud Provisioning]
  Cloud -->|Heartbeat metrics| Telemetry[📊 Stack Resources]
```

---

## 📁 Repository Structure

```
tp-pulumi/
├── README.md          ← This file — complete learning guide
├── examples/typescript/index.ts
├── examples/python/__main__.py
├── Pulumi.yaml
├── Pulumi.dev.yaml
├── scripts/           ← Deployment + validation helpers
└── docs/USAGE.md      ← Extended usage guide
```

---

## 🚀 Step-by-Step Onboarding & Validation Guide

Follow these SRE steps to deploy, validate, and monitor this repository's workspace configs in a local or production environment:

#### 1. Prerequisites
- [x] **Terraform 1.5+**
- [x] **Kubectl & Helm 3.0+**
- [x] **AWS CLI / Google Cloud SDK configured**

#### 2. Download
Clone this repository locally:
```bash
git clone https://github.com/Pradeeptalari14/tp-pulumi.git
cd tp-pulumi
```

#### 3. Install
Fetch required packages and compile environment binaries:
```bash
terraform init || helm repo add stable https://charts.helm.sh/stable
```

#### 4. Enable Automatic Sidecar Injection
Enforce AWS Secret Manager sidecars or HashiCorp Vault Agent sidecars to inject dynamic credentials into resources.

#### 5. Install Kubernetes Gateway API CRDs
Deploy Kubernetes Gateway API custom resource definitions (CRDs) for cross-service route rules:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway-api-v1.1.0-experimental.yaml
```

#### 6. Deploy Application Workload
Apply Terraform templates or apply Kubernetes deployment manifests:
```bash
terraform plan -out=tfplan
terraform apply tfplan
# Or apply manifests
kubectl apply -f deploy/
```

#### 7. Validate Application Inside Cluster
Inspect resources state and check running pods inside the cluster:
```bash
terraform show && kubectl get all -n production
```

#### 8. Expose Application Using Gateway
Expose target load balancer ingress gateways or forward local ports:
```bash
kubectl port-forward deployment/tp-pulumi 8080:8080
```

#### 9. Access the Application
Access service endpoints (printed in `terraform output`) or cluster local address [http://localhost:8080](http://localhost:8080).

#### 10. Install Addons
Install Karpenter autoscalers, AWS Load Balancer controllers, and ExternalDNS sync modules.

#### 11. Access Dashboard
Access EKS cloud dashboard, resource cost trackers, or local Kubernetes web consoles.

#### 12. View Service Mesh Graph
View resource dependencies diagram using `terraform graph` or inspect services topology structures.

#### 13. Generate Traffic
Inject test traffic loops to evaluate auto-scaling triggers:
```bash
kubectl run load-generator --image=busybox --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://tp-pulumi; done"
```

#### 14. Project Structure
```text
tp-tp-pulumi/
├── .gitignore                # Version control exclusions
├── LICENSE                   # MIT Open Source License
├── SECURITY.md               # Vulnerability reporting protocols
├── CHANGELOG.md              # Releases version history
├── README.md                 # Project learning guide & onboarding
├── .env.example              # Template parameters config
├── .pre-commit-config.yaml   # Gitleaks & lint pipeline hooks
├── docs/
│   ├── USAGE.md              # Extended developer usage docs
│   ├── TROUBLESHOOTING.md    # Failures resolution guide
│   ├── GLOSSARY.md           # SRE domain terminology index
│   ├── COMPLIANCE.md         # Legal and security checks checklist
│   └── sre_architecture_flow.png # Category SRE architecture diagram
├── scripts/
│   └── validate.sh           # Local validation helper script
└── .github/
    ├── CONTRIBUTING.md       # Contributing instructions
    ├── PULL_REQUEST_TEMPLATE.md # Pull request code compliance check
    ├── ISSUE_TEMPLATE/       # Bug and features tickets
    ├── dependabot.yml        # Auto updates dependencies
    └── workflows/
        └── security-scan.yml # Gitleaks/yamllint/shellcheck scans

# Primary Config File: Pulumi.yaml
```

#### 15. Observability Components
Tracks cloud resource consumption metrics: node auto-scaling stats, CPU/Memory limit pools, and network requests.

#### 16. Install Monitoring
Triggers cloud alerts on cost budget breaches, node terminations, or replication failures.

---

## 📖 How Each Option Changes the Output

### Cloud Provider
- **`AWS`** — see `examples/` folder for generated output
- **`Azure`** — see `examples/` folder for generated output
- **`GCP`** — see `examples/` folder for generated output

### Language
- **`TypeScript`** — see `examples/` folder for generated output
- **`Python`** — see `examples/` folder for generated output
- **`Go`** — see `examples/` folder for generated output

### Resources
- **`VPC`** — see `examples/` folder for generated output
- **`NAT Gateway`** — see `examples/` folder for generated output
- **`Security Groups`** — see `examples/` folder for generated output
- **`Virtual Machine`** — see `examples/` folder for generated output
- **`SQL Database`** — see `examples/` folder for generated output
- **`S3 Bucket`** — see `examples/` folder for generated output

### KMS Encryption Key
- **`enabled`** — see `examples/` folder for generated output
- **`disabled`** — see `examples/` folder for generated output

---

## 💡 SRE Compliance & Best Practices

| SRE Compliance Pillar | ❌ Anti-Pattern | ✅ Production Best Practice |
|---|---|---|
| **Secrets Protection** | Committing passwords or dynamic tokens to repositories | Exclude sensitive files in `.gitignore` and reference Vault parameters |
| **Deployment Auditing** | Manual ad-hoc server updates | Enforce infrastructure validation and continuous deployment pipelines |

## 🔐 Security Standards

- ❌ Never commit credentials, API keys, or database passwords directly to Git repositories.
- ✅ Reference dynamic parameters using cloud Secret Managers (Vault, AWS SSM Parameter Store, Key Vault).
- ✅ Enforce branch protection rules: require peer pull request reviews and green status checks.

---

## 📖 Resources

| Resource | Link |
|----------|------|
| Interactive Studio | [Open →](https://pradeeptalari14.github.io/portfolio/tools/pulumi/) |
| All 91 Studios | [Dashboard →](https://pradeeptalari14.github.io/portfolio/tools/) |
| SRE Provisioning Guide | [Handbook →](https://github.com/Pradeeptalari14/portfolio/blob/main/GITHUB_PROVISIONING_GUIDE.md) |

---
*Generated by [Pulumi Infrastructure Studio Studio](https://pradeeptalari14.github.io/portfolio/tools/pulumi/) — [Talari Pradeep Portfolio](https://pradeeptalari14.github.io/portfolio)*