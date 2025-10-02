import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import ThemeToggle from "./ThemeToggle";

const Header = async () => {
  await checkUser();
  return (
    <div className="ffixed top-0 w-full bg-white/30 backdrop-blur-md z-50 border-b">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logoo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-16 w-auto object-contain"
          />
        </Link>

<div className="flex items-center space-x-4">

  <ThemeToggle />

            <SignedIn>
            <Link
              href={"/dashboard"}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >

              <Button variant="outline" className="cursor-pointer text-gray-900">
                <LayoutDashboard size={18} />
                <span 
                className="hidden md:inline text-gray-900"
                >Dashboard</span>
              </Button>
            </Link>
            <Link href="/transaction/create">
              <Button className="flex items-center gap-2 cursor-pointer">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>


        <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button varient="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
            appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                }
              }}
            />
          </SignedIn>
</div>
      </nav>
    </div>
  )
}

export default Header;
