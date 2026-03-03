import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[#C8971A] text-[#0F0A07] hover:bg-[#E4B84A] shadow-lg shadow-[#C8971A]/20 font-semibold',
        destructive:
          'bg-[#8B1A1A] text-[#F5EDD6] hover:bg-[#A52A2A] shadow-lg shadow-[#8B1A1A]/20',
        outline:
          'border border-[#C8971A] text-[#C8971A] bg-transparent hover:bg-[#C8971A]/10',
        ghost:
          'text-[#C8B896] hover:text-[#F5EDD6] hover:bg-[#251A0E]',
        link: 'text-[#C8971A] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 rounded-md px-4 text-xs',
        lg: 'h-12 rounded-md px-10 text-base',
        xl: 'h-14 rounded-lg px-12 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
