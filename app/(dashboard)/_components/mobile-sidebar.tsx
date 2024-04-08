import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'

export const MobileSidebar = () => {
    return(
        <Sheet>
            <SheetTrigger className='md:hidden hover:opacity-75 transition pr-4'>
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className='p-0 bg-white'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

