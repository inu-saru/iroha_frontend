import { Layout } from "../components/Layout"
import { LoginForm } from "../components/LoginForm"

export const Login = (): JSX.Element => {
  return (
    <Layout title="Login">
      <LoginForm />
    </Layout>
  )
}
