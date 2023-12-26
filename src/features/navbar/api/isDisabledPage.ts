'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const isDisabledPage = async (id: number, isDisabled: boolean) => {

	const prisma = new PrismaClient();
  const updatedExample = await prisma.page.update({
    where: { id: id },
    data: { isDisabled: isDisabled }
  });

	revalidatePath('/', 'layout')

}

export {isDisabledPage}