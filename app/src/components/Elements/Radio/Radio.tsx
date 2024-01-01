interface RadioProps {
  name: string
  checked: boolean
}

export const Radio = ({ name, checked }: RadioProps) => {
  return (
    <input
      id="link-radio"
      name={name}
      type="radio"
      value=""
      className="w-4 h-4 text-primary-300 bg-white border-natural-40"
      {...(checked && { checked })}
    />
  )
}
