import { useQuery } from '@apollo/client'
import { Button } from '@components/ui/button'
import { InputWithClearButton } from '@components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetTitle, SheetTrigger } from '@components/ui/sheet'
import { Textarea } from '@components/ui/textarea'
import { GetAllCategoriesQuery } from '@graphql/queries'
import { useCreateCategoryMutation, useCreateRiskMutation } from '@hooks/useGraphQLMutations'
import { useToast } from '@hooks/useToast'
import { CategoryInput, RiskInput } from '@models/API'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const DivAsButton =
    'flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-md bg-primary p-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

export const AddRiskInTable = () => {
    const [newRisk, setNewRisk] = useState<RiskInput>({
        name: '',
        description: '',
        categoryId: null,
    })
    const { toast } = useToast()

    const [addRisk, { loading: loadingMutation }] = useCreateRiskMutation()
    const { data: dataQuery, loading: loadingQuery, error: errorQuery } = useQuery(GetAllCategoriesQuery)

    return (
        <Sheet>
            <SheetTrigger>
                <div className={DivAsButton}>
                    <FaPlus />
                    Add new risk
                </div>
            </SheetTrigger>
            <SheetContent className={'flex flex-col gap-4'}>
                <SheetTitle className={'text-lg font-semibold text-foreground'}>Add new risk</SheetTitle>
                <SheetDescription>
                    Fill in the form below to add a new risk to the database. Make sure to fill in all the fields
                    correctly.
                </SheetDescription>
                <div className={'flex flex-col gap-2'}>
                    <div className={'flex flex-col gap-1'}>
                        <label className={'text-sm text-muted-foreground'}>Name</label>
                        <InputWithClearButton
                            value={newRisk.name}
                            placeholder={'Enter risk name...'}
                            onChange={(event) => {
                                setNewRisk({ ...newRisk, name: event.target.value })
                            }}
                            onClear={() => {
                                setNewRisk({ ...newRisk, name: '' })
                            }}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'text-sm text-muted-foreground'}>Description</label>
                        <Textarea
                            value={newRisk.description}
                            placeholder={'Enter risk description...'}
                            rows={5}
                            className={'max-h-96'}
                            onChange={(event) => {
                                setNewRisk({ ...newRisk, description: event.target.value })
                            }}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'text-sm text-muted-foreground'}>Category</label>
                        {loadingQuery ? (
                            <Select>
                                <SelectTrigger>
                                    <p>Loading...</p>
                                </SelectTrigger>
                            </Select>
                        ) : errorQuery ? (
                            <Select>
                                <SelectTrigger>
                                    <p>Error</p>
                                </SelectTrigger>
                            </Select>
                        ) : (
                            <Select
                                value={newRisk.categoryId ?? ''}
                                onValueChange={(value) => {
                                    if (value === '') {
                                        setNewRisk({ ...newRisk, categoryId: null })
                                        return
                                    }
                                    setNewRisk({ ...newRisk, categoryId: value })
                                }}
                            >
                                <SelectTrigger>
                                    {dataQuery?.categories.filtered.find(
                                        (category) => category._id === newRisk.categoryId
                                    )?.name ?? 'Select category'}
                                </SelectTrigger>
                                <SelectContent>
                                    {dataQuery?.categories.filtered.map((category) => (
                                        <SelectItem value={category._id} key={category._id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>
                <SheetFooter>
                    <Button
                        onClick={() => {
                            addRisk({
                                variables: {
                                    name: newRisk.name,
                                    description: newRisk.description,
                                    categoryId: newRisk.categoryId || '',
                                },
                            })
                                .then(({ data }) => {
                                    if (!data || data.createRisk === null) {
                                        toast({
                                            title: 'Error',
                                            description: 'Risk seems to not have been added for unknown reasons',
                                            variant: 'destructive',
                                        })
                                        return
                                    }
                                    const { name } = data.createRisk
                                    toast({
                                        title: 'Success',
                                        description: (
                                            <p>
                                                Risk <strong>{name}</strong> added successfully
                                            </p>
                                        ),
                                        variant: 'default',
                                    })
                                })
                                .catch((error) => {
                                    console.log(error)
                                    toast({
                                        title: 'Error',
                                        description: error?.message ?? 'Unknown error happened while adding risk',
                                        variant: 'destructive',
                                    })
                                })
                        }}
                        disabled={
                            loadingMutation ||
                            newRisk.name.length === 0 ||
                            newRisk.description.length === 0 ||
                            newRisk.categoryId === null
                        }
                    >
                        Add risk
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export const AddCategoryInTable = () => {
    const [newCategory, setNewCategory] = useState<CategoryInput>({ name: '', description: '' })
    const { toast } = useToast()

    const [addCategory, { loading: loadingMutation }] = useCreateCategoryMutation()

    return (
        <Sheet>
            <SheetTrigger>
                <div className={DivAsButton}>
                    <FaPlus />
                    Add new category
                </div>
            </SheetTrigger>
            <SheetContent className={'flex flex-col gap-4'}>
                <SheetTitle className={'text-lg font-semibold text-foreground'}>Add new category</SheetTitle>
                <SheetDescription>
                    Fill in the form below to add a new category to the database. Make sure to fill in all the fields
                    correctly.
                </SheetDescription>
                <div className={'flex flex-col gap-2'}>
                    <div className={'flex flex-col gap-1'}>
                        <label className={'text-sm text-muted-foreground'}>Name</label>
                        <InputWithClearButton
                            value={newCategory.name}
                            placeholder={'Enter category name...'}
                            onChange={(event) => {
                                setNewCategory({ ...newCategory, name: event.target.value })
                            }}
                            onClear={() => {
                                setNewCategory({ ...newCategory, name: '' })
                            }}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'text-sm text-muted-foreground'}>Description</label>
                        <Textarea
                            value={newCategory.description}
                            placeholder={'Enter category description...'}
                            rows={5}
                            className={'max-h-96'}
                            onChange={(event) => {
                                setNewCategory({ ...newCategory, description: event.target.value })
                            }}
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button
                        onClick={() => {
                            addCategory({
                                variables: {
                                    name: newCategory.name,
                                    description: newCategory.description,
                                },
                            })
                                .then(({ data }) => {
                                    if (!data || data.createCategory === null) {
                                        toast({
                                            title: 'Error',
                                            description: 'Category not added for unknown reasons',
                                            variant: 'destructive',
                                        })
                                        return
                                    }
                                    const { name } = data.createCategory
                                    toast({
                                        title: 'Success',
                                        description: `Category ${name} added successfully`,
                                        variant: 'default',
                                    })
                                })
                                .catch((error) => {
                                    console.log(error)
                                    toast({
                                        title: 'Error',
                                        description: error?.message ?? 'Unknown error happened while adding category',
                                        variant: 'destructive',
                                    })
                                })
                        }}
                        disabled={
                            loadingMutation || newCategory.name.length === 0 || newCategory.description.length === 0
                        }
                    >
                        Add category
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
