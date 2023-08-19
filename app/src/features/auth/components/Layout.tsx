import * as React from "react"

// import logo from "@/assets/logo.svg"
import { Base, Head } from "@/components/Elements"

interface LayoutProps {
  children: React.ReactNode
  title: string
}

export const Layout = ({ children, title }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <div className="flex justify-center mt-16">
        <h1 className="text-h500 text-primary-300">logo</h1>
      </div>

      <Base className="m-auto mt-8 w-[458px]">{children}</Base>
    </>
  )
}
