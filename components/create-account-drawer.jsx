"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wallet, DollarSign, Star, IndianRupee } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
      data: newAccount,
      error,
      fn: createAccountFn,
      loading: createAccountLoading,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="border-0">
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
          <DrawerHeader className="border-b border-slate-200/50 dark:border-slate-700/50 pb-4">
            <div className="flex items-center gap-3">
              <div>
                <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Create New Account
                </DrawerTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Add a new account to track your finances
                </p>
              </div>
            </div>
          </DrawerHeader>
          
          <div className="px-6 pb-6 pt-4">
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  Account Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g., Main Checking"
                  {...register("name")}
                  className="h-11 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                />
                {errors.name && (
                  <p className="text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <span className="font-medium">⚠</span> {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  Account Type
                </label>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  defaultValue={watch("type")}
                >
                  <SelectTrigger id="type" className="h-11 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CURRENT">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        Current Account
                      </div>
                    </SelectItem>
                    <SelectItem value="SAVINGS">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        Savings Account
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <span className="font-medium">⚠</span> {errors.type.message}
                  </p>
                )}
              </div>

              {/* Initial Balance */}
              <div className="space-y-2">
                <label
                  htmlFor="balance"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <IndianRupee className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Initial Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                    ₹
                  </span>
                  <Input
                    id="balance"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("balance")}
                    className="h-11 pl-8 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  />
                </div>
                {errors.balance && (
                  <p className="text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <span className="font-medium">⚠</span> {errors.balance.message}
                  </p>
                )}
              </div>

              {/* Set as Default */}
              <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-4 transition-all hover:border-amber-300 dark:hover:border-amber-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <label
                      htmlFor="isDefault"
                      className="text-base font-semibold cursor-pointer text-slate-800 dark:text-slate-100 flex items-center gap-2"
                    >
                      <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      Set as Default Account
                    </label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      This account will be selected by default for transactions
                    </p>
                  </div>
                  <Switch
                    id="isDefault"
                    checked={watch("isDefault")}
                    onCheckedChange={(checked) => setValue("isDefault", checked)}
                    className="data-[state=checked]:bg-amber-600 ml-4"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <DrawerClose asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 h-11 border-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/30 dark:shadow-blue-900/30"
                  disabled={createAccountLoading}
                >
                  {createAccountLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}