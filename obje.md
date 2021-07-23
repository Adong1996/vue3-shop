#### one:
  移动端适配:  lib-flexible postcss-px2rem
  dpr: 物理像素(px)(设备像素)/CSS 像素 --iphon6:2
  一像素下边框
  less:
  .bottom-border-1px {
    position: relative;
    border: none;
    &: after
    {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      heigth: 1px;
      background-color: red;
      transform: scaleY(0.5)
    }
  }
  
  用多媒体查询
  根据像素比缩放1px像素边框
  @media only screen and (-webkit-device-pix-ratio: 2)
  transform: scaleY(.5)
  根据像素比来使用 2x 图 3x 图
  .bg-image(@url){
    background-image:url("@{url}@2x.jpg");
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
        background-image: url(  "@{url}@3x.jpg");
    }
  }
  ## 浮动
  清除浮动的本质：​ 清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0 的问题。清除浮动之后， 父级就会根据浮动的子盒子自动检测高度。父级有了高度，就不会影响下面的标准流了
  1.额外标签法(隔墙法)
  是W3C推荐的做法是通过在浮动元素末尾添加一个空的标签例如 <div style=”clear:both”></div>，或则其他标签br等亦可。
  2.父级添加overflow属性方法
  可以给父级添加： overflow为 hidden| auto| scroll  都可以实现。
  3.使用after伪元素清除浮动
  .clearfix:after {  content: ""; display: block; height: 0; clear: both; visibility: hidden;  }   

 .clearfix {*zoom: 1;}   /* IE6、7 专有 */
 4.使用双伪元素清除浮动
  clearfix:before,.clearfix:after { 
  content:"";
  display:table; 
}
.clearfix:after {
 clear:both;
}
.clearfix {
  *zoom:1;
}

  clearFix()
    &::after{
      content: '';
      display: block;
      clear: bith
      }

  #### 适配的原因：
  内嵌网页的宽度是 980 
  视觉视口：所见即所得；看到的视觉视口
  布局视口：网页的宽度；

  vieport 适配 布局视口=视觉视口
  <meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=no'>
  content(内容)='width=device-width(布局视口=视觉视口)
  initial-scale=1(缩放比1：1),user-scalable=no(禁止用户缩放)

  px: css单位； em: 相对于自身，或父节点的大小；rem: 根节点的大小

  ### rem 适配
  function remRefresh() {
    1. 获取屏幕的宽度
    let clientWidth = documentElement.clientWidth;
    2. 将屏幕的宽度等分,目的：降低单位rem 值的大小，便于计算
    let fontValue = clientwidth / 10
    3. 设置根节点字体的大小
    document.doucumentElement.style.fontSize = rem + 'px'
    4. 设置body字体大小(默认字体大小)
    document.body.style.fontSize = '16px' 
  }
  window.addEventListener('pageshow', ()=>{
    remRefresh()
  })
  window.addEventListener('resize', ()=>{
    //窗口大小改变就触发 
    remRefresh()
  })

  ### vue3下载相关依赖
  yarn add lib-flexible postcss-px2rem -D
  配置: vue-config.js
  const px2rem = require('postcss-px2rem')

  ### 在 vueconfig.js配置
  module.exports = {
    runtimeCompiler: true,
    // lintOnSave: false, // 关闭EsLint的规则
    css: { // 添加postcss配置
      loaderOptions: {
        postcss: {
          plugins: [
            // 配置postcss-px2rem
            px2rem({
              remUnit: 37.5   // 设计稿等分后的rem值   375/10
            })
          ]
        }
      }
    },
  }
  ### 在 编码: main.js引入
  import 'lib-flexible'

  ### viewport
  <meta name="viewport"
    content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">

   ### vue2脚手架
    安装依赖

    npm install px2rem-loader lib-flexible --save
    配置说明

    在项目入口文件 main.js 里 引入 lib-flexible， flexible会自动根据设备情况动态设置rem的值的大小

    在build文件夹下的util.js中添加

    // *********************** 新增内容开始***********************************
    // 全局定义px2remLoader
    const px2remLoader = {
        loader: 'px2rem-loader',
        options: {
        remUnit: 37.5  // remUnit为转换rem的基础 设计稿单位/等分数 = remUnit
        }
    }
    // *********************** 新增内容结束***********************************

    // 在该函数的loaders中添加
    function generateLoaders (loader, loaderOptions) {
        // 添加使用 px2remLoader
    // *********************** 新增内容开始***********************************
        
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader,px2remLoader] : [cssLoader, px2remLoader]
    // *********************** 新增内容结束***********************************

        if (loader) {
        loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
        })
        })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
        return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
        })
        } else {
        return ['vue-style-loader'].concat(loaders)
        }
    }