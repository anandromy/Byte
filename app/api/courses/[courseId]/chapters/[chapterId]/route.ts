import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string }}
) => {

    try{
        const { isPublished, ...values } = await req.json()
        const { userId } = auth()
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                ...values
            }
        })

        // TODO: HANDLE VIDEO UPLOAD

        return NextResponse.json(chapter)

    }catch(error){
        console.log("[CHAPTER ID]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}