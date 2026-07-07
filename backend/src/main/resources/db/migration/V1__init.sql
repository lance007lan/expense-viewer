CREATE TABLE account (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE app_user (
    id            BIGSERIAL PRIMARY KEY,
    account_id    BIGINT       NOT NULL REFERENCES account (id),
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name  VARCHAR(255),
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- A spender belongs to one account and optionally maps to a login user.
CREATE TABLE spender (
    id         BIGSERIAL PRIMARY KEY,
    account_id BIGINT       NOT NULL REFERENCES account (id),
    user_id    BIGINT                REFERENCES app_user (id),
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE expense (
    id          BIGSERIAL PRIMARY KEY,
    spender_id  BIGINT         NOT NULL REFERENCES spender (id),
    description VARCHAR(500),
    amount      NUMERIC(19, 2) NOT NULL,
    category    VARCHAR(100),
    date        DATE           NOT NULL,
    created_at  TIMESTAMP      NOT NULL DEFAULT NOW()
);
