import React from "react"
import styled from "styled-components"
import { sm, md } from "./breakpoints"

const ProjectSection = styled.section`
  border-radius: 8px;
  color: var(--text);
  flex: 0 50%;
  width: 100%;
  padding-right: 30px;
  margin-bottom: 8px;
  h2,
  p,
  a {
    text-decoration: none;
  }
  p {
    font-size: 1rem;
    color: var(--text);
    margin-top: 4px;
  }
`

const TitleWrapper = styled.header`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 0.2rem;
  h2 {
    margin-bottom: 4px;

    font-weight: bold;
    font-size: 1.4em;
    ${sm`
      font-size: 1.5em;
    `}
    ${md`
      font-size: 2em;
    `}
  }
  a {
    color: var(--accent);
    &:hover {
      color:var(--accent-dark);
    }
  }
`

const Project = ({ project }) => (
  <ProjectSection>
    <TitleWrapper>
      <h2>
        <a href={project.sourceCode}>{project.name}</a>
      </h2>
    </TitleWrapper>
    <p>{project.description}</p>
  </ProjectSection>
)

export default Project
