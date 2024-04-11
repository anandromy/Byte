import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => {
        const { userId } = auth()
        if(!userId) throw new Error("Unauthorized")
        return { userId }
    })
    .onUploadComplete(() => {}),

    courseAttachments: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => {
        const { userId } = auth()
        if(!userId) throw new Error("Unauthorized")
        return { userId }
    })
    .onUploadComplete(() => {}),

    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(() => {
        const { userId } = auth()
        if(!userId) throw new Error("Unauthorized")
        return { userId }
    })
    .onUploadComplete(() => {}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;