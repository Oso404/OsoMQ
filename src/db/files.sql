\c osomq
create table files (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    file_name TEXT NOT NULL,
    file_type TEXT,
    file_size BIGINT,
    s3_key TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);