"use client"

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import { Combobox } from '@/components/ui/combobx';

interface Categoryform{
    initialData: Course
    options: { label: string, value: string}[]
    courseId: string
}

const formSchema = z.object({
    categoryId: z.string().min(1)
})

export const Categoryform = ({ initialData, courseId, options }: Categoryform) => {

    const [ isEditing, setIsEditing ] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          categoryId: initialData.categoryId || ""
        }
    })

    const selectedOption = options.find((option) => option.value === initialData.categoryId)

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course Updated")
            toggleEdit()
            router.refresh()
        }catch{
            toast.error("Something went wrong")
        }
    }

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Category
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit Category
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing ? 
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.categoryId && "text-slate-500 italic"
                  )}>
                    { selectedOption?.label || "No category"}
                </p>
                :
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                    >
                        <FormField 
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                      <Combobox 
                                        options={options}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            }
        </div>
    )
}