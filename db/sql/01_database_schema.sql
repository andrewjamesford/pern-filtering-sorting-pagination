BEGIN TRANSACTION;

CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    name text,
    description text
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name text,
    description text,
    price money,
    discount_amount money,
    product_category_id int REFERENCES product_category(id),
    product_image_id int REFERENCES product_image(id)
);


COMMIT;