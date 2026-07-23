-- Seed a single default account and its spenders, matching the frontend's
-- former mock data (src/data/mock.ts), so switching from mock to real data
-- doesn't change what the UI shows on day one. No multi-account/auth is
-- wired up on the frontend yet, so everything is scoped to this one account.

INSERT INTO account (name) VALUES ('Default Account');

INSERT INTO spender (account_id, name)
SELECT account.id, s.name
FROM account, (VALUES ('Alice'), ('Bob'), ('Charlie')) AS s(name)
WHERE account.name = 'Default Account';
