import{_ as i,c as t,j as e,a as l,G as s,w as r,B as o,o as d}from"./chunks/framework.BtOjZnwA.js";const f=JSON.parse('{"title":"Basic Markdown Formatting","description":"","frontmatter":{"date":"2022-08-10T00:00:00.000Z","title":"Basic Markdown Formatting","category":"Tutorial","tags":"vue"},"headers":[],"relativePath":"blog/posts/post1.md","filePath":"blog/posts/post1.md"}'),h={name:"blog/posts/post1.md"};function u(c,n,p,m,g,k){const a=o("PostDetail");return d(),t("div",null,[n[1]||(n[1]=e("p",null,[l("The Ultimate Guide to Markdown. "),e("strong",null,"This will also be bold")],-1)),n[2]||(n[2]=e("hr",null,null,-1)),s(a,null,{default:r(()=>n[0]||(n[0]=[e("h2",{id:"markdown-formatting",tabindex:"-1"},[l("Markdown Formatting "),e("a",{class:"header-anchor",href:"#markdown-formatting","aria-label":'Permalink to "Markdown Formatting"'},"​")],-1),e("h3",{id:"headings",tabindex:"-1"},[l("Headings "),e("a",{class:"header-anchor",href:"#headings","aria-label":'Permalink to "Headings"'},"​")],-1),e("pre",null,[e("code",null,`# This is an <h1> tag
## This is an <h2> tag
### This is an <h3> tag
#### This is an <h4> tag
##### This is an <h5> tag
###### This is an <h6> tag
`)],-1),e("h3",{id:"emphasis",tabindex:"-1"},[l("Emphasis "),e("a",{class:"header-anchor",href:"#emphasis","aria-label":'Permalink to "Emphasis"'},"​")],-1),e("pre",null,[e("code",null,`*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_
`)],-1),e("p",null,"Result:",-1),e("p",null,[e("em",null,"This text will be italic")],-1),e("p",null,[e("em",null,"This will also be italic")],-1),e("p",null,[e("strong",null,"This text will be bold")],-1),e("p",null,[e("strong",null,"This will also be bold")],-1),e("p",null,[e("em",null,[l("You "),e("strong",null,"can"),l(" combine them")])],-1),e("h3",{id:"lists",tabindex:"-1"},[l("Lists "),e("a",{class:"header-anchor",href:"#lists","aria-label":'Permalink to "Lists"'},"​")],-1),e("p",null,[e("strong",null,"Inordered:")],-1),e("pre",null,[e("code",null,`* Milk
* Bread
    * Wholegrain
* Butter
`)],-1),e("p",null,"Result:",-1),e("ul",null,[e("li",null,"Milk"),e("li",null,[l("Bread "),e("ul",null,[e("li",null,"Wholegrain")])]),e("li",null,"Butter")],-1),e("p",null,[e("strong",null,"Ordered:")],-1),e("pre",null,[e("code",null,`1. Tidy the kitchen  
2. Prepare ingredients  
3. Cook delicious things
`)],-1),e("p",null,"Result:",-1),e("ol",null,[e("li",null,"Tidy the kitchen"),e("li",null,"Prepare ingredients"),e("li",null,"Cook delicious things")],-1),e("h3",{id:"images",tabindex:"-1"},[l("Images "),e("a",{class:"header-anchor",href:"#images","aria-label":'Permalink to "Images"'},"​")],-1),e("pre",null,[e("code",null,`![Alt Text](url)
`)],-1),e("p",null,"Result:",-1),e("p",null,[e("img",{src:"https://i.imgur.com/v8IVDka.jpg",alt:"m'lady"})],-1),e("h3",{id:"links",tabindex:"-1"},[l("Links "),e("a",{class:"header-anchor",href:"#links","aria-label":'Permalink to "Links"'},"​")],-1),e("pre",null,[e("code",null,`[link](https://github.com/sfxcode/vitepress-blog-starter)
`)],-1),e("p",null,"Result:",-1),e("p",null,[e("a",{href:"https://www.github.com",target:"_blank",rel:"noreferrer"},"link")],-1),e("h3",{id:"blockquotes",tabindex:"-1"},[l("Blockquotes "),e("a",{class:"header-anchor",href:"#blockquotes","aria-label":'Permalink to "Blockquotes"'},"​")],-1),e("pre",null,[e("code",null,`As Kanye West said:

> We're living the future so
> the present is our past.
`)],-1),e("p",null,"Result:",-1),e("p",null,"As Kanye West said:",-1),e("blockquote",null,[e("p",null,"We're living the future so the present is our past.")],-1),e("h3",{id:"horizontal-rules",tabindex:"-1"},[l("Horizontal Rules "),e("a",{class:"header-anchor",href:"#horizontal-rules","aria-label":'Permalink to "Horizontal Rules"'},"​")],-1),e("pre",null,[e("code",null,`---
`)],-1),e("p",null,"Result:",-1),e("hr",null,null,-1),e("h3",{id:"code-snippets",tabindex:"-1"},[l("Code Snippets "),e("a",{class:"header-anchor",href:"#code-snippets","aria-label":'Permalink to "Code Snippets"'},"​")],-1),e("pre",null,[e("code",null,`Indenting by 4 spaces will turn an entire paragraph into a code-block.
`)],-1),e("p",null,"Result:",-1),e("pre",null,[e("code",null,`.my-link {
    text-decoration: underline;
}
`)],-1),e("h3",{id:"reference-lists-titles",tabindex:"-1"},[l("Reference Lists & Titles "),e("a",{class:"header-anchor",href:"#reference-lists-titles","aria-label":'Permalink to "Reference Lists & Titles"'},"​")],-1),e("pre",null,[e("code",null,`**The quick brown [fox][1], jumped over the lazy [dog][2].**

[1]: https://en.wikipedia.org/wiki/Fox "Wikipedia: Fox"
[2]: https://en.wikipedia.org/wiki/Dog "Wikipedia: Dog"
`)],-1),e("p",null,"Result:",-1),e("p",null,[e("strong",null,[l("The quick brown "),e("a",{href:"https://en.wikipedia.org/wiki/Fox",title:"Wikipedia: Fox",target:"_blank",rel:"noreferrer"},"fox"),l(", jumped over the lazy "),e("a",{href:"https://en.wikipedia.org/wiki/Dog",title:"Wikipedia: Dog",target:"_blank",rel:"noreferrer"},"dog"),l(".")])],-1),e("h3",{id:"escaping",tabindex:"-1"},[l("Escaping "),e("a",{class:"header-anchor",href:"#escaping","aria-label":'Permalink to "Escaping"'},"​")],-1),e("pre",null,[e("code",null,`\\*literally\\*
`)],-1),e("p",null,"Result:",-1),e("p",null,"*literally*",-1),e("h3",{id:"embedding-html",tabindex:"-1"},[l("Embedding HTML "),e("a",{class:"header-anchor",href:"#embedding-html","aria-label":'Permalink to "Embedding HTML"'},"​")],-1),e("pre",null,[e("code",null,`<button class="button-save large">Big Fat Button</button>
`)],-1),e("p",null,"Result:",-1),e("p",null,[e("button",{class:"button-save large"},"Big Fat Button")],-1),e("h2",{id:"advanced-markdown",tabindex:"-1"},[l("Advanced Markdown "),e("a",{class:"header-anchor",href:"#advanced-markdown","aria-label":'Permalink to "Advanced Markdown"'},"​")],-1),e("p",null,"Note: Some syntax which is not standard to native Markdown. They're extensions of the language.",-1),e("h3",{id:"strike-throughs",tabindex:"-1"},[l("Strike-throughs "),e("a",{class:"header-anchor",href:"#strike-throughs","aria-label":'Permalink to "Strike-throughs"'},"​")],-1),e("pre",null,[e("code",null,`~~deleted words~~
`)],-1),e("p",null,"Result:",-1),e("p",null,[e("s",null,"deleted words")],-1),e("h2",{id:"github-flavored-markdown",tabindex:"-1"},[l("GitHub Flavored Markdown "),e("a",{class:"header-anchor",href:"#github-flavored-markdown","aria-label":'Permalink to "GitHub Flavored Markdown"'},"​")],-1),e("h3",{id:"syntax-highlighting",tabindex:"-1"},[l("Syntax Highlighting "),e("a",{class:"header-anchor",href:"#syntax-highlighting","aria-label":'Permalink to "Syntax Highlighting"'},"​")],-1),e("pre",null,[e("code",null,`\`\`\`javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
\`\`\`
`)],-1),e("p",null,"Result:",-1),e("div",{class:"language-javascript vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"javascript"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"function"),e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," fancyAlert"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),e("span",{style:{"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"}},"arg"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},") {")]),l(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    if"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (arg) {")]),l(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        $."),e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"facebox"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"({div: "),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'#foo'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")]),l(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    }")]),l(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")])])])],-1),e("h3",{id:"task-lists",tabindex:"-1"},[l("Task Lists "),e("a",{class:"header-anchor",href:"#task-lists","aria-label":'Permalink to "Task Lists"'},"​")],-1),e("pre",null,[e("code",null,`- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item
`)],-1),e("p",null,"Result:",-1),e("ul",null,[e("li",null,[l("[x] @mentions, #refs, "),e("a",{href:"https://www.github.com",target:"_blank",rel:"noreferrer"},"links"),l(", "),e("strong",null,"formatting"),l(", and "),e("del",null,"tags"),l(" supported")]),e("li",null,"[x] list syntax required (any unordered or ordered list supported)"),e("li",null,"[x] this is a complete item"),e("li",null,"[ ] this is an incomplete item")],-1),e("h3",{id:"tables",tabindex:"-1"},[l("Tables "),e("a",{class:"header-anchor",href:"#tables","aria-label":'Permalink to "Tables"'},"​")],-1),e("p",null,[l("You can create tables by assembling a list of words and dividing them with hyphens "),e("code",null,"-"),l(" (for the first row), and then separating each column with a pipe "),e("code",null,"|"),l(":")],-1),e("table",{tabindex:"0"},[e("thead",null,[e("tr",null,[e("th",null,"First Header"),e("th",null,"Second Header")])]),e("tbody",null,[e("tr",null,[e("td",null,"Content from cell 1"),e("td",null,"Content from cell 2")]),e("tr",null,[e("td",null,"Content in the first column"),e("td",null,"Content in the second column")])])],-1),e("h3",{id:"sha-references",tabindex:"-1"},[l("SHA references "),e("a",{class:"header-anchor",href:"#sha-references","aria-label":'Permalink to "SHA references"'},"​")],-1),e("p",null,"Any reference to a commit’s SHA-1 hash will be automatically converted into a link to that commit on GitHub.",-1),e("pre",null,[e("code",null,`16c999e8c71134401a78d4d46435517b2271d6ac
mojombo@16c999e8c71134401a78d4d46435517b2271d6ac
mojombo/github-flavored-markdown@16c999e8c71134401a78d4d46435517b2271d6ac
`)],-1),e("h3",{id:"issue-references-within-a-repository",tabindex:"-1"},[l("Issue references within a repository "),e("a",{class:"header-anchor",href:"#issue-references-within-a-repository","aria-label":'Permalink to "Issue references within a repository"'},"​")],-1),e("p",null,"Any number that refers to an Issue or Pull Request will be automatically converted into a link.",-1),e("pre",null,[e("code",null,`#1
mojombo#1
mojombo/github-flavored-markdown#1
`)],-1),e("h3",{id:"username-mentions",tabindex:"-1"},[l("Username @mentions "),e("a",{class:"header-anchor",href:"#username-mentions","aria-label":'Permalink to "Username @mentions"'},"​")],-1),e("p",null,[l("Typing an "),e("code",null,"@"),l(" symbol, followed by a username, will notify that person to come and view the comment. This is called an “@mention”, because you’re mentioning the individual. You can also @mention teams within an organization.")],-1),e("h3",{id:"emoji",tabindex:"-1"},[l("Emoji "),e("a",{class:"header-anchor",href:"#emoji","aria-label":'Permalink to "Emoji"'},"​")],-1),e("p",null,[l("GitHub supports emoji! Check out the "),e("a",{href:"https://github.com/sfxcode/vitepress-blog-starter",target:"_blank",rel:"noreferrer"},"Emoji Cheat Sheet"),l(".")],-1),e("h2",{id:"references",tabindex:"-1"},[l("References "),e("a",{class:"header-anchor",href:"#references","aria-label":'Permalink to "References"'},"​")],-1),e("ul",null,[e("li",null,[e("a",{href:"https://guides.github.com/features/mastering-markdown/",target:"_blank",rel:"noreferrer"},"https://guides.github.com/features/mastering-markdown/")])],-1)])),_:1})])}const w=i(h,[["render",u]]);export{f as __pageData,w as default};
