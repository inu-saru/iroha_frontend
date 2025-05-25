import React from 'react'
import { type FieldError } from 'react-hook-form'
interface InputProps {
  label: string
  className?: string
  error?: FieldError | undefined | any
  children?: React.ReactNode
}

export const InputField = (props: InputProps): JSX.Element => {
  const { label, className, error, children } = props
  return (
    <div className={className}>
      <label className="block text-h200 text-natural-900 mb-2">{label}:</label>
      {children}
      <p className="pl-4 pr-2 pt-1 pb-3 font-small text-error-300">
        {error?.message}
      </p>
    </div>
  )
}
