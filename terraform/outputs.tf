output "frontend_url" {
  description = "S3 static website URL"
  value       = "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}"
}

output "alb_dns_name" {
  description = "ALB DNS — use this as the backend base URL"
  value       = aws_lb.main.dns_name
}

output "rds_endpoint" {
  description = "RDS connection endpoint"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.frontend.id
}

output "ecr_backend_url" {
  description = "ECR repo URL to push the backend image to"
  value       = aws_ecr_repository.backend.repository_url
}

output "eks_cluster_name" {
  value = aws_eks_cluster.main.name
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.main.endpoint
}
