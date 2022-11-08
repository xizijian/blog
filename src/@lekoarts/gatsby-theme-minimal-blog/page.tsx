import type { PageProps } from "gatsby"
import * as React from "react"
import Page, { Head, MBPageProps } from "@lekoarts/gatsby-theme-minimal-blog/src/components/page"

export default function MinimalBlogCorePage({ ...props }: PageProps<MBPageProps>) {
  return <Page {...props} />
}

export { Head }
