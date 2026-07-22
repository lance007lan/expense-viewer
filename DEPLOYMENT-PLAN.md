# Deployment Plan: Kubernetes on Oracle Cloud Always Free

Goal: run this app on Kubernetes at the lowest possible cost, while keeping AWS Cognito for auth.

## Architecture summary

| Component | Where | Cost |
|---|---|---|
| k3s (control plane + worker) | 1x Oracle Cloud Always Free Ampere A1 instance (2 OCPU / 12GB) | $0 |
| Frontend (this Vite build) | Pod behind k3s's built-in Traefik ingress | $0 |
| Backend (Spring Boot) | Pod on the same node | $0 |
| PostgreSQL | Pod + persistent volume (self-managed, not RDS) | $0 |
| Container images | GitHub Container Registry (ghcr.io) or Docker Hub free tier | $0 |
| HTTPS | cert-manager + Let's Encrypt | $0 |
| Auth | AWS Cognito (already provisioned in `terraform/cognito.tf`) — kept as-is, free under 10,000 MAUs | $0 |

**Total: ~$0/month**, vs. the existing AWS EKS Terraform's realistic ~$115–145/month (EKS control plane + ALB + node + RDS).

## Known tradeoffs (accepted for demo/personal scale)

- No managed backups/multi-AZ for Postgres — need a manual backup strategy if data durability matters.
- Single point of failure — one VM, no redundancy; brief downtime on reboot/updates is possible.
- You own OS/k3s patching — no managed control plane.
- Oracle's Always Free ARM instance availability can be capacity-constrained in some regions; new accounts sometimes need manual verification.

---

## Steps

### 1. Oracle Cloud account + instance
- [ ] Sign up for an Oracle Cloud account (if not already have one)
- [ ] Provision an Always Free Ampere A1 compute instance (2 OCPU / 12GB RAM), Ubuntu image
- [ ] Open firewall/security list for ports 80, 443, and 6443 (k3s API) to your IP (or 0.0.0.0/0 for 80/443 once ready to go live)
- [ ] Confirm SSH access to the instance

### 2. Install k3s
- [ ] SSH into the instance
- [ ] Install k3s: `curl -sfL https://get.k3s.io | sh -`
- [ ] Verify: `sudo k3s kubectl get nodes`
- [ ] Copy `/etc/rancher/k3s/k3s.yaml` down to your local machine, merge into `~/.kube/config` (update the server IP in the file to the instance's public IP)
- [ ] Confirm local `kubectl get nodes` works against the cluster

### 3. Container registry
- [ ] Create a GitHub Container Registry (ghcr.io) namespace, or a Docker Hub account
- [ ] Create a personal access token / credentials for pushing images
- [ ] Create a Kubernetes `imagePullSecret` on the cluster referencing those credentials (needed if the repo is private)

### 4. Build & push images
- [ ] Build the frontend production image (this repo's `frontend/`, `npm run build` + a small nginx/static-serving Dockerfile)
- [ ] Build the backend image (existing Spring Boot backend)
- [ ] Push both to the registry chosen in step 3

### 5. Deploy PostgreSQL
- [ ] Write a `Deployment` (or `StatefulSet`) + `PersistentVolumeClaim` + `Service` for Postgres
- [ ] Store DB credentials in a Kubernetes `Secret`
- [ ] Verify the pod starts and accepts connections from inside the cluster

### 6. Deploy backend
- [ ] Write a `Deployment` + `Service` for the Spring Boot backend
- [ ] Wire up env vars: DB connection string (pointing at the Postgres Service), Cognito user pool ID / client ID (reuse values from `terraform/cognito.tf` outputs)
- [ ] Verify backend pod logs show a successful DB connection

### 7. Deploy frontend
- [ ] Write a `Deployment` + `Service` for the frontend
- [ ] Set `VITE_API_URL` (baked in at build time) to the backend's eventual public URL
- [ ] Verify the frontend pod serves the built `dist/` correctly

### 8. Ingress routing
- [ ] Write an `Ingress` resource routing `/api/*` (or similar) to the backend Service, everything else to the frontend Service
- [ ] k3s ships Traefik by default — confirm it's running (`kubectl get pods -n kube-system`)
- [ ] Verify routing works via the instance's public IP before adding TLS

### 9. HTTPS via cert-manager
- [ ] Install cert-manager (`kubectl apply -f` its release manifest, or Helm)
- [ ] Create a `ClusterIssuer` for Let's Encrypt
- [ ] Add a TLS block to the Ingress, referencing a domain name (see step 10)
- [ ] Verify a valid cert is issued and HTTPS works

### 10. DNS
- [ ] Point a domain or subdomain's A record at the instance's public IP
- [ ] Re-verify HTTPS/cert-manager issuance succeeds against the real domain name (Let's Encrypt needs a resolvable domain, not just an IP)

### 11. End-to-end verification
- [ ] Load the app via the real domain, confirm frontend renders
- [ ] Confirm login via Cognito works end-to-end
- [ ] Confirm data persists across a pod restart (`kubectl delete pod <postgres-pod>` and confirm data survives, proving the PVC is working)

### 12. Optional hardening (do later, not required for $0 baseline)
- [ ] Set up a periodic `pg_dump` backup cron (e.g., to a free-tier object storage bucket)
- [ ] Add basic monitoring (k3s has no built-in dashboard; consider a lightweight option if needed)
- [ ] Document the manual recovery process if the VM is ever lost, since there's no managed redundancy

---

## Cleanup notes (if abandoning this plan)
- Existing AWS Terraform (`terraform/`) is untouched by any of this — nothing there needs to change unless you also want to decommission EKS/RDS/ALB to stop that cost, which would be a separate `terraform destroy` (or selective resource removal) decision.
