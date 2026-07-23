package com.expenseviewer.backend.spender;

public record SpenderResponse(Long id, String name) {

    public static SpenderResponse from(Spender spender) {
        return new SpenderResponse(spender.getId(), spender.getName());
    }
}
