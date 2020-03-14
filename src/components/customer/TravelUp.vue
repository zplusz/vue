<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/" style="text-decoration:none;" >
        <div class="container" style="color:white;margin-bottom:-10px;" >
            <h1><i class="fa fa-plane fa-lg" aria-hidden="true"></i>&nbsp Travel Up</h1>
         </div>
        </router-link>
    </nav>
      <div class="header">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner ">
                <div class="carousel-item header-carousel-inner active bg-cover"
                    style=" background-image: url(https://images.unsplash.com/photo-1560613717-c793db79055e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80)">
                    <div class="carousel-caption d-none d-md-block px-3">
                        <h5>新加坡</h5>
                        <p>金沙酒店以位在屋頂無邊無際游泳池廣為人知，在此頂樓彷彿讓人置身於新加坡市的心臟高點，可以一覽從南側碼頭延伸到新加坡海峽的景色，不論夕陽或夜景都讓人著迷</p>
                    </div>
                </div>
                <div class="carousel-item header-carousel-inner bg-cover"
                    style="background-image: url(https://www.watchinese.com/sites/watchinese.com/files/styles/article_mainphoto/public/article/2018/02/0187/187p108p1.jpg?itok=h5EsdNMS)">
                    <div class="carousel-caption d-none d-md-block px-3">
                        <h5>澳大利亞－哈修塔特(Hallstatt)</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil doloribus quam itaque
                            quaerat placeat nam, blanditiis provident deserunt non fugiat tempora architecto.
                            Reprehenderit nam ipsam incidunt neque tenetur exercitationem.</p>
                    </div>
                </div>
                <div class="carousel-item header-carousel-inner bg-cover"
                    style="background-image: url(https://images.unsplash.com/photo-1505337987237-3bb1b9362b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)">
                    <div class="carousel-caption d-none d-md-block px-3">
                        <h5>日本京都－金閣寺</h5>
                        <p>金閣寺的外牆全是以金箔裝飾而成，因此得名「金閣寺」。華麗的寺廟建築頂上兩層完全被金葉所覆蓋，周圍則被京都室町時代最精緻的園林環繞，金閣寺在池水中的清晰倒影靜謐美麗，是拍照時不可錯過的名景</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
    <section class="py-5 text-white secondblock">
        <div class="container">
            <div class="row">
                <div class="col-md-4 ">
                        <div class="secondbg1 bg-cover" style=" background-image: url(https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"></div>
                        <h3>伏見稻荷</h3>
                        <p>伏見稻荷神社是日本稻荷神社之總本社，伏見稻荷大社它於1994年正式登記為世界文化遺產，最有名的就是一望無際的千本鳥居，遍佈整個山頭的的大量鳥居或者狐狸雕像(稻荷神的使者)</p>
                </div>
                <div class="col-md-4 ">
                        <div class="secondbg2 bg-cover" style=" background-image: url(https://images.unsplash.com/photo-1545648632-55ae72037680?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80)"></div>
                        <h3>富士山河口湖</h3>
                        <p>富士山是人人來到日本必朝聖的景點之一，河口湖位於日本山梨縣、東京西邊，是可以完整欣賞到富士山美景、屬於日本富士五湖之一、位置最北、最低海拔、知名最高的湖泊，附近也有許多知名景點</p>
                </div>
                <div class="col-md-4 ">
                        <div class="secondbg3 bg-cover" style=" background-image: url(http://images.undiff.net/articles/2015/2015-12-07_6/_Featured.jpg)"></div>
                        <h3>六本木展望台</h3>
                        <p>位於東京正中心的六本木，森大樓52F的Tokyo City View擁有360度的展望檯，東面看去有東京鐵塔、晴空塔，南面可見台場，西面為較遠的新宿高樓群及北面的東京巨蛋</p>
                </div>
            </div>
        </div>
    </section>
    <section class="container-gluid py-5 text-white thirdblock ">
        <div class="row rwd-ml mx-lg-n5">
            <div class="col-md-5 bg-cover px-lg-5 shade">
                <div class="shaded"></div>
            </div>
        </div>
        <div class="container text-md-dark">
            <div class="row justify-content-end ">
                <div class="col-md-7 worldcss">
                    <h4>【土耳其】卡帕多奇亞</h4>
                    <p> 被稱為「月球表面」的卡帕多奇亞是土耳其的旅遊熱點，以獨特的地形和熱氣球觀光聞名全球，曾被美國《國家地理》雜誌社評選為「十大地球美景」之一</p>
                    
                    <div class="row mt-5">
                        <div class="col-md-6 ">
                            <h4>伊斯坦堡</h4>
                            <p>伊斯坦堡由新城和舊城兩部分組成，1985年舊城區被列入了世界文化遺產，這一古跡與博物館雲集的歷史區也是伊斯坦布爾旅遊的精華所在，涵蓋了聖索菲亞大教堂以及藍色清真寺和托普卡普皇宮等眾多知名景點</p>
                        </div>
                        <div class="col-md-6">
                            <h4>羊腸麵包 Kokoreç</h4>
                            <p>土耳其人的主食是麵包，烤的酥酥脆脆的麵包，加上融合辛香料的烤肉，可說是土耳其的國民美食，最特別而且一定要嘗試的就是「羊腸麵包」，怕羊騷味的朋友不用太擔心，土耳其的羊肉主要是用羔羊，不會有太重的腥味，而羊腸也不單單只是羊腸，是類似香腸，結合各部位的羊內臟於一串，大火烤過香味十足，來到土耳其不能錯過！</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="py-5 fourthblock text-dark">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="d-flex">
                        <div class="mr-2 btimage" style="background-image:url(https://cdn.hk01.com/media/article/218572/thumbnail/8222379e3fef4637fc34b213e5c83684.jpg)"></div>
                        <div>
                            <h3>越南峴港</h3>
                            <p>主要景點有粉紅大教堂、迦南島、會安古城、法國山城 Ba Na Hills、順化古都等，其中的佛手黃金橋是全新景點，這座橋樑矗立於巴拿山，被一雙巨大佛手托著的金橋，看似用石頭雕刻而成，實際是用玻璃纖維製作的，耗資 20 億美元完工</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex">
                        <div class="mr-2 btimage " 
                            style="background-image:url(http://resources.mynewsdesk.com/image/upload/t_open_graph_image/mguz63wckvjtu47pdvy6.jpg)"></div>
                        <div>
                            <h3>日本山形</h3>
                            <p>藏王樹冰是山形縣冬季最特殊的冬季盛景。隨著冬日雪花紛飛，奇特又美麗的樹冰便逐漸形成，到一、二月間，藏王山頂蒼翠的松樹便完全為白雪包覆，就像是一個個矗立在冰原雪地上的雪怪，景觀之詭異，日本人都將「藏王樹冰」視為國寶</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="d-flex">
                        <div class="mr-2 btimage" style="background-image:url(http://5b0988e595225.cdn.sohucs.com/images/20181219/3a78c663dafe4b94a8ed7064b250680e.jpeg)"></div>
                        <div>
                            <h3>西藏拉薩</h3>
                            <p>布達拉宮坐落在中國西藏自治區首府拉薩市區西北的瑪布日山（紅山）上，是一座規模宏大的宮堡式建築群，可以說是拉薩這個城市，與整個雪域高原的象徵吧！ 它也是現今世界上海拔最高，集宮殿、城堡及寺院於一體的宏偉建築</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex">
                        <div class="mr-2 btimage" style="background-image:url(http://pics23.yamedia.tw/24/userfile/b/bismaleimide/album/14c0ee8ee721de.jpg)"></div>
                        <div>
                            <h3>瑞士少女峰</h3>
                            <p>瑞士少女峰又有歐洲屋脊、歐洲之巔的稱號，是瑞士具代表性的景點山峰，遊客們可以搭著有百年歷史的少女峰鐵道緩緩上山，鐵路貫穿阿爾卑斯山艾格峰與僧侶峰之間，且位於山頂標高3454公尺的少女峰車站，更是全歐洲最高的火車站</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="nav_li_pb goinproduct"> 
        <router-link to="/customerproducts" style="text-decoration:none;">
       <p> <i>查</i><i>看</i><i>所</i><i>有</i><i>行</i><i>程</i> <i>></i><i>></i> </p>
        </router-link>
    </div>
    <footer>練習用僅供參考，不作為商業用</footer>
  </div>
  
  
  
