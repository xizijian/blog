import React, { useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { sm, md } from "../components/breakpoints"

import Seo from "../components/seo"
import NeonText from "../components/neon-text"

const Article = styled.article`
  padding: 1.3125rem;
  max-width: calc(100vw - 1rem);
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  ${sm`
    margin-top: 0;
  `}
  ${md`
    width: 900px;
  `}
  font-family: var(--sans-serif);

  & > div > p + p {
    margin-top: 4vmin;
  }

  pre {
    margin-left: 0 !important;
    padding: 1rem !important;
    font-size: 14px !important;
    border-radius: 0 !important;
    overflow-x: auto !important;
    margin-top: 2em !important;
    margin-bottom: 2em !important;

    ${sm`
      border-radius: 3px !important;
    `}
    ${md`
      font-size: 1em !important;
    `}
  }

  .language-text {
    font-size: 0.9em;
    margin-left: 8px;
    margin-right: 8px;
  }

  .gatsby-highlight {
    margin-top: 16px;
    margin-bottom: 16px;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
  }

  h2 {
    line-height: 1em;
    font-size: 1.8em;
    margin-top: 1em;
    font-weight: 700;
    font-weight: 600;
    font-family: var(--sans-serif);
    color: var(--title-text);
  }

  h3 {
    line-height: 2em;
    font-size: 1.5em;
    font-weight: 600;
    margin-top: 1.5em;
    font-weight: normal;
    margin-bottom: 0.5em;
    font-family: var(--sans-serif);
    color: var(--title-text);
  }

  p,
  li {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.1em;
  }

  ul {
    margin: 2em 1em;
  }

  a {
    font-size: 1em;
  }

  img {
    margin: 2em auto;
  }

  table {
    margin: 3em 0;
    font-family: var(--sans-serif);
    font-size: 1.2rem;
    line-height: 1.4em;

    th:empty {
      display: none;
    }

    tr:nth-child(odd) {
      background: rgba(0, 0, 0, 0.2);
    }

    td {
      padding: 1em;
    }

    td,
    th {
      border: 0;
    }
  }

  hr {
    width: 40px;
    border-style: dotted none none;
    border-width: 7px;
    margin: 3rem auto;
    background: none;
}
`

// const CoverImage = styled.img`
//   box-shadow: 27.1px 62.5px 125px -25px rgba(50, 50, 93, 0.5),
//     16.2px 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
//   transform: scale(1);
//   opacity: 0;
//   transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
//   margin: 32px 0 48px 0;
//   ${breakpoint("md")`
//     margin: 86px 0 126px 0;
//     min-height: 350px;
//   `};
//   &.mounted {
//     ${breakpoint("lg")`
//       transform: scale(1.2);
//     `}
//     opacity: 1;
//   }
// `
const ArticleTitle = styled.h1`
  margin-bottom: 2em;
  font-weight: normal;
  text-align: center;
`
// const ArticlePreview = styled.p`
//   margin: 8px 0;
//   font-size: 18px;
//   margin-bottom: 4em;
//   ${breakpoint("md")`
//     font-size: 22px !important;
//   `};
// `

const CommentSection = styled.div`
  margin: 2em 0 6em 0;
`

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  useEffect(() => {
    let script = document.createElement("script")
    let anchor = document.getElementById("inject-comments-for-uterances")
    script.setAttribute("src", "https://utteranc.es/client.js")
    script.setAttribute("crossorigin", "anonymous")
    script.setAttribute("async", "true")
    script.setAttribute("repo", "JanXi/articles")
    script.setAttribute("issue-term", frontmatter.title)
    script.setAttribute("theme", "github-light")
    script.setAttribute("label", "comments 💬")
    anchor.appendChild(script)
  }, [])

  // const [hasMounted, setHasMounted] = useState(false)
  // const coverImageRef = useRef(null)

  // useEffect(() => {
  //   const onLoad = () => setHasMounted(true)
  //   const coverImage = coverImageRef.current
  //   coverImage.addEventListener("load", onLoad)
  //   return () => {
  //     coverImage.removeEventListener("load", onLoad)
  //   }
  // })
  return (
    <>
      <Seo title={frontmatter.title} imageShare={frontmatter.cover_image} />
      <Article>
        <ArticleTitle>
          <NeonText text={frontmatter.title}></NeonText>
        </ArticleTitle>
        {/* <ArticlePreview>{frontmatter.description}</ArticlePreview> */}
        {/* <CoverImage
          ref={coverImageRef}
          className={hasMounted ? "mounted" : ""}
          src={frontmatter.cover_image}
          alt={`Cover of the article ${frontmatter.title}`}
        /> */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Article>
      <CommentSection id="inject-comments-for-uterances" />
    </>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        cover_image
      }
    }
  }
`
