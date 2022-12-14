---
published: true
title: 'SWR 基本用法及实战使用'
tags: React,JavaScript
path: '/articles/useswr-overview'
date: '2022-11-22'
cover_image: ''
---

说明：本文内容主要来源于 [官方文档](https://swr.vercel.app/zh-CN)

## 写在前面
> 第一次接触useSWR要追溯到年初的米哈游面试，面试官小姐姐很温柔，在问到网络请求的时候，提问在多个请求时如果做到高效的控制时序？ 显然我所回答的答案并不是
她心目中最好的，面试结束我问她网络请求的那个问题有什么好的解决方案吗，她说你可以看看SWR，有你想要的答案


### 概览 

```jsx
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

该示例中，useSWR hook 接受一个字符串 key 和一个函数 fetcher。key 是数据的唯一标识符（通常是 API UR,**也可是数组和函数**），并传递给 fetcher。fetcher 可以是任何返回数据的异步函数，你可以使用原生的 fetch 或 Axios 之类的工具。

基于请求的状态，这个 hook 返回 2 个值：data 和 error。

### 特性 

SWR 涵盖了性能，正确性和稳定性的各个方面，以帮你建立更好的体验：

- 快速页面导航
- 间隔轮询
- 数据依赖
- 聚焦时重新验证
- 网络恢复时重新验证
- 本地缓存更新 (Optimistic UI)
- 智能错误重试
- 分页和滚动位置恢复
- React Suspense

### 浅尝一下 

在开发公司官网项目的时候用**SWR**小试牛刀了一下，官方默认使用的是fetch，个人喜好原因采用的axios，话不多说直接开撸，这里get请求就不写了，
放上点击事件的post请求：

```jsx
export const ContactMidElement: React.FC = () => {
  const { data, isValidating, mutate } = useSWR(`${globalURL}${sendEmailAPI}`);
  const notifySuc = info => toast.success(info);
  const notifyError = info => toast.error(info);
  const fetcher = useFetcher(`${globalURL}${sendIdegContactAPI}`, {
      name: `${name}${lastName}`,
      phone,
      email,
      message,
    });
    const { data } = await fetcher();
    // 直接覆盖数据
    mutate(data);
    if (data.code == "200") {
      notifySuc(
        "Your inquiry has been submitted! Thank you and we will be reviewing it soon!"
      );
    } else {
      notifyError(data.msg);
    }
};
```
useFetcher 代码如下：

```jsx
import axios from "axios";
const useFetcher = (url: string, data: any) => {
    const fetcher = () =>
    axios({
      url,
      data,
      method: "post",
    }).then(res => {
      return res
    }).catch(err => err);

    return fetcher
};

export default useFetcher;
```

简单的提交表单事件就完成了，需要注意的是用 **mutate**同步数据进行共享 