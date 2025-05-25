import { type FieldError, Controller } from "react-hook-form"
import { SelectItem } from "../SelectItem"
import { InputField } from "./InputField"
import { useState } from "react"
import { Icon } from "../Icon"

interface OptionsProps {
  label: string
  value: string
}

interface CheckboxProps {
  registrationName: string
  label: string
  options: OptionsProps[]
  className?: string
  placeholder?: string
  error?: FieldError | undefined | any
  control: any
}

export const Checkboxes = (props: CheckboxProps): JSX.Element => {
  const { registrationName, label, options, className, control, error } = props
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <InputField label={label} error={error} className={className}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center pl-2 h-10 rounded-md bg-white border border-natural-40">
          <Icon variant="search" className="ml-1 " />
          <input
            type="text"
            placeholder="SEARCH"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            className="w-full outline-none text-natural-900 text-md placeholder-natural-50 border-0 focus:ring-0 bg-transparent"
          />
        </div>
        <Controller
          name={registrationName}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option: OptionsProps) => (
                  <SelectItem key={option.value} size="minimum">
                    <label className="flex items-center gap-2 px-4 py-3 ">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={field.value.includes(option.value)}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            e.target.checked
                              ? [...field.value, value]
                              : field.value.filter((v: string) => v !== value)
                          );
                        }}
                      />
                      {option.label}
                    </label>
                  </SelectItem>
                ))
              ) : (
                <SelectItem size="minimum">
                  <div className="px-4 py-3 text-natural-90">
                    該当なし
                  </div>
                </SelectItem>
              )}
            </div>
          )}
        />
      </div>
    </InputField>
  )
}
