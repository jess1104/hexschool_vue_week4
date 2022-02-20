import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
import pagination from "./components/pagination.js";
import { modal } from "./components/productModal.js";
const site = 'https://vue3-course-api.hexschool.io/v2'; 
const apiPath = 'jesswu';

// 產品資料格式
const app = createApp({
  components:{
    pagination,
    modal
  },
  data() {
    return {
      products: [],
      detail:{},
      tempProduct: {
        // 多圖
        imagesUrl: [],
      },
      productModal:{},
      delProductModal:{},
      delModal:{},
      isNew:false,
      pagination:{}
    };
  },
  methods: {
    checkLogin() {
      // 將token取出來
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)jessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // 將偷肯帶入預設header
      axios.defaults.headers.common['Authorization'] = token;
      // check api
      const url = `${site}/api/user/check`;
      axios.post(url).then((res)=>{
        // console.log('check',res);
        // 檢查後去拿取資料
        this.getProducts();
      })
    },
    // 預設頁數帶1
    getProducts(page = 1) {
      // console.log(page);
      // query去帶參數
      const url = `${site}/api/${apiPath}/admin/products/?page=${page}`;
      axios.get(url).then((res)=>{
        // console.log('getProducts',res.data.products);
        this.products = res.data.products; 
        this.pagination = res.data.pagination 
      })
    },
    openModal(status, data) {
      // 新產品
      if(status === 'isNew'){
        this.tempProduct = {
          imagesUrl: []
        }
        this.productModal.show();
        this.isNew = true;
      }
      // 綁定舊產品的資料
      if(status === 'edit'){
        // 深拷貝一份
        this.tempProduct = JSON.parse(JSON.stringify(data));
        this.tempProduct.imagesUrl=[];
        this.productModal.show();
        this.isNew = false;
      }

      // 如果點擊刪除鈕
      if(status === 'delete'){
        // 打開deleteModal
        this.delProductModal.show();
        this.tempProduct ={ ...data};
      }
    },
    // 刪除api
    deleteProduct() {
      let url = `${site}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url).then((res)=>{
        this.delProductModal.hide();

        setTimeout(() => {
          // console.log(res);
         alert(res.data.message);
        }, 1000);
        this.getProducts();
       

      })
    }
    
    
  },
  mounted() {
    this.checkLogin();
    // 初始一個bs的modal 並在openModal方法去使用.show()
    this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    // 刪除模板
    this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  }
});

app.mount('#app')