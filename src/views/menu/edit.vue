<template>
  <div class="create-menu">
    <CreateOrEdit :isEdit="true" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'CreateMenu',
  components: {
    CreateOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style lang='scss' scoped>

</style>
