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
    imageName int REFERENCES product_image(id)
);

COMMIT;