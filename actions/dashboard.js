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


export async function getUserAccount(accountId) {    
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
                // transactions: {
                //     orderBy: { date: "desc" },
                // },
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
        throw new Error("Failed to get user account");
        
    }
}


//   const account = await db.account.findUnique({
//     where: {
//       id: accountId,
//       userId: user.id,
//     },
//     include: {
//       transactions: {
//         orderBy: { date: "desc" },
//       },
//       _count: {
//         select: { transactions: true },
//       },
//     },
//   });

//   if (!account) return null;

//   return {
//     ...serializeDecimal(account),
//     transactions: account.transactions.map(serializeDecimal),
//   };
// }

// export async function bulkDeleteTransactions(transactionIds) {
//   try {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//       where: { clerkUserId: userId },
//     });

//     if (!user) throw new Error("User not found");

//     // Get transactions to calculate balance changes
//     const transactions = await db.transaction.findMany({
//       where: {
//         id: { in: transactionIds },
//         userId: user.id,
//       },
//     });

//     // Group transactions by account to update balances
//     const accountBalanceChanges = transactions.reduce((acc, transaction) => {
//       const change =
//         transaction.type === "EXPENSE"
//           ? transaction.amount
//           : -transaction.amount;
//       acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
//       return acc;
//     }, {});

//     // Delete transactions and update account balances in a transaction
//     await db.$transaction(async (tx) => {
//       // Delete transactions
//       await tx.transaction.deleteMany({
//         where: {
//           id: { in: transactionIds },
//           userId: user.id,
//         },
//       });

//       // Update account balances
//       for (const [accountId, balanceChange] of Object.entries(
//         accountBalanceChanges
//       )) {
//         await tx.account.update({
//           where: { id: accountId },
//           data: {
//             balance: {
//               increment: balanceChange,
//             },
//           },
//         });
//       }
//     });

//     revalidatePath("/dashboard");
//     revalidatePath("/account/[id]");

//     return { success: true };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// }

// export async function updateDefaultAccount(accountId) {
//   try {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//       where: { clerkUserId: userId },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     // First, unset any existing default account
//     await db.account.updateMany({
//       where: {
//         userId: user.id,
//         isDefault: true,
//       },
//       data: { isDefault: false },
//     });

//     // Then set the new default account
//     const account = await db.account.update({
//       where: {
//         id: accountId,
//         userId: user.id,
//       },
//       data: { isDefault: true },
//     });

//     revalidatePath("/dashboard");
//     return { success: true, data: serializeTransaction(account) };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// }