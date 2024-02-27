require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
//Curiosity: 2024-02-19
//opotunity: 2018-06-11
//Spirit: 2010-03-21
// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.rover}/photos?earth_date=${req.query.date}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send(image)

    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))