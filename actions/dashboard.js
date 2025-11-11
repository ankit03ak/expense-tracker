"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

// export async function getAccountWithTransactions(accountId) {
export async function createAccount(data) {
    try {
          const { userId } = await auth();
          if (!userId) throw new Error("Unauthorized");

            const user = await db.user.findUnique({
            where: { clerkUserId: userId },
            });

        if (!user) throw new Error("User not found");



        const balanceFloat = parseFloat(data.balance);
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance amount");
        }

        const existingAccount = await db.account.findMany({
            where: {
                userId: user.id,
            },
        });

        const shouldBeDefault = existingAccount.length === 0 ? true : data.isDefault; 
        
        if(shouldBeDefault){
            await db.account.updateMany({
                where: {
                    userId: user.id,
                    isDefault: true,
                },
                data: {
                    isDefault: false,
                }
            })
        }
        
        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                // name: data.name,
                isDefault: shouldBeDefault,
            },
        });

        const serializedAccount = serializeTransaction(account);
        revalidatePath("/dashboard");
        return {success: true, account: serializedAccount};
        
    } catch (error) {
        // return {success: false, error: error.message};
        throw new Error("Failed to create account");
        
    }

}


export async function getUserAccounts(accountId) {    
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) throw new Error("User not found");

        const accounts = await db.account.findMany({
            where: {
                // id: accountId,
                userId: user.id,
            },
            orderBy: { isDefault: "desc" },
            include: {
                
                _count: {
                    select: { transactions: true },
                },
            },
        });

        if (!accounts) return null;


        const serializedAccount = accounts.map(serializeTransaction);

        // return {success: true, account: serializedAccount};
        return serializedAccount;

    } catch (error) {
        // return {success: false, error: error.message};
        throw new Error("Failed to get user account" + error.message);
        
    }
}



export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}

