#!/usr/bin/env -S deno run
import * as cow from "https://cdn.deno.land/cowsay/versions/1.1/raw/mod.ts";
import * as ink from "https://deno.land/x/ink/mod.ts";

const cowsay = cow.say({ text: "Welcome to my website in ✨ Deno ✨ - https://brunnerliv.io", cow: "cat2" });
console.log(cowsay);
console.log();
console.log("======= Latest Articles =======");
console.log();


console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>转载一篇知乎上的文章：抖音是如何毁掉我们的？ (2022-12-09)</ink>"));
ink.terminal.log("<i></i>");
ink.terminal.log("<blue>https://janxzj.com/articles/life-tiktok</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>深度学习 React核心知识（二） (2022-11-24)</ink>"));
ink.terminal.log("<i></i>");
ink.terminal.log("<blue>https://janxzj.com/articles/todolist-router</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>SWR 基本用法及实战使用 (2022-11-22)</ink>"));
ink.terminal.log("<i></i>");
ink.terminal.log("<blue>https://janxzj.com/articles/useswr-overview</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>《你不知道的JS》读书笔记（持续更新中） (2022-11-22)</ink>"));
ink.terminal.log("<i></i>");
ink.terminal.log("<blue>https://janxzj.com/articles/not-know-js</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>关于Git看我就够了 (2022-11-17)</ink>"));
ink.terminal.log("<i></i>");
ink.terminal.log("<blue>https://janxzj.com/articles/git-base</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>初识Node —— Egg.js入门及初始化 (2022-11-08)</ink>"));
ink.terminal.log("<i></i>");
ink.terminal.log("<blue>https://janxzj.com/articles/init-node-egg</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>深度学习 React核心知识（一） (2022-11-05)</ink>"));
ink.terminal.log("<i></i>");
ink.terminal.log("<blue>https://janxzj.com/articles/todolist-design</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>Create your first module with Deno (2020-02-21)</ink>"));
ink.terminal.log("<i>In this article, we want to have a look at how to get started with your first module using Deno. We will focus on the general structure and patterns which have emerged from the Deno community thus far.</i>");
ink.terminal.log("<blue>https://janxzj.com/articles/create-your-first-module-with-deno</blue>\n");

console.log(ink.html("<ink style='background-color: #4038a5;color: #FF7779;font:bold;'>Create an icon web font for your design system (2020-01-03)</ink>"));
ink.terminal.log("<i>Create an icon web font for your design system using Github Actions.</i>");
ink.terminal.log("<blue>https://janxzj.com/articles/icon-web-font</blue>\n");


console.log();
console.log("======== Package Downloads via npm =========");
console.log();

ink.terminal.log("<blue>1000000</blue> Downloads")
console.log()


ink.terminal.log("🐦 <blue>https://twitter.com/GiveYou_Smile/</blue> | 🐙 <blue>https://github.com/xizijian</blue> | 🖊️ <blue></blue> | 👨 <blue>https://www.linkedin.com/in/%E5%AD%90%E5%81%A5-%E5%A5%9A-33315423b/</blue>");

