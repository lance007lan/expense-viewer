package com.expenseviewer.backend.expense;

import jakarta.validation.constraints.NotBlank;

public record UpdateSpenderRequest(@NotBlank String spender) {
}
