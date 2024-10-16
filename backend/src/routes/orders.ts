import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../index'
import { orders, orderItems } from '../schema'

const ordersRouter = new Hono()

ordersRouter.get('/', async (c) => {
  const allOrders = await db.select().from(orders)
  return c.json(allOrders)
})

ordersRouter.post('/', async (c) => {
  const { userId, totalAmount, status, items } = await c.req.json()
  
  const newOrder = await db.transaction(async (tx) => {
    const [order] = await tx.insert(orders).values({ userId, totalAmount, status }).returning()
    
    for (const item of items) {
      await tx.insert(orderItems).values({
        orderId: order.id,
        foodItemId: item.foodItemId,
        quantity: item.quantity,
        price: item.price
      })
    }
    
    return order
  })

  return c.json(newOrder, 201)
})

ordersRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const order = await db.select().from(orders).where(eq(orders.id, parseInt(id))).limit(1)
  if (order.length === 0) {
    return c.json({ error: 'Order not found' }, 404)
  }
  return c.json(order[0])
})

ordersRouter.put('/:id', async (c) => {
  const id = c.req.param('id')
  const { status } = await c.req.json()
  const updatedOrder = await db.update(orders).set({ status }).where(eq(orders.id, parseInt(id))).returning()
  return c.json(updatedOrder[0])
})

export { ordersRouter }