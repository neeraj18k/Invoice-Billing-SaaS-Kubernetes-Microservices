# Invoice-Billing-SaaS-Kubernetes-Microservices
Cloud-native Invoice &amp; Billing backend built with microservices, Docker, and Kubernetes. Features API Gateway (Ingress), per-service databases, internal service communication, resource management, and Horizontal Pod Autoscaling (HPA) for scalable SaaS deployment
# 🚀 Invoice & Billing SaaS — Cloud Native Microservices Project

A production-style **Invoice & Billing SaaS backend system** built using **Microservices, Docker, and Kubernetes**, following real-world **DevOps and cloud-native practices**.

---

## 🧠 Project Overview

This project demonstrates how a scalable SaaS backend can be built using **microservices architecture** and deployed using **containerization and Kubernetes orchestration**.

It includes:

- Multiple backend microservices
- API Gateway using Kubernetes Ingress
- Independent databases per service
- Docker containerization
- Kubernetes deployment using Minikube
- Resource management (CPU/Memory)
- Metrics monitoring
- Horizontal Pod Autoscaling (HPA)
- Internal service-to-service communication

---

## 🧩 Microservices Included

| Service | Description |
|---------|-------------|
| Client Service | Manages customer data |
| Invoice Service | Creates and retrieves invoices |
| Payment Service | Handles payment transactions |
| Report Service | Generates revenue and analytics reports |

Each service:
- Runs independently
- Has its own MongoDB database
- Communicates via HTTP
- Is containerized and deployed on Kubernetes

---

## 🏗 Architecture Flow

User → Ingress (API Gateway) → Kubernetes Service → Pods → Database

Microservices communicate internally using Kubernetes DNS:

## 🐳 Docker — Containerization

Each service is packaged into a Docker container.

### Build Docker Images

```bash
docker build -t invoice-billing-platform-client-service ./client-service
docker build -t invoice-billing-platform-invoice-service ./invoice-service
docker build -t invoice-billing-platform-payment-service ./payment-service
docker build -t invoice-billing-platform-report-service ./report-service
☸️ Kubernetes — Deployment
1️⃣ Start Minikube
minikube start
2️⃣ Deploy All Services & Databases
kubectl apply -f k8s/
3️⃣ Verify Pods
kubectl get pods
All pods should be in Running state.

🌐 API Gateway (Ingress)
NGINX Ingress is used as a single entry point.

Add Host Mapping (Windows)
Open hosts file and add:

<MINIKUBE-IP> billing.local
Find IP:

minikube ip
Access APIs
http://billing.local/api/clients
http://billing.local/api/invoices
http://billing.local/api/payments
http://billing.local/api/reports
📦 Resource Requests & Limits
Each deployment defines:

CPU Requests

CPU Limits

Memory Requests

Memory Limits

This allows Kubernetes to manage pod performance efficiently.

📊 Metrics Server (Monitoring)
Enable resource monitoring:

minikube addons enable metrics-server
kubectl top pods
📈 Horizontal Pod Autoscaling (HPA)
Pods automatically scale based on CPU load.

Create HPA
kubectl autoscale deployment invoice-service --cpu=10% --min=1 --max=5
kubectl autoscale deployment payment-service --cpu=10% --min=1 --max=5
kubectl autoscale deployment report-service --cpu=10% --min=1 --max=5
Check Autoscaling
kubectl get hpa
🔗 Internal Service Communication Test
Verify microservices can talk to each other inside the cluster.

kubectl exec -it <payment-pod-name> -- sh
wget -qO- http://invoice-service:3001/api/invoices
🧪 Load Testing (Optional)
Trigger autoscaling:

1..200 | ForEach-Object { Start-Job { Invoke-WebRequest http://billing.local/api/invoices -UseBasicParsing } }
🏁 Features Implemented
Microservices Architecture

Docker Containerization

Kubernetes Deployment

API Gateway (Ingress)

Per-Service Databases

Resource Management

Metrics Monitoring

Horizontal Pod Autoscaling

Internal Service Discovery

