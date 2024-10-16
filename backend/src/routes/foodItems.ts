import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../index'
import { foodItems } from '../schema'

const foodItemsRouter = new Hono()

foodItemsRouter.get('/', async (c) => {
  const items = await db.select().from(foodItems)
  return c.json(items)
})

foodItemsRouter.post('/', async (c) => {
  const { name, quantity, price } = await c.req.json()
  const newItem = await db.insert(foodItems).values({ name, quantity, price }).returning()
  return c.json(newItem[0], 201)
})

foodItemsRouter.put('/:id', async (c) => {
  const id = c.req.param('id')
  const { name, quantity, price } = await c.req.json()
  const updatedItem = await db.update(foodItems).set({ name, quantity, price }).where(eq(foodItems.id, parseInt(id))).returning()
  return c.json(updatedItem[0])
})

foodItemsRouter.delete('/:id', async (c) => {
  const id = c.req.param('id')
  await db.delete(foodItems).where(eq(foodItems.id, parseInt(id)))
  return c.json({ message: 'Food item deleted successfully' })
})

export { foodItemsRouter }