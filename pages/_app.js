import "../styles/global.css";

// 系统顶级组件，在所有页面上公用
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
