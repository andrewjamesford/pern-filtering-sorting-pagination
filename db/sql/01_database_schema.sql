BEGIN TRANSACTION;

CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    name text
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name text,
    description text,
    price money,
    product_image_id int REFERENCES product_image(id)
);

COMMIT;