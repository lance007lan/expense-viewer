package com.expenseviewer.backend.expense;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
        LocalDate date,
        String description,
        String spender,
        String category,
        BigDecimal amount,
        String receiptName,
        String receiptUrl) {
}
