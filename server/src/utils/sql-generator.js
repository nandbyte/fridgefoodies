const fs = require("fs");
const fetch = require("node-fetch");

const ingredientsUrl = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
let sqlData = "";

const getData = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        json.meals.map((ingredient) => {
            sqlData += `insert into ingredient (ingredient_name, ingredient_description) values ('${ingredient.strIngredient}', '${ingredient.strDescription}');\n`;
        });
        fs.writeFile("./src/database/config/rough.sql", sqlData, (err) => {
            if (err) console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
};

getData(ingredientsUrl);
