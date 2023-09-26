This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## 创建应用

```shell
# 根据next.js提供开始模版创建应用
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"

# 进入目录
cd nextjs-blog

# 运行开发服务
npm run dev
```

`next.js`内部支持热更新，服务启动后，当修改 pages/index.js 文件保存时，页面将自动刷新。

## 页面导航

`next.js`会自动为*pages*文件夹下的文件创建路由。比如，当目录结构为`pages/posts/first-post`时，我们可以通过`域名:端口/posts/first-post`直接访问，无需配置相应路由。

应用内部导航时，可以适用`next/link`导出的`link`组件，来实现内部引用跳转。使用方式：

```jsx
<Link href="/posts/first-post">
  <a className="link">我的第一篇文章</a>
</Link>
```

注：

1. `Link`相关的样式添加到自身上无效，需要添加到子组件`a`标签上。
2. 跳转外部引用，请使用原生`a`标签

`next.js`内部会根据页面自动拆分 js，css 文件，并按需引入，以提程序加载性能。

在生产环境中，只要`Link`组件出现在浏览器视口中，next.js 就会自动预下载链接文件。

## 静态资源

### 图片引入

页面中可以通过`/`访问到`public`文件夹的内容。比如`<img src="/images/profile.jpg">`，访问的资源路径是`/pulic/images/profile.jpg`。

### 元数据

在页面中可以通过`next/head`提供的`Head`组件修改元数据。

```jsx
import Head from "next/head";

<Head>
  <title>this is my first post</tile>
</Head>;
```

### 样式加载

`next.js`默认支持 css，Scss。同时也为模块化 css 提供了解决方案，通过创建`*.module.css`，然后导入到相应组件内部。或者使用`<style jsx></style>`、`<style jsx global></style>` *css in js*的方式。

除此之外，还可以添加**全局 css 样式**。通过在 pages 目录下创建一个`_app.js`顶级组件（在所有页面公用），然后导入一个自定义文件路径（通常放/styles/global.css 下）的全局 css 文件。

注：

- 全局 CSS 样式，只能在\_app.js 中，如果将页面样式放入其中，可能会影响到其他页面。
- 使用 scss，需要提前安装`npm install sass`

## 预渲染

`next.js`为所有页面默认开启预渲染逻辑。

预渲染有两种渲染方式：

1. **静态生成**。在系统构建时就生成对应的页面，针对不同用户都返回相同页面内容。
2. **服务端渲染**。 在每次用户请求时，生成不同用户对应的页面内容。

在开发模式，next.js 默认使用**静态生成**的方式为每个页面预渲染。

### 什么时候使用静态生成，服务端渲染？

当你确定，你能在用户请求之前渲染页面，那么静态渲染时首选。相反，如果你的页面在每次请求都会发生变化，那么服务端渲染可能更加适合。竟可能的使用静态生成，这样能获取 cdn 加速，比服务端渲染要快。

### 静态生成数据渲染

静态生成可以在有数据和无数据的情况下完成。

当静态生成需要额外数据时，可以在页面的导出一个名为`getStaticProps`的 async 函数。该函数返回的数据，将作为 props 传递到该页面组件中。

```tsx

// pages/index.js
export default function Home(props) {
    console.log(props.allPostsData);
    ...
}

export async function getStaticProps() {
  // 从 本地文件系统 , webAPI, 数据库 等获取数据
  const allPostsData = getSortedPostsData()

  // 这个 `props` 属性将会传递到 `Home`组件中
  return {
    props: {
        allPostsData
    }
  }
}

// lib/posts.js
export function getSortedPostsData(){
    // 通过fs读取顶层posts目录下的文件
    ...
    return [...]
}
```

注:

- `getStaticProps`只在**服务器运行**。不会被打包到浏览器的包中。
- 在开发中(`npm rund dev`)，`getStaticProps`会在每个请求都执行，但是生产环境中，只在构建时执行。
- `getStaticProps`只能从页面组件文件导出，因为在渲染之前必须要拿到所需的数据

如果你的页面显示了频繁更新的数据，并且页面内容在每次请求都会更改，静态生成则无法提前请求之前渲染页面，这时候静态生成就不是一个好的方法，所以我们需要采用服务端渲染。

