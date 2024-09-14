import mocks from '@mocks/test.json'
import { Category, Risk } from '@models/API'

interface SUCCESS_RESPONSE<Requested = unknown> {
    success: true
    data: Requested
}

interface ERROR_RESPONSE {
    success: false
    error: Error | unknown
}

type RESPONSE<Requested = unknown> = SUCCESS_RESPONSE<Requested> | ERROR_RESPONSE

class APIService {
    public async getRows(
        type: 'risks' | 'categories',
        begin: number,
        end: number,
        nameFilter: string | null,
        descriptionFilter: string | null,
        onlyUnresolved?: boolean
    ): Promise<
        RESPONSE<{
            rows: Array<typeof type extends 'risks' ? Risk : Category>
            total: number
        }>
    > {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 100000))

            let rows: Array<Risk> | Array<Category> =
                type === 'risks'
                    ? (mocks['risks'] as unknown as Array<Risk>)
                    : (mocks['categories'] as unknown as Array<Category>)

            if (nameFilter) {
                rows = rows.filter((row) => row.name.includes(nameFilter))
            }
            if (descriptionFilter) {
                rows = rows.filter((row) => row.description.includes(descriptionFilter))
            }
            if (onlyUnresolved && type === 'risks') {
                rows = rows.filter((row) => !(row as unknown as Risk)?.resolved)
            }

            return {
                success: true,
                data: {
                    rows: rows.slice(begin, end),
                    total: rows.length,
                },
            }
        } catch (error) {
            return {
                success: false,
                error,
            }
        }
    }
}

export default new APIService()
