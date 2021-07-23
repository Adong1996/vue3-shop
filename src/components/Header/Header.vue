<template>
  <div class="header">
    <div class="header-left">
      <slot name="left" ></slot>
    </div>
    <div class="header-center">
      <slot name="center" ></slot>
    </div>
    <div class="header-rigth">
      <slot name="rigth" ></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
@import '../../css/css.less';
.header{
    // position: fixed;
    // top: 0;
    // left: 0;
    // z-index: 10;
    // margin-bottom: 45px;
  .bottom-border-1px;
  width: 100%;
  height: 45px;
  background-color: #02a774;
  // position: fixed;
  // top: 0;
  // left: 0;
  box-sizing: border-box; 
  
  .header-left {
    width: 25%;
    display: inline-block;
    color: #fff;
    i {
      font-size: 20px;
      padding-left: 15px;
    }
  }
  .header-center {
    width: 50%;
    display: inline-block;
    text-align: center;
    color: #fff;
    font-size: 20px;
    line-height: 45px;
    
  }
  .header-rigth {
    width: 25%;
    display: inline-block;
    color: #fff;
    font-size: 15px;
    span {
      padding-left: 15px;
    }
  }
}
</style>