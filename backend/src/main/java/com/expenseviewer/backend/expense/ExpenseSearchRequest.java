package com.expenseviewer.backend.expense;

import jakarta.validation.constraints.AssertTrue;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record ExpenseSearchRequest(
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
        String spender,
        String category) {

    @AssertTrue(message = "start must not be after end")
    private boolean isValidRange() {
        return start == null || end == null || !start.isAfter(end);
    }
}