### 服务端渲染数据生成

使用服务端渲染，只需要导出一个`getServerSideProps`的函数来代替`getStaticProps`函数。

```tsx
// context: 包含请求相关参数
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

服务端渲染在每次请求时都会去计算结果，所以它相比于静态生成慢一些，同时还不能使用 CDN 缓存。但是对于 SEO 友好。

## 客户端渲染

除了预渲染之外，可以才采用客户端渲染。

- 静态生成（预渲染）页面不需要外部数据的部分。
- 页面加载后，通过 javascript 从外部获取数据并填充除预渲染其它部分。

当页面的数据频繁变动，并且页面不考虑 SEO 的情况下，可以考虑使用客户端渲染。

`next.js`提供了一个[SWR](https://swr.vercel.app/zh-CN)包，通过 React hooks 来进行数据获取。

```tsx
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

## 动态路由

实际开发过程中，所以的路由并不都是固定的，有一些路由路径中指定了页面查询参数，比如：`/post/:id`,用于获取指定文章 iD 的文章内容。

### 使用动态路由静态生成页面

1. 在相应 pages 目录或者子目录（比如：`/pages/post/`）下创建一个格式为:`[id].js`的文件，这里的`id`可以是任意名称。
2. 书写该页面展示逻辑，所有和该页面路径匹配的页面(比如：`host/post/xxx`)，都将使用该模版渲染。
3. 导出一个`getStaticPaths`的函数，它的返回值用于指定`id`可能的值。
   ```tsx
   export async function getStaticPaths({ params }) {
     //  可从任务数据源获取数据，文件系统，数据库，api等
     // 返回一个可能的`id`列表
     // 数据结构:
     // [
     //   {
     //     params: {
     //       id: 'ssg-ssr'
     //     }
     //   },
     //   {
     //     params: {
     //       id: 'pre-rendering'
     //     }
     //   }
     // ]
     // 数据结构的`id`，是创建的文件名`[id].js`中的名称。
   }
   ```
4. 在页面中通过`getStaticProps`函数接收传入的动态参数，然后根据该参数查询该页面相关数据。
   ```tsx
   export async function getStaticProps({ params }) {
     // 根据 params.id 查询相关的数据
     // 这里的`id`，是创建的文件名`[id].js`中的名称。
     // 这里的返回的数据，将用于页面组件执行渲染
   }
   ```

注：

- 在开发中(`npm run dev`)，`getStaticPaths`会在每个请求都执行，但是生产环境中，只在构建时执行。

### 捕获所有路由参数

通过`...`,可以扩展动态路由捕获所有路径。比如:`pages/posts/[...id].js`，可以匹配`/pages/a`，也可以匹配`/pages/a/b`、`pages/a/b/c`等等。

相应`getStaticPaths`方法，必须返回一个数组作为`id`键的值。

```tsx
// pages/posts/[...id].js 页面中
export function getStaticPaths() {
  return [
    {
      params: {
        // 静态生成 /posts/a/b/c
        id: ["a", "b", "c"],
      },
    },
    //...
  ];
}
```

同时`getStaticProps`接受到的 params 将是数组。

```tsx
// pages/posts/[...id].js 页面中
export function getStaticProps({ params }) {
  // 这里的params.id将会返回['a','b','c']
}
```

### 路由器

如果要访问路由器，可以在页面中通过导入`next/router`包的`useRouter`来获取。

```tsx
import { useRouter } from "next/rouer";
function Post() {
  const router = useRouter();
}
```

### 404 页面

通过在 pages 目录下创建一个`404.js`文件，该文件在构建时静态生成。

## API 路由

API 路由允许我们创建一个无 Nodejs 服务的 api 接口。使用方法：

1. 在 pages 目录下创建一个`api`目录
2. 在 api 目录下新建一个 `hello.js`的文件
3. 在 hello.js 中默认导出一个处理函数
   ```javascript
   export default function handler(req, res) {
     res.status(200).json({ text: "Hello" });
   }
   ```
4. 访问服务`http://localhost:3000/api/hello`,将返回`{"text":"hello"}`
