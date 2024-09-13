import * as React from 'react'
import { forwardRef } from 'react'

import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'
import { MdOutlineClear } from 'react-icons/md'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = 'Input'

interface InputWithClearButtonProps extends InputProps {
    onClear: () => void
}

const InputWithClearButton = forwardRef<HTMLInputElement, InputWithClearButtonProps>(
    ({ className, onClear, value, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <Input className={className} ref={ref} value={value} {...props} />
                <Button
                    type="button"
                    variant={'destructiveGhost'}
                    className={cn(
                        'absolute right-2 top-1/2 size-auto -translate-y-1/2 p-1 transition-opacity duration-100',
                        value && typeof value === 'string' && value.length !== 0
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    )}
                    onClick={onClear}
                >
                    <MdOutlineClear />
                </Button>
            </div>
        )
    }
)
InputWithClearButton.displayName = 'InputWithClearButton'

export { Input, InputWithClearButton }
