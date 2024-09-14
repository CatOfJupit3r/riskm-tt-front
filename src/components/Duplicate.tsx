import { Fragment, ReactNode } from 'react'

const Duplicate = ({ times, children }: { times: number, children: ReactNode }) => {
    return <>
        {
            Array.from({ length: times }).map((_, i) => (
                <Fragment key={i}>{children}</Fragment>
            ))
        }
    </>
}

export default Duplicate
