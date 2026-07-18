# React Learning Quiz Summary

A record of the quiz rounds worked through while building out this app's frontend, testing understanding of React fundamentals, state/data fetching, testing, and hooks/context.

## Round 1: Core React Fundamentals (10 questions)

| # | Topic | Result |
|---|---|---|
| 1 | `useState` vs. plain variable (persistence + reactivity) | Partial — got "triggers re-render," missed that plain variables don't even *persist* across renders |
| 2 | Stale closures / `useEffect` deps | Explained — correctly caught that the illustrative example was hypothetical, not an actual bug in this codebase |
| 3 | Controlled vs. uncontrolled inputs | Explained |
| 4 | State lifting (`Filters` component) | Explained |
| 5 | `key` prop / reconciliation | Explained |
| 6 | Re-render mechanics / `useMemo` (`SummaryBar`) | Partial — right that it recomputes, missed that it recomputes *regardless* of whether `expenses` changed |
| 7 | `Suspense`/`lazy` vs. `isLoading` | Partial — right shape, missed the "throws a promise" mechanism |
| 8 | `&&` conditional rendering falsy-value gotcha | Missed — described a different bug (missing properties) than the one asked (`0` rendering literally) |
| 9 | `StrictMode` double-invocation + 2 hands-on fixes | Interval cleanup fix: correct. Render-counter fix: incorrect first attempt (would've caused an infinite loop), corrected after a hint |
| 10 | Type-based reconciliation (`Suspense` fallback swap) | Correct |

## Round 2: State & Data Fetching (5 questions)

| # | Topic | Result |
|---|---|---|
| 1 | Why filters live in `useSearchParams`, not `useState` | Partial — right about "two sources of truth," reasoning was a bit off |
| 2 | Direct navigation to `ExpenseDetail` (cache miss handling) | Partial — right conclusion, mechanics were vague |
| 3 | Invalidation while `ChartsTab` unmounted | Correct |
| 4 | Why `data: expenses = []` fallback matters | Partial — right conclusion, reasoning conflated "empty" with "undefined" |
| 5 | Invalidating `['expenses']` across multiple cached filter combos | Mostly correct |

## Round 3: Testing (2 of 3 questions, then pivoted)

| # | Topic | Result |
|---|---|---|
| 1 | Why `MemoryRouter` needed for `ExpenseTable` test | Correct |
| 2 | Why fresh `QueryClient` per test | Correct |
| 3 | Mock API layer vs. child components | Not answered — pivoted to hooks/context |

## Round 4: Hooks & Context (9 questions, heaviest round)

| # | Topic | Result |
|---|---|---|
| 1 | Why Zustand/Redux exist despite Context | Explained |
| 2 | Context re-render + `React.memo` interaction | Partial first pass (attributed to wrong mechanism), then correctly identified that `memo` doesn't check context on the follow-up |
| 3 | Rules of Hooks — call order (silent corruption) | Explained |
| 4 | Custom hook naming convention | Explained |
| 5 | Rules of Hooks — timing/location (`setTimeout`) | Explained |
| 6 | `useReducer` vs. `useState`-with-object | Explained, then correctly synthesized the immutability principle afterward |
| 7 | `useEffect` vs. `useLayoutEffect` | Explained |
| 8 | Batching (single handler, two `setState` calls) | Correct on the headline ("once"), missed the connection to functional updaters |
| 9 | Automatic batching's React 18 history | Explained |

## Overall pattern

Strongest on mechanism-tracing questions once given the code to look at directly (`MemoryRouter`, `QueryClient` isolation, the `useNavigate` context requirement, the interval cleanup fix, batching's headline result). Weaker spots were questions asking for one *specific* mechanism where a plausible-but-different explanation came to mind instead (the `&&` gotcha, the `Suspense`/`lazy` mechanism, attributing Context's re-render to the wrong cause) — normal territory for things most React developers only fully internalize after hitting the bug once themselves.
