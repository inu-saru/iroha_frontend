import { Helmet } from "react-helmet-async"

interface HeadProps {
  title?: string
  description?: string
}

export const Head = ({
  title = "",
  description = ""
}: HeadProps = {}): JSX.Element => {
  return (
    <Helmet
      title={title != null ? `${title} | iroha` : undefined}
      defaultTitle="iroha"
    >
      <meta name="description" content={description} />
    </Helmet>
  )
}
