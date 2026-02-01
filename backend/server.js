import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173' // adjust if using 3000
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
