/** @jsx jsx */
import { jsx, useColorMode, Flex } from "theme-ui";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import ColorModeToggle from "./colormode-toggle";
import Navigation from "@lekoarts/gatsby-theme-minimal-blog/src/components/navigation";
import HeaderTitle from "./header-title";
import HeaderExternalLinks from "@lekoarts/gatsby-theme-minimal-blog/src/components/header-external-links";
import DarkGitImg from "../static/github.svg";
import LightGitImg from "../static/light-github.svg";
import RssImg from "../static/rss.svg";
import LightRssImg from "../static/light-rss.svg";

const Header = () => {
  const { navigation: nav } = useMinimalBlogConfig();
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  };

  return (
    <header sx={{ mb: [3, 4] }}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <HeaderTitle />
        <Flex sx={{ alignItems: `center` }}>
          <a
            sx={{
              display: `flex`,
              alignItems: `center`,
              opacity: 0.65,
              cursor: `pointer`,
              "&:hover, &:focus": { opacity: 1 },
            }}
            href="https://janxzj.com/rss.xml"
          >
            {isDark ? (
              <img sx={{ mr: [`0.6rem`, `0.8rem`] }} src={LightRssImg} alt="" />
            ) : (
              <img sx={{ mr: [`0.6rem`, `0.8rem`] }} src={RssImg} alt="" />
            )}
          </a>
          <a
            sx={{
              display: `flex`,
              alignItems: `center`,
              opacity: 0.65,
              cursor: `pointer`,
              "&:hover, &:focus": { opacity: 1 },
            }}
            href="https://github.com/xizijian"
          >
            {isDark ? (
              <img sx={{ mr: [1, 2] }} src={DarkGitImg} alt="" />
            ) : (
              <img sx={{ mr: [1, 2] }} src={LightGitImg} alt="" />
            )}
          </a>

          <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
        </Flex>
      </Flex>
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ":hover": { color: `heading` } },
          flexFlow: `wrap`,
        }}
      >
        <Navigation nav={nav} />
        <HeaderExternalLinks />
      </div>
    </header>
  );
};

export default Header;
