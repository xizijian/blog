import type { PageProps } from "gatsby"
import * as React from "react"
import  { Head, MBPostProps } from "@lekoarts/gatsby-theme-minimal-blog/src/components/post"
import Post from "../gatsby-theme-minimal-blog/components/post"
export default function MinimalBlogCorePost({ ...props }: PageProps<MBPostProps>) {
  return <Post {...props} />
}

export { Head }
