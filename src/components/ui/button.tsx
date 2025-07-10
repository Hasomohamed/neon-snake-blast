import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "neon-button font-bold tracking-wide",
        "neon-primary": "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:text-neon-cyan-bright transition-all duration-300",
        "neon-secondary": "bg-transparent border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:text-neon-purple-bright transition-all duration-300",
        "neon-success": "bg-transparent border-2 border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] hover:text-neon-green-bright transition-all duration-300",
        "neon-danger": "bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:text-red-400 transition-all duration-300",
        "game-primary": "bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] font-bold tracking-wider transition-all duration-300",
        "game-pause": "bg-neon-orange/20 border-2 border-neon-orange text-neon-orange hover:bg-neon-orange/30 hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] font-bold transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
