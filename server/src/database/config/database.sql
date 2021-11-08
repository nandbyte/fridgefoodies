create extension if not exists "pgcrypto";

drop table rating;
drop table comment;
drop table recipe_ingredient;
drop table ingredient;
drop table recipe;
drop table foodie;

create table foodie(
    foodie_id uuid primary key default gen_random_uuid(),
    foodie_name varchar(256) not null,
    foodie_email varchar(256) not null,
    foodie_password varchar(256) not null,
    foodie_is_admin boolean
    
);

create table recipe(
    recipe_id serial primary key,
    foodie_id uuid references foodie(foodie_id),
    recipe_title varchar(512) not null,
    recipe_image varchar(8000) not null,
    recipe_text varchar(8000) not null
);

create table ingredient(
    ingredient_id serial primary key,
    ingredient_name varchar(256) not null unique,
    ingredient_description varchar(4096)
);

create table recipe_ingredient(
    recipe_ingredient_id serial primary key,
    recipe_id int references recipe(recipe_id),
    ingredient_id int references ingredient(ingredient_id),
    ingredient_variant varchar(256),    
    ingredient_quantity varchar(128) not null,
    ingredient_calories decimal(17,2)
);

create table comment(
    comment_id serial primary key,
    foodie_id uuid references foodie(foodie_id),
    recipe_id int references recipe(recipe_id),
    comment_text varchar(4096) not null
);

create table rating(
    foodie_id uuid references foodie(foodie_id),
    recipe_id int references recipe(recipe_id),
    primary key(foodie_id,recipe_id)
);

-- SELECT *
-- FROM recipe 
-- WHERE recipe_id in (
--     SELECT recipe_id FROM recipe_ingredient
--     WHERE ingredient_id=1
-- )

-- SELECT recipe.*,totalRating
-- FROM recipe,(
--     SELECT COUNT(recipe_id) as totalRating, recipe_id
--     FROM rating
--     GROUP BY recipe_id
-- ) AS counterTable
-- WHERE recipe.recipe_id = counterTable.recipe_id 
--     AND lower(recipe_title) like lower($1)
-- ;


-- SELECT recipe.*,totalRating
--         FROM recipe,(
--         SELECT COUNT(recipe_id) as totalRating, recipe_id
--         FROM rating
--         GROUP BY recipe_id
--     ) AS counterTable
--     WHERE recipe.recipe_id = counterTable.recipe_id AND recipe.recipe_id = 4
--     ORDER BY recipe_id asc
--     ;


-- SELECT recipe.*,totalRating
--         FROM recipe,(
--         SELECT COUNT(recipe_id) as totalRating, recipe_id
--         FROM rating
--         GROUP BY recipe_id
--     ) AS counterTable
--     WHERE recipe.recipe_id = counterTable.recipe_id 
--         AND recipe.recipe_id = 4 
--         AND recipe.foodie_id = $1
--     ;

-- SELECT * FROM recipe WHERE lower(recipe_title) like lower($1)


-- SELECT recipe.*,totalRating
--         FROM recipe,(
--         SELECT COUNT(recipe_id) as totalRating, recipe_id
--         FROM rating
--         GROUP BY recipe_id
--         ) AS counterTable
--         WHERE recipe.recipe_id = counterTable.recipe_id 
--         AND lower(recipe_title) like lower('%beef%')
--         ORDER BY totalrating asc;