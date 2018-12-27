const express = require('express');

const app = express();

const PORT = 3301;

app.get('/', (request, response) => {
    response.send('Hello and Welcome to Questioner Application');
});

app.listen(PORT, () => {
    console.log(`Questioner Server running on ${PORT}`);
});