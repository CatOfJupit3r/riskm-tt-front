import { cn } from '@lib/utils'
import { HTMLAttributes } from 'react'

function Skeleton({
    className,
    pulsating,
    ...props
}: {
    pulsating?: boolean
} & HTMLAttributes<HTMLDivElement>) {
    return <div className={cn(`rounded-md bg-muted ${pulsating ? 'animate-pulse' : ''}`, className)} {...props} />
}

export { Skeleton }
