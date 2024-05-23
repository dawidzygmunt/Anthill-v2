import prismaCodesMap from "@/app/(dashboard)/utils/prisma-codes"
import prisma from "@/lib/db"
import { addDays } from "date-fns"

export const getWeeks = async (from: Date, to: Date) => {
  try {
    return await prisma.week.findMany({
      where: {
        from: {
          gte: from,
          lt: to,
        },
      },
      include: {
        TrackRow: {
          include: {
            Track: true,
          },
        },
      },
    })
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    console.log(err.message)
    return { error: "Something went wrong!" }
  }
}
