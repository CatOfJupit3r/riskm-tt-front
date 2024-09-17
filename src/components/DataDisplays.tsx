import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@components/ui/alert-dialog'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Skeleton } from '@components/ui/skeleton'
import { TableCell, TableRow } from '@components/ui/table'
import { Textarea } from '@components/ui/textarea'
import { useFiltersContext } from '@context/FiltersContext'
import {
    useChangeRiskStatusMutation,
    useRemoveCategoryMutation,
    useRemoveRiskMutation,
    useUpdateCategoryMutation,
    useUpdateRiskMutation,
} from '@hooks/useGraphQLMutations'
import { useToast } from '@hooks/useToast'
import { Category, Risk } from '@models/API'
import { ReactNode, useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { IoTrashBinOutline } from 'react-icons/io5'

const EditableNameRow = ({
    input,
    updateFunction,
    className,
}: {
    input: Risk | Category
    updateFunction: (newName: string) => void
    className?: string
}) => {
    const { filters } = useFiltersContext()
    const [mode, setMode] = useState<'view' | 'edit'>('view')
    const [newName, setNewName] = useState<string | null>(input.name)

    return (
        <TableCell
            className={className}
            onClick={() => {
                const selection = window.getSelection()
                if (selection && selection.toString().length > 0) {
                    return
                }
                setNewName(input.name)
                setMode('edit')
            }}
            onBlur={() => {
                if (mode !== 'edit') {
                    return
                }
                if (newName !== null && newName !== input.name) {
                    updateFunction(newName)
                }
                setMode('view')
            }}
            onKeyDown={(event) => {
                if (mode !== 'edit') {
                    return
                }
                if (event.key === 'Enter') {
                    if (newName !== null) {
                        updateFunction(newName)
                    }
                    setMode('view')
                } else if (event.key === 'Escape') {
                    setNewName(null)
                    setMode('view')
                }
            }}
        >
            {mode === 'view' ? (
                <Highlighter
                    searchWords={[filters?.name || '']}
                    textToHighlight={input.name}
                    highlightClassName={'bg-primary text-white'}
                />
            ) : (
                <Textarea
                    value={newName || ''}
                    placeholder={input.name}
                    className={'max-h-96 w-[102%]'}
                    rows={10}
                    autoFocus
                    onFocus={(event) => {
                        const value = event.target.value
                        event.target.value = ''
                        event.target.value = value
                    }}
                    onChange={(event) => {
                        if (event.target.value !== '' && event.target.value !== input.name) {
                            setNewName(event.target.value)
                        } else {
                            setNewName(null)
                        }
                    }}
                />
            )}
        </TableCell>
    )
}

const EditableDescriptionRow = ({
    input,
    updateFunction,
    className,
}: {
    input: Risk | Category
    updateFunction: (newDescription: string) => void
    className?: string
}) => {
    const { filters } = useFiltersContext()
    const [mode, setMode] = useState<'view' | 'edit'>('view')
    const [newDescription, setNewDescription] = useState<string | null>(input.description)

    return (
        <TableCell
            className={className}
            onClick={() => {
                const selection = window.getSelection()
                if (selection && selection.toString().length > 0) {
                    return
                }
                setNewDescription(input.description)
                setMode('edit')
            }}
            onBlur={() => {
                if (mode !== 'edit') {
                    return
                }
                if (newDescription !== null && newDescription !== input.description) {
                    updateFunction(newDescription)
                }
                setMode('view')
            }}
            onKeyDown={(event) => {
                if (mode !== 'edit') {
                    return
                }
                if (event.key === 'Enter') {
                    if (newDescription !== null) {
                        updateFunction(newDescription)
                    }
                    setMode('view')
                } else if (event.key === 'Escape') {
                    setNewDescription(null)
                    setMode('view')
                }
            }}
        >
            {mode === 'view' ? (
                <Highlighter
                    searchWords={[filters?.description || '']}
                    textToHighlight={input.description}
                    highlightClassName={'bg-primary text-white'}
                />
            ) : (
                <Textarea
                    value={newDescription || ''}
                    placeholder={input.description}
                    className={'max-h-96 w-[102%]'}
                    rows={10}
                    autoFocus
                    onFocus={(event) => {
                        const value = event.target.value
                        event.target.value = ''
                        event.target.value = value
                    }}
                    onChange={(event) => {
                        if (event.target.value !== '' && event.target.value !== input.description) {
                            setNewDescription(event.target.value)
                        } else {
                            setNewDescription(null)
                        }
                    }}
                />
            )}
        </TableCell>
    )
}

const RemoveDataAlertDialog = ({ onConfirm, children }: { onConfirm: () => void; children: ReactNode }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <TableCell>
                    <Button variant={'destructiveGhost'} size={'icon'} className={'border-primary'}>
                        <IoTrashBinOutline />
                    </Button>
                </TableCell>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>{children}</AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export const RiskRowInTable = ({ input }: { input: Risk }) => {
    const { toast, errorToast } = useToast()

    const [removeRisk] = useRemoveRiskMutation()
    const [updateRisk] = useUpdateRiskMutation()
    const [updateRiskStatus] = useChangeRiskStatusMutation()

    return (
        <TableRow>
            <EditableNameRow
                input={input}
                updateFunction={(newName) => {
                    updateRisk({
                        variables: {
                            _id: input._id,
                            name: newName,
                        },
                    })
                        .then(({ data }) => {
                            if (!data || !data.updateRisk) {
                                errorToast({
                                    title: 'Error',
                                    description: 'An error occurred while updating the risk',
                                })
                                return
                            }
                            toast({
                                title: 'Risk updated',
                                description: (
                                    <p>
                                        Name of risk <strong>{input.name}</strong> has been updated successfully to{' '}
                                        <strong>{data.updateRisk.name}</strong>
                                    </p>
                                ),
                            })
                        })
                        .catch((error) => {
                            errorToast({
                                title: 'Error',
                                description: error.message,
                            })
                        })
                }}
                className={'w-36 items-baseline break-words max-md:w-auto'}
            />
            <EditableDescriptionRow
                input={input}
                className={'break-words text-justify'}
                updateFunction={(newDescription) => {
                    updateRisk({
                        variables: {
                            _id: input._id,
                            description: newDescription,
                        },
                    })
                        .then(({ data }) => {
                            if (!data || !data.updateRisk) {
                                errorToast({
                                    title: 'Error',
                                    description: 'An error occurred while updating the risk',
                                })
                                return
                            }
                            toast({
                                title: 'Risk updated',
                                description: (
                                    <p>
                                        Description of <strong>{input.name}</strong> was changed to:{' '}
                                        <strong>{data.updateRisk.description}</strong>
                                    </p>
                                ),
                            })
                        })
                        .catch((error) => {
                            errorToast({
                                title: 'Error',
                                description: error.message,
                            })
                        })
                }}
            />
            <TableCell
                onClick={() => {
                    updateRiskStatus({
                        variables: {
                            _id: input._id,
                            resolved: !input.resolved,
                        },
                    })
                        .then(({ data }) => {
                            if (!data || !data.changeRiskStatus) {
                                errorToast({
                                    title: 'Error',
                                    description: 'An error occurred while updating the risk status',
                                })
                                return
                            }
                            toast({
                                title: 'Risk status updated',
                                description: (
                                    <p>
                                        Status of risk <strong>{input.name}</strong> has been updated successfully
                                    </p>
                                ),
                            })
                        })
                        .catch((error) => {
                            errorToast({
                                title: 'Error',
                                description: error.message,
                            })
                        })
                }}
            >
                <Badge
                    variant={input.resolved ? 'default' : 'destructive'}
                    className={'flex w-20 items-center justify-center text-xs transition-colors cursor-pointer'}
                >
                    {input.resolved ? 'Resolved' : 'Unresolved'}
                </Badge>
            </TableCell>
            <TableCell className={'w-28 break-all'}>{input.category.name}</TableCell>
            <TableCell className={'w-36 break-all'}>{input.createdBy}</TableCell>
            <RemoveDataAlertDialog
                onConfirm={() => {
                    removeRisk({
                        variables: {
                            _id: input._id,
                        },
                    })
                        .then(({ data }) => {
                            if (!data || !data.removeRisk) {
                                errorToast({
                                    title: 'Error',
                                    description: 'An error occurred while deleting the risk',
                                })
                                return
                            }
                            toast({
                                title: 'Risk deleted',
                                description: `Risk ${input.name} has been deleted successfully`,
                            })
                        })
                        .catch((error) => {
                            errorToast({
                                title: 'Error',
                                description: error.message,
                            })
                        })
                }}
            >
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    <p>This action cannot be undone. This will permanently delete the risk with the name</p>
                    <br />
                    <p>
                        You are about to delete the risk with the name <span className={'font-bold'}>{input.name}</span>
                    </p>
                </AlertDialogDescription>
            </RemoveDataAlertDialog>
        </TableRow>
    )
}

export const PseudoRiskRowInTable = ({ pulsating }: { pulsating?: boolean }) => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-60'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-20'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'size-10'} />
            </TableCell>
        </TableRow>
    )
}

