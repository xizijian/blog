/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { Link } from "gatsby"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import styled from "styled-components";

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}
const ItemTags = ({ tags }: TagsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()

  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && `  `}
          <Link sx={(t) => ({ ...t.styles?.a })} to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}>
            <Tag>{tag.name}</Tag>
          </Link>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

const Tag = styled.span`
  border-radius: 4px;
  border: 1px #5f6c80 solid;
  color: #5f6c80;
  padding: 2px 5px;
`

export default ItemTags
