const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

async function main(){
    try{
        await database.category.createMany({
            data: [
               { name: "Computer Science" },
               { name: "English" },
               { name: "Maths" },
               { name: "Data Science" },
               { name: "Web Devevlopement" },
               { name: "Art" },
               { name: "Engineering" }
            ]
        })

        console.log("Success")
    }catch (error){
        console.log("Error seeding the databasr categories", error)
    } finally {
        await database.$disconnect();
    }
}

main();