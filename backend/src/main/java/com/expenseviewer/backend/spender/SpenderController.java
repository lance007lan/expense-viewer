package com.expenseviewer.backend.spender;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/spenders")
@RequiredArgsConstructor
public class SpenderController {

    private final SpenderRepository spenderRepository;

    @GetMapping
    public List<SpenderResponse> list() {
        return spenderRepository.findAll().stream()
                .map(SpenderResponse::from)
                .toList();
    }
}
