"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const router = useRouter()

    const isTeacherPage = pathname.startsWith('/teacher')

    return(
        <div className="flex gap-x-2 ml-auto">
            {
                isTeacherPage ?
                <Button>
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
                :
                <Link href="/teacher/courses">
                    <Button>
                        Teacher mode
                    </Button>
                </Link>
            }
            <UserButton />
        </div>
    )
}