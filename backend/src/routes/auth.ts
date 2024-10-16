import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../index'
import { users } from '../schema'

const authRouter = new Hono()

authRouter.post('/register', async (c) => {
  const { email, password } = await c.req.json()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }
    
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
if (existingUser.length > 0) {
  return c.json({ error: 'User already exists' }, 409);
}

    await db.insert(users).values({ email, password: hashedPassword })
    return c.json({ message: 'User registered successfully' }, 201)
  } catch (error) {
    console.error('Registration Error:', error);
    return c.json({ error: 'Registration failed' }, 500);  }
})

authRouter.post('/login', async (c) => {
  const { email, password } = await c.req.json()

  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (user.length === 0) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password)
  if (!isPasswordValid) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET || '0df3361d887be03356e36bea88270b3520cf0a14b65935b72d6071b830709685', { expiresIn: '1h' })
  return c.json({ token })
})

export { authRouter }