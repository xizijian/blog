import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Seo from "../components/seo";
import Content from "../components/content";
import Talk from "../components/talk";

const TalkList = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0px 0;
`;

const Title = styled.h2`
  color: var(--neon-text-color);
  font-size: 1.5em;
  font-weight: 700;
  margin-top: 1.5em;
  padding: 0 20px;
`;

const Contentp = styled.p`
  padding: 0 20px;
`;

const Contenth3 = styled.h3`
  padding: 0 20px;
`;

const Talks = ({ data }) => {
  const talks = data.site.siteMetadata.talks;

  return (
    <>
      <Seo title="About" />
      <Content>
        <Title>关于我</Title>

        <Contentp>现居上海，搬砖为生，看书、逗猫、编码、打游戏为乐。</Contentp>
        <Contentp>
          喜欢看书，最近几年看得不多；喜欢看电影，最近几年看得少了；喜欢跑步，最近几年几乎没跑了。
          T_T
        </Contentp>
        <Contentp>
          自认为是终身学习者，只是经常忘了学习。最主要的原因是三分钟热度，不过后来我知道了一个词叫
          <a href="https://antfu.me/posts/about-yak-shaving-zh">Yak Shaving</a>,
          于是我觉得这也没什么不好。如果缺点改正不了，那就把它当成是优点，会好很多。
        </Contentp>

        <Title>建站初衷</Title>
        <Contentp>
          第一次是在19年,
          惰性让我提不起斗志长期维护下去导致域名到期，一直放在一旁起灰。
          这次的建站灵感来源于小伙伴 <a href="https://ligdy.com/">ligdy</a>,
          养成了逛大神博客的习惯， 突然间觉得原来世界这么大o(╥﹏╥)o。
          接下来的时间希望可以做一些有趣的东西，遇到有趣的人，技术上的心得和生活中的点点滴滴都会认真记录下来。
        </Contentp>

        <Title>我常用的工具</Title>
        <Contenth3>软件</Contenth3>
        <Contentp>
          我使用 VSCode 来编程(三年前开发移动端的时候用Xcode和webStorm), Typora
          做笔记。 在网上找资源时，首选 Google 搜索，GitHub 和 StackOverflow
          自不必少。 没有Google的情况下Bing也是不错的选择。 日常使用移动应用 app
          较多的有：微信、微信读书、网易云音乐、QQ
          Music。社交媒体常用的有：微信、豆瓣。偶尔会看
          知乎、哔哩哔哩、Youtube（还有该死的Tiktok T_T）。
        </Contentp>
        <Contenth3>硬件</Contenth3>
        <Contentp>
          MacBook Pro（16英寸，2021年版）, 随身携带的有 iPhone 13 Pro, Apple
          Watch Series 6 以及 AirPods2
          三件套，不得不说苹果的生态做的很好。但我更加期待HUAWEI的崛起
          ヾ(◍°∇°◍)ﾉﾞ
        </Contentp>
        <Title>联系方式</Title>
        <Contentp>
          可以找到我的地方: <a href="https://github.com/xizijian">GitHub</a>,{" "}
          <a href="https://m.weibo.cn/u/5480665762?uid=5480665762&luicode=10000011&lfid=2304135480665762_-_WEIBO_SECOND_PROFILE_WEIBO">
            微博
          </a>
          , 邮箱 13134401188@163.com
        </Contentp>
        {/* <TalkList>
          {(talks || []).map((talk, index) => (
            <Talk key={"Talk" + index} talk={talk}></Talk>
          ))}
        </TalkList> */}
      </Content>
    </>
  );
};

export default Talks;
export const pageQuery = graphql`
  query TalksQuery {
    site {
      siteMetadata {
        talks {
          title
          description
          youtube
          slides
          date
        }
      }
    }
  }
`;
