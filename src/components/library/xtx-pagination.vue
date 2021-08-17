<template>
  <div class="xtx-pagination" v-if="total > 0">
    <a
      href="javascript:;"
      v-if="myCurrentPage > 1"
      @click="changePager(myCurrentPage - 1)">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active: i === myCurrentPage }"
      @click="changePager(i)">{{ i }}</a>
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      href="javascript:;"
      v-if="myCurrentPage < pager.pageCount"
      @click="changePager(myCurrentPage + 1)">下一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    // 显示多少个按钮
    const count = 5
    // 当前显示的页码
    const myCurrentPage = ref(1)
    // 总页数 = 总条数 / 每一页条数  向上取整
    const myTotal = ref(0) // 总条数
    const myPageSize = ref(0) // 每一页条数
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      const offset = Math.floor(count / 2)
      let start = myCurrentPage.value - offset
      let end = start + count - 1
      // 如果起始页码小于1需要处理
      if (start < 1) {
        start = 1
        end = (start + count - 1) > pageCount ? pageCount : start + count - 1
      }
      // 如果结束页码大于总页数需要处理
      if (end > pageCount) {
        end = pageCount
        start = (end - count + 1) < 1 ? 1 : end - count + 1
      }
      const btnArr = []
      for (let i = start; i < end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    })
    // 监听props的变化，更新组件内部数据
    watch(props, () => {
      myTotal.value = props.total
      myPageSize.value = props.pageSize
      myCurrentPage.value = props.currentPage
    })
    // 切换分页函数
    const changePager = (page) => {
      // 页码相同不作为
      if (myCurrentPage.value !== page) {
        myCurrentPage.value = page
        // 通知父组件
        emit('current-change', page)
      }
    }
    return { myCurrentPage, pager, changePager }
  }
}
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
