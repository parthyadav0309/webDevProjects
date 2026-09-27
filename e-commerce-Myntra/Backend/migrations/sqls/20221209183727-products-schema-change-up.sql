/* Replace with your SQL commands */

drop table bag;
drop table order_details;
drop table inventory;
drop table images;
drop table product_variants;
alter table products drop column body;
alter table products drop column specifications;
alter table products drop column complete_the_look;
alter table products drop column brand_id;
alter table products add column brand varchar(30);
alter table products add column seller varchar(50);
alter table products add column ratings integer;
alter table products add column no_of_ratings integer;
alter table products add column material_and_care text;
alter table products add column discount integer;
alter table products add column dominant_color varchar(30);
alter table products add column stock integer;
alter table products add column price integer;
alter table products add column compare_at_price integer;
alter table products add column size text;
alter table products add column features text;
alter table products add column is_in_stock boolean;

drop table brands;

create table bag(
    user_id uuid,
    product_id uuid,
    quantity integer default 1,
    size text,
    added_at timestamp with time zone default now(),
    removed_at timestamp with time zone default null,
    foreign key(product_id) references products(id),
    foreign key(user_id) references users(id)
);

create table images(
    id uuid default uuid_generate_v4() primary key,
    product_id uuid,
    image_link text,
    foreign key(product_id) references products(id),
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null
);

create table order_details(
    id uuid default uuid_generate_v4() primary key,
    order_id uuid,
    product_id uuid,
    user_id uuid,
    address_id uuid,
    price integer,
    quantity integer,
    mode_of_payment text,
    payment_id text,
    foreign key(address_id) references addresses(id),
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id),
    foreign key(order_id) references orders(id)
);
