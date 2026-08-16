package com.expenseviewer.backend.expense;

import com.expenseviewer.backend.spender.Spender;
import com.expenseviewer.backend.spender.SpenderRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseRepository expenseRepository;
    private final SpenderRepository spenderRepository;

    @GetMapping
    public List<ExpenseResponse> list(@Valid ExpenseSearchRequest request) {
        return expenseRepository
                .search(request.start(), request.end(), blankToNull(request.spender()), blankToNull(request.category()))
                .stream()
                .map(ExpenseResponse::from)
                .toList();
    }

    @PostMapping
    public ExpenseResponse create(@Valid @RequestBody ExpenseRequest request) {
        Spender spender = spenderRepository.findByName(request.spender())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Unknown spender: " + request.spender()));

        Expense expense = new Expense();
        expense.setSpender(spender);
        expense.setDescription(request.description());
        expense.setAmount(request.amount());
        expense.setCategory(request.category());
        expense.setDate(request.date());
        expense.setReceiptName(request.receiptName());
        expense.setReceiptUrl(request.receiptUrl());

        return ExpenseResponse.from(expenseRepository.save(expense));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value;
    }
}
