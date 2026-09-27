/* Replace with your SQL commands */

drop table variant_images;
drop table images_on_cloud;

create table images(
    id uuid default uuid_generate_v4() primary key,
    variant_id uuid,
    image_link text,
    foreign key(variant_id) references product_variants(id),
    created_at timestamp with time zone default now(),
    archived_at timestamp with time zone default null
);
