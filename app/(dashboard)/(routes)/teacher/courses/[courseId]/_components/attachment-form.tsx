"use client"

import { Button } from '@/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import * as z from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FileUpload } from '@/components/file-upload';
import { Attachment, Course } from '@prisma/client';

interface AttachmentFormProps{
    initialData: Course & { attachments: Attachment[] }
    courseId: string
}

const formSchema = z.object({
    url: z.string().min(1)
})

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {

    const [ isEditing, setIsEditing ] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try{
            await axios.post(`/api/courses/${courseId}/attachments`, values)
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
                Course attachements
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className='h-4 w-4 mr-2'/>
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <>
                    {initialData.attachments.length === 0 && (
                        <p className='text-sm mt-2 text-slte-500 italic'>
                            No attachments yet
                        </p>
                    )}
                    </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint='courseAttachments'
                        onChange={(url) => {
                            if(url){
                                onSubmit({ url: url })
                            }
                        }}
                    />
                    <div className='text-xs text-muted-foreground mt-4'>
                        Add anything your students might need to complete the course
                    </div>
                </div>
            )}
        </div>
    )
}