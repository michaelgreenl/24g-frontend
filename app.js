const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'static')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}, go to localhost:${PORT} to view project`))
app.get('/', (req, res) => {res.render('index')})