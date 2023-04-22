import { Button } from "@/components/Elements/Button"
import { useLogout } from "@/lib/auth"

export const Dashboard = (): JSX.Element => {
  const logout = useLogout({})

  return (
    <>
      <h1>dashboard</h1>
      <Button
        disabled={logout.isLoading}
        onClick={() => {
          logout.mutate({})
        }}
      >
        logout
      </Button>
    </>
  )
}
