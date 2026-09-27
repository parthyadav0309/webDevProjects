/* Replace with your SQL commands */

drop index unique_user_address;

create unique index unique_user_address on addresses (id) where archived_at is null;