export const CategoryRowInTable = ({ input }: { input: Category }) => {
    const [removeCategory] = useRemoveCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const { toast, errorToast } = useToast()

    return (
        <TableRow>
            <EditableNameRow
                input={input}
                updateFunction={(newName) => {
                    updateCategory({
                        variables: {
                            _id: input._id,
                            name: newName,
                        },
                    })
                        .then(({ data }) => {
                            if (!data || !data.updateCategory) {
                                errorToast({
                                    title: 'Error',
                                    description: 'An error occurred while updating the risk',
                                })
                                return
                            }
                            toast({
                                title: 'Risk updated',
                                description: `Risk ${input.name} has been updated successfully to ${data.updateCategory.name}`,
                            })
                        })
                        .catch((error) => {
                            errorToast({
                                title: 'Error',
                                description: error.message,
                            })
                        })
                }}
                className={'w-36 items-baseline break-words max-md:w-auto'}
            />
            <EditableDescriptionRow
                input={input}
                updateFunction={(newDescription) => {
                    updateCategory({
                        variables: {
                            _id: input._id,
                            description: newDescription,
                        },
                    })
                        .then(({ data }) => {
                            if (!data || !data.updateCategory) {
                                errorToast({
                                    title: 'Error',
                                    description: 'An error occurred while updating the risk',
                                })
                                return
                            }
                            toast({
                                title: 'Risk updated',
                                description: `Description of ${input.name} was changed to: ${data.updateCategory.description}`,
                            })
                        })
                        .catch((error) => {
                            errorToast({
                                title: 'Error',
                                description: error.message,
                            })
                        })
                }}
                className={'break-words text-justify'}
            />
            <TableCell>{input.createdBy}</TableCell>
            <RemoveDataAlertDialog
                onConfirm={() => {
                    removeCategory({
                        variables: {
                            _id: input._id,
                        },
                    })
                        .then(({ data }) => {
                            if (!data || !data.removeCategory) {
                                errorToast({
                                    title: 'Error',
                                    description: 'An error occurred while deleting the category',
                                })
                                return
                            }
                            toast({
                                title: 'Category deleted',
                                description: `Category ${input.name} has been deleted successfully`,
                            })
                        })
                        .catch((error) => {
                            errorToast({
                                title: 'Error',
                                description: error.message,
                            })
                        })
                }}
            >
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    <p>This action cannot be undone. This will permanently delete the category with the name</p>
                    <br />
                    <p>
                        You are about to delete the category with the name{' '}
                        <span className={'font-bold'}>{input.name}</span>
                    </p>
                </AlertDialogDescription>
            </RemoveDataAlertDialog>
        </TableRow>
    )
}

export const PseudoCategoryRowInTable = ({ pulsating }: { pulsating?: boolean }) => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-96'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'size-10'} />
            </TableCell>
        </TableRow>
    )
}
