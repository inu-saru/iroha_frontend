import { Link } from "@/components/Elements"

export const LoginFooter = (): JSX.Element => {
  return (
    <div>
      <span className="text-center text-small mt-8 mb-2 block">
        アカウントをもっていませんか？
      </span>
      <Link to="/auth/signup" className="text-center block">
        アカウント作成
      </Link>
    </div>
  )
}
