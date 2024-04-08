import Image from "next/image"

export const Logo = () => {
    return(
        <Image 
        alt="logo"
        src="/logo.svg"
        width={130}
        height={130}
        />
    )
}