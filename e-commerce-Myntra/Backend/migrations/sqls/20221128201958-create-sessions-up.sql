/* Replace with your SQL commands */

create table sessions(
    id uuid default uuid_generate_v4() primary key,
    user_id uuid,
    created_at timestamp with time zone default now(),
    ended_at timestamp with time zone default null,
    foreign key(user_id) references users(id)
);

create unique index unique_session on sessions (user_id) where ended_at is null;
