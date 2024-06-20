'use server'

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    throw new Error('You need to be logged in to view this page.')
  }

  console.log('Fetching order for user:', user.id, 'with orderId:', orderId)

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  })

  if (!order) {
    console.error('Order not found')
    throw new Error('This order does not exist.')
  }

  console.log('Order found:', order)

  if (order.isPaid) {
    return order
  } else {
    return false
  }
}
