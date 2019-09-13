<template>
    <div>
      <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
            <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
        </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="80">編輯</th>
                <th width="80">刪除</th>
            </tr>
        </thead>
      <tbody>
        <tr v-for="(item,key) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm"  @click="delModal(item)">刪除</button>
            <!-- <button class="btn btn-outline-danger btn-sm"  @click="delProduct(item)">刪除</button> //直接按刪除鍵刪除商品不跳modal視窗 -->
          </td>
        </tr>
      </tbody>
    </table>
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                         <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading" ></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
            </div>
        </div>
        </div>

        <!-- delModal -->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                         <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input id="customFile" class="form-control" >
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="delProduct">刪除商品</button>
            </div>
            </div>
        </div>
        </div>
        <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
  </div>
</template>


<script>  
import $ from 'jquery';
import Pagination from './../Pagination';

export default {
  components:{
    Pagination,
  },
    data() {
        return {
            products:[], //抓取後端產品資料
            tempProduct:[], //建立新增或修改資料
            pagination:{}, //抓取後端頁數資料
            isNew:false, //新增與修改時的變數
            isLoading: false, //一般動畫讀取的變數 
            status:{
              fileUploading:false, //上傳圖片的動畫讀取的變數 在index.html中使用CDN方式載入動畫
            },
        };
    },
    methods:{
       //取得api資料
        getProducts(page){ 
            const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
            const vm = this;
            vm.isLoading = true;//啟用讀取動畫
            console.log(process.env.APIPATH , process.env.CUSTOMPATH);
            this.$http.get(api).then((response) => {
            console.log(response.data);
            if (response.data.success) {
              vm.isLoading = false; //資料讀取完成後再停用動畫
              vm.products = response.data.products;
              vm.pagination = response.data.pagination; //存取API提供的頁數
            }
            });
        },
        //新增資料
        openModal(isNew, item){
            if(isNew){  //傳入new參數 就開啟post模板 建立新的資料
                this.tempProduct = {};
                this.isNew = true;
            }else{   //否則就開啟put模板 並且格子內載入原本的資料可做修改
                this.tempProduct = Object.assign({}, item);  //Object.assign()為 ES6寫法 將item寫入前方的{}空物件中 避免 tempProduct = item 的傳參考特性
                this.isNew = false;
            }
            $('#productModal').modal('show');  //使用methods透過決定何時開啟功能
        },
        delModal(item){
            $("#delProductModal").modal("show");
            this.tempProduct = item;
        },
        delProduct(){
            //直接按刪除鍵刪除商品不跳modal視窗
            // const tempProduct=item;
            // const vm = this;
            // let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${tempProduct.id}`;
            const vm = this;//刪除選擇的vm.tempProduct資料
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
            console.log(process.env.APIPATH , process.env.CUSTOMPATH);
            this.$http.delete(api).then((response) => {
            console.log(response.data);
            if(response.data.success){
                console.log('已刪除產品');
                $('#delProductModal').modal('hide');
                vm.getProducts();//刪除資料後重新抓一次新的資料
            }else{
                console.log('找不到產品');
            }
            });
        },
        //編輯資料
        updateProduct(){
            let api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
            let httpMethod = 'post';  //新增
            const vm = this;
            if(!vm.isNew){ //isNew等於false時就開啟put模板
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod = 'put'; //修改
            }
            console.log(process.env.APIPATH , process.env.CUSTOMPATH);
            //參數data是物件 所以要在用括號包起來
            this.$http[httpMethod](api,{ data: vm.tempProduct }).then((response) => {
            console.log(response.data);
            if(response.data.success){
                $('#productModal').modal('hide');
                vm.getProducts();
            }else{
                $('#productModal').modal('hide');
                vm.getProducts();
                console.log('新增失敗');
            }
            });

        },
        //上傳圖片
        uploadFile() {
            console.log(this);
            const uploadedFile = this.$refs.files.files[0]; //已經上傳的檔案位置 陣列第0個
            const vm = this;
            const formData = new FormData(); //webAPI 模擬傳統表單送出的形式
            formData.append('file-to-upload', uploadedFile); //使用append將檔案新增到變數中 括號內參數 (前)要新增的欄位  (後)要上傳的變數
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
            vm.status.fileUploading = true; //啟用讀取動畫
            this.$http.post(url, formData, {
              //上傳路徑  傳送的內容  大括號的內容為一個要修改的物件
              headers: {
                //調整headers
                'Content-Type': 'multipart/form-data', //將Content-Type改成form-data格式
              },
            }).then((response) => {
              console.log(response.data);
              vm.status.fileUploading = false;
              if (response.data.success) {
                // vm.tempProduct.imageUrl = response.data.imageUrl;
                // console.log(vm.tempProduct);
                vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
                //將imageIUrl雙向綁定  使用$set將後端response.data.imageUrl裡的資料強制,寫入變數vm.tempProduct裡的'imageUrl'
              }else{
                this.$bus.$emit('messsage:push', response.data.message, 'danger');
                //使用emit將products中response.data.message的內容傳送給$bus 在外層alert中顯示出錯誤訊息
              }
            });
          },
    },
    created(){
        this.getProducts();
    }
}
</script>