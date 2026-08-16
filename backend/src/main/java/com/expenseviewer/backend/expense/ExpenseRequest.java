package com.expenseviewer.backend.expense;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
        @NotNull LocalDate date,
        @Size(max = 500) String description,
        @NotBlank String spender,
        @Size(max = 100) String category,
        @NotNull @Positive BigDecimal amount,
        @Size(max = 255) String receiptName,
        @Size(max = 2048) String receiptUrl) {
}
