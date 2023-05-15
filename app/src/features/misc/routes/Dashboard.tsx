import { Button } from "@/components/Elements/Button"
import { ContentLayout } from "@/components/Layout"
import { useLogout } from "@/lib/auth"

export const Dashboard = (): JSX.Element => {
  const logout = useLogout({})

  return (
    <>
      <ContentLayout title="ダッシュボード">
        <h1>dashboard</h1>
        <Button
          disabled={logout.isLoading}
          onClick={() => {
            logout.mutate({})
          }}
        >
          logout
        </Button>
      </ContentLayout>
    </>
  )
}
