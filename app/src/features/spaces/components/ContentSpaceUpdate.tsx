import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import { ContentWithSubContentLayout } from "../../../components/Layout/ContentWithSubContentLayout"
import { Input, Checkboxes, Button, IconButton, Icon, UnSelectItem, DeletableSelectItem, InputField, Spinner } from "@/components/Elements"

import { useUpdateSpace } from "../api/updateSpace"
import { useUrlParams } from "@/lib/useUrlParams"
import { useSpace, getSpace } from "../api/getSpace"
import { getSpaces } from "../api/getSpaces"

const schema = z.object({
  name: z.string().min(1, "入力してください。"),
  language_types: z.array(z.string()).min(1, "少なくとも1つ選択してください"),
})

export const ContentSpaceUpdate = (): JSX.Element => {
  const { spaceId, config } = useUrlParams()
  const spaceQuery = useSpace({ spaceId })

  const updateSpaceMutation = useUpdateSpace({
    config
  })

  const [subContentKey, setSubContentKey] = useState<string | null>('language_types')
  const {
    register,
    handleSubmit,
    formState,
    control,
    getValues,
    setValue,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      language_types: [],
    },
  })

  useEffect(() => {
    if (spaceQuery.data) {
      reset({
        name: spaceQuery.data.name,
        language_types: spaceQuery.data.language_types || []
      })
    }
  }, [spaceQuery.data, reset])

  const deleteLanguageType = (type: string): void => {
    const currentTypes = getValues('language_types')
    const newTypes = currentTypes.filter((v) => v !== type)
    setValue('language_types', newTypes)
  }

  const onSubmit = async (data: any): Promise<void> => {
    await updateSpaceMutation.mutateAsync({
      data,
      resourceId: spaceId
    })
    await getSpace({ spaceId })
    await getSpaces({ page: 1 })
  }

  const constantLanguages = [
    {
      label: 'English',
      value: 'en'
    },
    {
      label: 'Japanese',
      value: 'ja'
    }
  ]

  interface OptionsProps {
    label: string
    value: string
  }

  const fetchConstantsByKeys = (keys: string[]): OptionsProps[] => {
    return keys
      .map(key => constantLanguages.find(language => language.value === key))
      .filter((item): item is OptionsProps => item !== undefined && item !== null)
  }

  if (spaceQuery.isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    )
  }

  return (
    <ContentWithSubContentLayout subContentKey={subContentKey} setSubContentKey={setSubContentKey}>
      <div key="content" className="p-8">
        <h1 className="text-h400 tex-natural-900 mb-8">スペース編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} schema={schema}>
          <Input
            type="text"
            label="名前"
            error={formState.errors.name}
            registration={register("name")}
            placeholder={"入力してください"}
          />

          <InputField 
            label="言語"
            error={formState.errors.language_types}
            className="mt-8"
          >
            <div className="flex flex-col gap-2">
              {watch("language_types").length === 0
                ? <UnSelectItem>未選択</UnSelectItem>
                : fetchConstantsByKeys(watch("language_types")).map((languageType) => (
                    <DeletableSelectItem 
                      key={languageType.value} 
                      deleteItem={() => { deleteLanguageType(languageType.value) }}
                    >
                      {languageType.label}
                    </DeletableSelectItem>
                  ))
              }
            </div>
          </InputField>
          <div className="flex justify-end">
            <IconButton 
              onClick={() => {setSubContentKey('language_types')}} 
              icon={<Icon variant={'openDetail'} />} 
              variant={subContentKey === 'language_types' ? 'disabled' : 'active'} 
            />
          </div>
            
          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              isLoading={updateSpaceMutation.isLoading}
            >
              更新
            </Button>
          </div>
        </form>
      </div>

      <div key="language_types">
        <div className="p-2 h-10 bg-white border-b border-natural-40">
          <div onClick={()=>{setSubContentKey(null)}}>
            <Icon className="float-left mr-2" bgColor="white" variant="close" />
          </div>
        </div>
        <div className="p-8">
          <Checkboxes 
            label = "言語オプション "
            registrationName="language_types"
            options = {constantLanguages}
            control={control}
          />
        </div>
      </div>
    </ContentWithSubContentLayout>
  )
}
