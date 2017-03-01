var app = new Vue({
  el: '#app',
  data() {
    return {
      productList: [
        {
          "productId":"10001",
          "productName":"黄鹤楼香烟",
          "productPrice":19,
          "productQuentity":1,
          "productImage":"img/goods-1.jpg",
          "parts":[
            {
              "partsId":"a001",
              "partsName":"打火机"
            },
            {
              "partsId":"a002",
              "partsName":"XXX"
            }
          ]
        },
        {
          "productId":"10002",
          "productName":"加多宝",
          "productPrice":8,
          "productQuentity":1,
          "productImage":"img/goods-2.jpg",
          "parts":[
            {
              "partsId":"a001",
              "partsName":"吸管"
            }
          ]
        },
        {
          "productId":"10003",
          "productName":"耳机",
          "productPrice":39,
          "productQuentity":1,
          "productImage":"img/ear.jpeg",
          "parts":[]
        }
      ],
      totalMoney: 0,
      delModal: false,
      curCheck: false,
      currentDelItem: {}
    }
  },
  filters: {
    formatMoney(value, quentity) {
      if (!quentity) quentity = 1
      return '￥' + (value * quentity).toFixed(2) + '元'
    }
  },
  methods: {
    changeProduct(item, status) {
      if (status < 0) {
        item.productQuentity--
        if (item.productQuentity < 1) {
          item.productQuentity = 1
        }
      } else {
        item.productQuentity++
      }
      this.total()
    },
    // 单选
    selectItem(item) {
      if (item.checked === undefined) {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
      this.isCheckAll()
      this.total()
    },
    // 全选
    selectAll(flag) {
      this.curCheck = flag
      this.productList.forEach((item) => {
        if (item.checked === undefined) {
          this.$set(item, 'checked', flag)
        } else {
          item.checked = flag
        }
      })
      this.total()
    },
    isCheckAll() {
      var flag = true
      this.productList.forEach((item) => {
        if (!item.checked) {
          flag = false
        }
      })
      if (flag) {
        this.curCheck = true
      } else {
        this.curCheck = false
      }
    },
    // 总计
    total() {
      var total = 0
      this.productList.forEach((item) => {
        if (item.checked) {
          total += item.productPrice * item.productQuentity
        }
      })
      this.totalMoney = total
    },
    // 删除
    del(item) {
      this.currentDelItem = item
      this.delModal = true
    },
    confirmDel() {
      this.delModal = false
      this.productList.splice(this.currentDelItem, 1)
    }
  }
})
