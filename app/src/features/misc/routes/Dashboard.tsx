import { Button } from "@/components/Elements/Button"
import { ContentLayout } from "@/components/Layout"
import { Nav } from "@/features/nav"
import { useLogout } from "@/lib/auth"

export const Dashboard = (): JSX.Element => {
  const logout = useLogout({})

  return (
    <>
      <ContentLayout title="ダッシュボード" nav={<Nav />}>
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
