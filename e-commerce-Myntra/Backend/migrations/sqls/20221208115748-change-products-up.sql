/* Replace with your SQL commands */

alter table products rename column name to title;
alter table products rename column description to body;
alter table products add column care_instructions text, add column dominant_material varchar(20), add column product_type varchar(20), add column size_fit text, add column complete_the_look text, add column specifications text;
alter table product_variants add column variant_compare_at_price integer;