const modal = {
    props:['tempProduct','productModal','isNew'],
    template:`
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span>新增產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <!-- 圖片區 -->
                <div class="col-sm-4">
                    <!-- 主圖 -->
                    <div class="mb-3">
                        <label for="imageUrl" class="form-label">主要圖片</label>
                        <input v-model="tempProduct.imageUrl" type="text" class="form-control mb-2" placeholder="請輸入圖片連結">
                        <!-- :src把圖片綁上去 -->
                        <img class="img-fluid" :src="tempProduct.imageUrl">
                    </div>
                    <!-- 多圖 -->
                    <div class="mb-3">
                        <h3>多圖設置</h3>
                        <!-- 判斷是不是陣列 -->
                        <div v-if="Array.isArray(tempProduct.imagesUrl)"> 
                            <template v-for="(img,index) in tempProduct.imagesUrl" :key=" index + '123' ">
                                <input type="text" class="form-control" v-model="tempProduct.imagesUrl[index]" placeholder="請輸入圖片網址">
                                <img class="img-fluid" :src="tempProduct.imagesUrl[index]">
                            </template>
                            <!-- 1.當我陣列長度為0要出現新增按鈕 -->
                            <!-- 2.當我有第一個圖片網址才會出現新增按鈕 -->
                            <!-- 注意!v-if 跟 v-else 要相鄰 -->
                            <button v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]" type="button" class="btn btn-primary w-100" @click="tempProduct.imagesUrl.push('')">新增</button>
                            <button v-else type="button" class="btn btn-outline-danger w-100" @click="tempProduct.imagesUrl.pop()">刪除最後一個</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                             placeholder="請輸入分類">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input id="unit"  v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input id="origin_price"  v-model.number="tempProduct.origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input id="price"  v-model.number="tempProduct.price" type="number" min="0" class="form-control"
                             placeholder="請輸入售價">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description"  v-model="tempProduct.description" type="text" class="form-control"
                              placeholder="請輸入產品描述">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                              placeholder="請輸入說明內容">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                    <!-- 可以利用bind true-value跟false-value去代替原本的true/false -->
                      <input id="is_enabled"  v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0" >
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
    methods: {
      // 新增||編輯產品方法
      updateProduct() {
		  const site = 'https://vue3-course-api.hexschool.io/v2'; 
		  const apiPath = 'jesswu';
        let url = `${site}/api/${apiPath}/admin/product`;
        // api method
        let method = 'post';

        // 如果不是新的用put編輯
        if(!this.isNew){
          url = `${site}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
          method = 'put';
        }

        // 要post產品至後端
        // axios.post(url, { data: this.tempProduct })
        axios[method](url, { data: this.tempProduct }).then((res)=>{
          // 關掉modal
          this.productModal.hide();
          setTimeout(() => {
            // console.log(res);
            alert(res.data.message);
          }, 1000);
        
          // 再拿一次list的資料
          this.$emit('get-product');
          
        })
      },
    },
}

export {
    modal
}