</template>





<script>
  $(document).ready(function () {
      console.log('ready');
      $('a[data-dismiss="modal"][data-toggle="modal"]').on('click', function () {
      console.log('click');
      var target = $(this).data('target');
      console.log('target', target);
      $(target).on('shown.bs.modal', function () {
                    $('body').addClass('modal-open');
                });
            });
        });
</script>

<script>
   // Example starter JavaScript for disabling form submissions if there are invalid fields
   (function () {
       'use strict';
        window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
        }, false);
        });
        }, false);
    })();
</script>    


<script>
export default {
  name: "TravelUp",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.btn {
    border-width: 2px;
}

.form-control {
    border-width: 2px;
}

.bg-cover {
    background-size: cover;
    background-position: center center;
}

.secondblock{
    background: linear-gradient(360deg, #2E2E2E 17%, #424241 88%);
    background: -moz-linear-gradient(360deg, #2E2E2E 17%, #424241 88%);
    background: -webkit-linear-gradient(360deg, #2E2E2E 17%, #424241 88%);
    background: -o-linear-gradient(360deg, #2E2E2E 17%, #424241 88%);

}

.thirdblock{
    position: relative ; 
    background: linear-gradient(180deg, #363636 5%, #6E6E6E 83%);
    background: -moz-linear-gradient(180deg, #363636 5%, #6E6E6E 83%);
    background: -webkit-linear-gradient(180deg, #363636 5%, #6E6E6E 83%);
    background: -o-linear-gradient(180deg, #363636 5%, #6E6E6E 83%);
}

.fourthblock{
    background-color: rgba(253, 253, 253, 0.61);
}

.header-carousel-inner {
    height: 500px;
}

.secondbg1,.secondbg2,.secondbg3{
    height: 150px;
    margin-bottom: 20px;
}

.carousel-caption {
    background-color: rgba(0, 0, 0, .4)
}

.goinproduct{
    margin: auto;
    width: 350px;
    height: 100px;
    line-height:50px;
    background-color: rgba(253, 253, 253, 0.61);
    
    }

.goinproduct p{
    color: #044b8d;
    text-align: center;
    font-size:40px;
    text-align: center;
    
    
}       

.goinproduct p:hover{
    color:#002b53;
    font-size: 45px;
}

.btimage {
    background-size: cover;
    height: 150px;
    width: 700px;
}

footer{
    height: 80px;
    background-color: #333;
    color: white;
    font-size: 15px;
    text-align: center;
    padding-top:30px;
}

.shade{
   position: absolute;
   top:0;
   bottom: 0;
   background-image: url(https://images.unsplash.com/photo-1510253687831-0f982d7862fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80);
    
}

@media (max-width: 767.98px) {

/* .shaded{
width: 400px;
height: 800px;
margin-left: -20px;
background-color: #5e5e5ed7;
opacity:0.7;
} */

.worldcss{
background-color: #e2e2e279;
line-height: 25px;
letter-spacing:3px;
color: #000000;
padding-top: 20px;
}




.rwd-ml{
margin-left: 0;
    }

body.modal-open {
padding-right: 0 !important;
}


}

/* 查看所有行程特效 */
.nav_li_pb {
	font-size:18px;
	color:#ef9208;
}
.nav_li_pb i {
	font-style:normal;
}
.nav_li_pb i {
	display:inline-block;
	vertical-align:bottom;
	-webkit-animation-name:fontSizeUp1;
	animation-name:fontSizeUp1;
	-webkit-animation-duration:5s;
	animation-duration:5s;
	-webkit-animation-timing-function:steps(1,end);
	animation-timing-function:steps(1,end);
	-webkit-animation-fill-mode:none;
	animation-fill-mode:none;
	-webkit-animation-iteration-count:infinite;
	animation-iteration-count:infinite;
	-webkit-transform-origin:50% 75%;
	transform-origin:50% 75%;
}
.nav_li_pb i:nth-of-type(1) {
	-webkit-animation-delay:0s;
	animation-delay:0s;
}
.nav_li_pb i:nth-of-type(2) {
	-webkit-animation-delay:0.5s;
	animation-delay:0.5s;
}
.nav_li_pb i:nth-of-type(3) {
	-webkit-animation-delay:1s;
	animation-delay:1s;
}
.nav_li_pb i:nth-of-type(4) {
	-webkit-animation-delay:1.5s;
	animation-delay:1.5s;
}
.nav_li_pb i:nth-of-type(5) {
	-webkit-animation-delay:2s;
	animation-delay:2s;
}
.nav_li_pb i:nth-of-type(6) {
	-webkit-animation-delay:2.5s;
	animation-delay:2.5s;
}
.nav_li_pb i:nth-of-type(7) {
	-webkit-animation-delay:3s;
	animation-delay:3s;
}
.nav_li_pb i:nth-of-type(8) {
	-webkit-animation-delay:3.5s;
	animation-delay:3.5s;
}
.nav_li_pb i:nth-of-type(9) {
	-webkit-animation-delay:4s;
	animation-delay:4s;
}
.nav_li_pb i:nth-of-type(10) {
	-webkit-animation-delay:4.5s;
	animation-delay:4.5s;
}
.nav_li_pb i:nth-of-type(11) {
	-webkit-animation-delay:5s;
	animation-delay:5s;
}
.nav_li_pb i:nth-of-type(12) {
	-webkit-animation-delay:5.5s;
	animation-delay:5.5s;
}
@-webkit-keyframes fontSizeUp1 {
	0% {
	-webkit-transform:scale(1.25);
	transform:scale(1.25);
}
7%,100% {
	-webkit-transform:scale(1);
	transform:scale(1);
}
}@keyframes fontSizeUp1 {
	0% {
	-webkit-transform:scale(1.25);
	transform:scale(1.25);
}
7%,100% {
	-webkit-transform:scale(1);
	transform:scale(1);
}
}.nav_li_pb .fontSizeUp1 {
	-webkit-animation-name:fontSizeUp1;
	animation-name:fontSizeUp1;
}
</style>
