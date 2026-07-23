package com.expenseviewer.backend.expense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("""
            SELECT e FROM Expense e
            WHERE (CAST(:start AS java.time.LocalDate) IS NULL OR e.date >= :start)
              AND (CAST(:end AS java.time.LocalDate) IS NULL OR e.date <= :end)
              AND (CAST(:spenderName AS string) IS NULL OR e.spender.name = :spenderName)
              AND (CAST(:category AS string) IS NULL OR e.category = :category)
            ORDER BY e.date DESC
            """)
    List<Expense> search(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            @Param("spenderName") String spenderName,
            @Param("category") String category);
}
