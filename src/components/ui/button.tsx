import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 font-[Assistant]',
  {
    variants: {
      variant: {
        /* Primary CTA — amber */
        default:
          'bg-[#AD652E] text-[#E4E1D8] hover:bg-[#C97B42] shadow-lg shadow-[#AD652E]/25 hover:shadow-[#AD652E]/40 hover:-translate-y-0.5 active:translate-y-0',
        /* Secondary — truffle outlined */
        outline:
          'border-2 border-[#82583B] text-[#82583B] bg-transparent hover:bg-[#82583B] hover:text-[#E4E1D8] transition-colors duration-200',
        /* Ghost — minimal */
        ghost:
          'text-[#82583B] hover:text-[#AD652E] hover:bg-[#AD652E]/10',
        /* Dark (for use on brown/modal backgrounds) */
        dark:
          'bg-[#E4E1D8] text-[#5F3C20] hover:bg-white hover:text-[#5F3C20] shadow-lg shadow-black/20',
        link: 'text-[#AD652E] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2 text-sm',
        sm: 'h-8 rounded px-4 text-xs',
        lg: 'h-13 px-10 text-base',
        xl: 'h-14 rounded-xl px-12 text-lg tracking-wide',
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
