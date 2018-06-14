const express = require('express')
const app = express()

app.all('/', (req, res) => res.send('Hello World!'))

app.all('/resource', (req, res) => res.send('Resource res'));

app.listen(8081, () => console.log('Example app listening on port 8081!'));