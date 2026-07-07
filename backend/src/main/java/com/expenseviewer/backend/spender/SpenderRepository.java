package com.expenseviewer.backend.spender;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpenderRepository extends JpaRepository<Spender, Long> {
}
