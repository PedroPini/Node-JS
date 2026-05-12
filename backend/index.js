import "dotenv/config";
//ESModule
import express from 'express'
const app = express()
const port = process.env.PORT || 3000

//http://localhost:3000/
app.get('/', (req, res) => {
  console.log("Hurray we're at GET method")
  res.send('Hello World!')
})

//http://localhost:3000/create/task
app.post('/create/task', (req, res) => {
  res.send('Hello World!')
})

app.post('/create/potato', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`LOGGING my name as well ${process.env.NAME}`)
  console.log(`Example app listening on port ${port}`)
})