import { useNavigate } from "react-router-dom"

import { Layout } from "../components/Layout"
import { LoginFooter } from "../components/LoginFooter"
import { LoginForm } from "../components/LoginForm"

export const Login = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <>
      <Layout title="Login">
        <LoginForm
          onSuccess={() => {
            navigate("/app")
          }}
        />
      </Layout>
      <LoginFooter />
    </>
  )
}
