package com.expenseviewer.backend.spender;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpenderRepository extends JpaRepository<Spender, Long> {

    Optional<Spender> findByName(String name);
}
