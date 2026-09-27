create extension if not exists "uuid-ossp";

create type gender as enum ('male', 'female');

create table users(
    id uuid default uuid_generate_v4() primary key,
    mobile varchar(10) unique not null,
    full_name varchar(50) not null,
    email varchar(50) not null,
    gender gender not null,
    hint_name varchar(30),
    location varchar(50),
    alternate_mobile varchar(10),
    birth_date date,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null
);

create unique index unique_mobile on users (mobile) where archived_at is null;

create type address_type as enum('home', 'office');

create table addresses(
    id uuid default uuid_generate_v4() primary key,
    user_id uuid,
    full_name varchar(50) not null,
    mobile varchar(10) not null,
    pincode varchar(6) not null,
    state varchar(30) not null,
    address varchar(200) not null,
    locality varchar(50) not null,
    city varchar(30) not null,
    type_of_address address_type not null,
    is_default_address boolean default false,
    is_open_on_saturday boolean default false,
    is_open_on_sunday boolean default false,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null,
    foreign key(user_id) references users (id)
);

create unique index unique_user_address on addresses (user_id) where archived_at is null;

create table sessions(
    id uuid default uuid_generate_v4() primary key,
    user_id uuid,
    created_at timestamp with time zone default now(),
    ended_at timestamp with time zone default null,
    foreign key(user_id) references users(id)
);

create unique index unique_session on sessions (user_id) where ended_at is null;

create table categories(
    id uuid primary key,
    name varchar(20) not null,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null
);

create table subcategories(
    id uuid primary key,
    name varchar(30) not null,
    category_id uuid,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null,
    foreign key(category_id) references categories(id)
);

create table product_types(
    id uuid primary key,
    name varchar(30) not null,
    subcategory_id uuid,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null,
    foreign key(subcategory_id) references subcategories(id)
);

create table brands(
    id uuid primary key,
    name varchar(50) not null,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null
);

create unique index unique_brands on brands (id, name) where archived_at is null;

create table products(
    id uuid default uuid_generate_v4() primary key,
    product_type_id uuid,
    name varchar(50) not null,
    brand_id uuid,
    description text not null,
    details text not null,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null,
    foreign key(brand_id) references brands(id),
    foreign key(product_type_id)references product_types(id)
);

create unique index unique_products on products (product_type_id, name, brand_id) where archived_at is null;

create table product_variants(
    id uuid default uuid_generate_v4() primary key,
    color varchar(20) not null,
    size text,
    price integer not null,
    product_id uuid,
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default nullb,
    foreign key(product_id) references products(id)
);

create unique index unique_product_variants on product_variants (product_id, color, price) where archived_at is null;

create table inventory(
    product_id uuid,
    variant_id uuid,
    stock integer default 0,
    last_stock_ordered_at timestamp with time zone default null,
    primary key(product_id, variant_id),
    foreign key(product_id) references products(id),
    foreign key(variant_id) references product_variants(id)
);

create unique index unique_inventory on inventory (product_id, variant_id);

create table wishlist(
    user_id uuid,
    product_id uuid,
    added_at timestamp with time zone default now(),
    removed_at timestamp with time zone default null,
    primary key(user_id, product_id),
    foreign key(product_id) references products(id),
    foreign key(user_id) references users(id)
);

create unique index unique_wishlist on wishlist (user_id, product_id);

create table bag(
    user_id uuid,
    variant_id uuid,
    quantity integer default 1,
    size text,
    added_at timestamp with time zone default now(),
    removed_at timestamp with time zone default null,
    foreign key(variant_id) references product_variants(id),
    foreign key(user_id) references users(id)
);

create unique index unique_shopping_bag on bag (user_id, variant_id);

create table images_on_cloud(
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    path text not null,
    category_name varchar(20),
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null
);

create unique index unique_images on images_on_cloud (path, category_name) where archived_at is null;

create table variant_images(
    variant_id uuid,
    image_id uuid,
    primary key(variant_id, image_id),
    foreign key(image_id) references images_on_cloud(id),
    foreign key(variant_id) references product_variants(id)
);

create unique index unique_variant_images on variant_images (variant_id, image_id);

create type order_status as enum('delivered', 'cancelled', 'returned');

create table orders(
    id uuid default uuid_generate_v4() primary key,
    order_status order_status,
    ordered_at timestamp with time zone default now(),
    delivered_at timestamp with time zone default null,
    cancelled_at timestamp with time zone default null,
    returned_at timestamp with time zone default null
);

create unique index unique_orders on orders (id);

create table order_details(
    id uuid default uuid_generate_v4() primary key,
    order_id uuid,
    variant_id uuid,
    user_id uuid,
    address_id uuid,
    price integer,
    quantity integer,
    mode_of_payment text,
    payment_id text,
    foreign key(address_id) references addresses(id),
    foreign key(user_id) references users(id),
    foreign key(variant_id) references product_variants(id),
    foreign key(order_id) references orders(id)
);

create unique index unique_order_details on order_details (order_id, variant_id, user_id);