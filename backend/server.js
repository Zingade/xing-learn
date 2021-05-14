const express = require('express');
const path = require('path')

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


app.listen(port, () => {
    console.log(`xingLearn Backend is listening at http://localhost:${port}`)
})