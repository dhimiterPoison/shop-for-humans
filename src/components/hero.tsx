import Image from "next/image";

export function Hero() {
  return (
    <div className="from-muted/20 to-muted/5 border relative flex h-96 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b">
      {/* <Image 
        src='/hero-1.jpg'
        className="h-full w-full object-cover bg-center  absolute opacity-70"
        alt="Ceramic rings showcased on woman's hands caressing flowers"
        width={1080}
        height={1629}
      /> */}
      <div className="z-10 flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Life is <u>more</u> than <i>just</i> survival.awdawd
        </h1>
        <p className="text-muted-foreground text-lg">
          Surround yourself with beauty, decor your spaces.
        </p>
        <p className="text-muted-foreground text-lg">
          Shop our collection of non-essential items.
        </p>
      </div>
    </div>
  )
}

