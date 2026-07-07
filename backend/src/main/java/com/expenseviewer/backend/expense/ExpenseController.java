package com.expenseviewer.backend.expense;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    @GetMapping
    public List<Expense> list() {
        return expenseRepository.findAll();
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }
}
