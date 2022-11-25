/** @jsx jsx */
import { Link } from "gatsby";
import { jsx } from "theme-ui";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import styled, { keyframes } from "styled-components";

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();
  const { basePath } = useMinimalBlogConfig();
  return (
    <Link
      to={replaceSlashes(`/${basePath}`)}
      aria-label={`${siteTitle} - Back to home`}
      sx={{ textDecoration: `none` }}
    >
        <WaveText>
          {siteTitle}
        </WaveText>
        <Wave>{siteTitle}</Wave>
    </Link>
  );
};

export default HeaderTitle;

const textAnimate = keyframes`
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
const WaveText = styled.div`
  font-size: 3em;
  -webkit-text-stroke: #4361ee 2px;
  color: transparent;
  position: absolute;
  top:0px;
  @media (max-width: 640px) {
    font-size: 2em;
  }
`;

const Wave = styled.div`
  font-size: 3em;
  position: absolute;
  color: #4361ee;
  animation: ${textAnimate} 3s ease-in-out infinite;
  top:0px;
  @media (max-width: 640px) {
    font-size: 2em;
  }
`;
