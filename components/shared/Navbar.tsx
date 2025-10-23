import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerSession()
  
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">MyApp</div>
      <div className="flex gap-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Contact</Button>
        {
          session?.user ? <LogoutButton></LogoutButton> :
          <>
          <Link href={'/auth/login'}> Login</Link> 
          {/* <Link href={'/auth/register'}> register</Link> */}
            </>
        }
      </div>
    </nav>
  );
}
