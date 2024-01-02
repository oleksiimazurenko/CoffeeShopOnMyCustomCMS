'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const togglePageDisableStatus = async (id: number, isDisabled: boolean) => {

	const prisma = new PrismaClient();
  await prisma.page.update({
    where: { id: id },
    data: { isDisabled: isDisabled }
  });

	revalidatePath('/', 'layout')

}

export { togglePageDisableStatus }