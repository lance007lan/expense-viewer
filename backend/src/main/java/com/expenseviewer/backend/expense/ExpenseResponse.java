package com.expenseviewer.backend.expense;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseResponse(
        Long id,
        LocalDate date,
        String description,
        String spender,
        String category,
        BigDecimal amount,
        String receiptName,
        String receiptUrl) {

    public static ExpenseResponse from(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getDate(),
                expense.getDescription(),
                expense.getSpender().getName(),
                expense.getCategory(),
                expense.getAmount(),
                expense.getReceiptName(),
                expense.getReceiptUrl());
    }
}
