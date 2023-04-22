import { Button } from "@/components/Elements/Button"
import { useNavigate } from "react-router-dom"

export const Landing = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <>
      <h1>Hellow world!</h1>
      <Button
        onClick={() => {
          navigate("./auth/login")
        }}
      >
        login
      </Button>
    </>
  )
}
