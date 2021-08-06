require('dotenv').config()

const api_key = process.env.API_KEY;

fetch(`https://api.edamam.com/${api_key}/recipes/v2`)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        // use the data how ever you want

    })
    .catch(err => {
        console.error(err);
    });