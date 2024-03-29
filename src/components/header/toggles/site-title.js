import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";
export const textAnimate = keyframes`
  0%{
    clip-path: polygon(0% 62%, 14% 55%, 24% 51%, 32% 51%, 41% 56%, 50% 59%, 60% 59%, 69% 55%, 76% 49%, 84% 48%, 93% 50%, 100% 54%, 100% 100%, 0 100%);
  }
  50%{
    clip-path: polygon(0% 62%, 10% 62%, 23% 68%, 36% 68%, 44% 64%, 50% 59%, 59% 54%, 67% 55%, 74% 59%, 86% 62%, 94% 61%, 100% 54%, 100% 100%, 0 100%);
  }
  100%{
    clip-path: polygon(0% 62%, 14% 55%, 24% 51%, 32% 51%, 41% 56%, 50% 59%, 60% 59%, 69% 55%, 76% 49%, 84% 48%, 93% 50%, 100% 54%, 100% 100%, 0 100%);
  }
`;
export const WaveText = styled.div`
  font-size: 2em;
  -webkit-text-stroke: #4361ee 2px;
  color: transparent;
  position: absolute;
  top: 0px;
  @media (max-width: 640px) {
    font-size: 1.5rem;
    top: 3px;
  }
`;

export const Wave = styled.div`
  font-size: 2em;
  position: absolute;
  color: #4361ee;
  animation: ${textAnimate} 3s ease-in-out infinite;
  top: 0px;
  @media (max-width: 640px) {
    font-size: 1.5rem;
    top: 3px;
  }
`;

const Panel = styled.div`
  position: absolute;
  top: 1.3em;
  left: 2em;
  width: 200px;
  z-index: 100;
  @media (max-width: 640px) {
    left: 1.5em;
    top: 1.5em;
  }
`;

const Warpper = styled.div`
  a{
    font-weight:500;
  }
`

const SiteTitle = () => {
  return (
    <Warpper>
      <Link to="/">
        <Panel>
          <WaveText>JanXi | Blog</WaveText>
          <Wave>JanXi | Blog</Wave>
        </Panel>
      </Link>
    </Warpper>
  );
};

export default SiteTitle;
