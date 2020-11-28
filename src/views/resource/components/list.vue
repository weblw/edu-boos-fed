<template>
  <div class="resource-list">
    <el-card>
      <div slot="header">
        <el-form>
          <el-form-item label="资源名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="资源名称">
            <el-select>
              <el-option label="课程"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources">
        <el-table-column
          label="编号"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [] // 资源列表
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    onSubmit () {
      console.log('sumit')
    },
    handleEdit () {
      console.log('edit')
    },
    handleDelete () {
      console.log('delete')
    },
    async loadResources () {
      const { data } = await getResourcePages({})
      this.resources = data.data.records
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
