"use client";

import { updateDefaultAccount } from "@/actions/account";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { ArrowDownRight, ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
    const { name, type, balance, id, isDefault } = account;

      const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

    useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
     <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Default badge */}
      {isDefault && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
            <Star className="h-3 w-3 fill-white" />
            Default
          </div>
        </div>
      )}

      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
            <CardTitle className="text-base font-semibold capitalize text-slate-800 dark:text-slate-100">
              {name}
            </CardTitle>
          </div>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
            className="data-[state=checked]:bg-blue-600"
          />
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-3">
          <div className="space-y-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ₹{parseFloat(balance).toFixed(2)}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 relative z-10">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex-1">
            <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Income</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 flex-1">
            <div className="h-6 w-6 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
              <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-sm font-medium text-rose-700 dark:text-rose-400">Expense</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default AccountCard