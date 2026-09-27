/* Replace with your SQL commands */
alter table users
add column full_name varchar(50),
add column email varchar(50),
add column gender gender,
add column hint_name varchar(30),
add column location varchar(50),
add column alternate_mobile varchar(10),
add column birth_date date,
add column created_at timestamp with time zone default now(),
add column archived_at timestamp with time zone default null;
