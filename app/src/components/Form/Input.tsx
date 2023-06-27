import { type FieldError, type UseFormRegisterReturn } from "react-hook-form"

interface InputProps {
  type?: "text" | "email" | "password"
  className?: string
  label: string
  registration: Partial<UseFormRegisterReturn>
  error?: FieldError | undefined
}

export const Input = (props: InputProps): JSX.Element => {
  const { type = "text", label, className, registration, error } = props
  return (
    <div className={className}>
      <label className="block text-h200 text-natural-900">{label}:</label>
      <input
        type={type}
        className="block w-full text-default mt-2 px-4 py-3 text-natural-900 border border-natural-40 bg-white focus:ring-primary-100 focus:border-primary-100"
        {...registration}
      />
      <p className="pl-4 pr-2 pt-1 pb-3 font-small text-error-300">
        {error?.message}
      </p>
    </div>
  )
}
