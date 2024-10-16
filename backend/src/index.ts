import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'
import { authRouter } from './routes/auth'
import { foodItemsRouter } from './routes/foodItems'
import { ordersRouter } from './routes/orders'

const app = new Hono()

app.use(cors())
app.use('/api/*', jwt({ secret: process.env.JWT_SECRET || 'a3e9376994b68b6a2db51c229acb589e768eaf25a14d72513fae3434e5f94498' }))

const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,
  user: 'username',
  host: 'localhost',
  database: 'kotashop',
  password: 'School100',
  port: 5432,
})
export const db = drizzle(pool, { schema })

app.use('*', cors({
  origin: 'http://localhost:8080', // Allow requests from your frontend
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.route('/auth', authRouter)
app.route('/api/food-items', foodItemsRouter)
app.route('/api/orders', ordersRouter)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})