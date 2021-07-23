<template>
  <div class="demo">
    <!-- <Header>
      <template v-slot:center>
        <span>
          搜索
        </span>
      </template>
    </Header> -->


    <input v-model="value1" placeholder="Interact with this field" />
    <span>{{ errorMessage }}</span>


  </div>
</template>

<script>
import { Form, useField, Field } from 'vee-validate';
import {ref,reactive} from 'vue'
import Header from '../../components/Header/Header'
import schema from '../../utils/vee-validate-schema'
  export default {
  components: {
    // Header
    // Field
  },
   setup() {
     function validateField(value) {
      if (!value) {
        return "this field is required";
      }

      if (value.length < 8) {
        return "8位数子";
      }

      return true;
    }

    const { value:value1, errorMessage } = useField("fullN", validateField);
    console.log(value1);

    return {
      value1,
      errorMessage,
    };
  },
 
  }
</script>

<style lang="less">
.demo{
  text-align: center;
  input{
    display: block;
    width: 200px;
    height: 50px;
    margin: 0 auto;
  }
}
@keyframes isShow {
  100% {
    transform: translate(30px);
  }
}
.a{
  width: 200px;
  height: 200px;
  background: yellow;
}
.isShow{
  animation-name: isShow ;
  animation-duration: 2s;
  // transform: translate3d(0, 0, 0);
  // backface-visibility: hidden;
  // perspective: 1000px;
  // width: 200px;
  // height: 200px;
  // background-color: red;
  

}


</style>