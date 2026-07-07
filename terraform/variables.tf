variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-2"
}

variable "app_name" {
  description = "Application name used to prefix all resources"
  type        = string
  default     = "expense-viewer"
}

variable "db_username" {
  description = "RDS master username"
  type        = string
  default     = "expenseadmin"
}

variable "db_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}
