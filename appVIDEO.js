// Embed Video Page Config File
var config = {
  pageSize:"3",
  toPage:"4",
  mylogo: "",
  mybanner: "", // (html accept)
  myfooter: "" // (html accept)
}
// var
const pageControl = document.querySelector("#pagination-control-container");
const pageData = document.querySelector("#pagination-data-container");
var pageNumber;
var myJsonVideo = [];

// addEventListener
pageControl.addEventListener("click",clickPaginationControl)

// json and onload
var requestFile = "./video-data.json"
var request = new XMLHttpRequest();
request.open('GET', requestFile);
request.responseType = 'json';
request.send();
request.onload = function() {
  var myJsonData = request.response;
  var videos = myJsonData['videos'];
  for (var i = 0; i < videos.length; i++) {
    myJsonVideo.unshift(videos[i]);
  }
  pageNumber = Math.ceil(myJsonVideo.length/config.pageSize);
  splitMyUrl();
  showPaginationControler();
  showPaginationData();
}

function showPaginationControler() {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  ul.classList.add("pagination","justify-content-end","pagination-lg");
  ul.innerHTML += '<li class="page-item"><a class="page-link" href="#">&laquo;</a></li>';
  for (var i = 0; i < pageNumber; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = i+1;
    a.href = "#"
    a.classList.add("page-link");
    li.classList.add("page-item");
    li.appendChild(a);
    ul.appendChild(li);
  }
  ul.innerHTML += '<li class="page-item"><a class="page-link" href="#">&raquo;</a></li>';
  nav.appendChild(ul);
  pageControl.appendChild(nav);
}
function clickPaginationControl(e) {
  e.preventDefault();
  const item = e.target;
  const num = item.innerText;
}
function splitMyUrl(){
  var temp = location.href.split("#");
  var temp = temp[0].split("?");
  if (temp[1] != "" && temp[1] != undefined){
    var temp = temp[1].split("&");
    for (var i = 0; i < temp.length; i++) {
      var config = temp[i].split("=");
      var tag = config[0];
      var value = config[1];
      if (tag == "p") {
        config.toPage = value;
      }
    }
  }
}
function showPaginationData() {
  const videoDiv = document.createElement("div");
  videoDiv.classList.add("videoDiv");
  if (config.toPage && config.pageSize) {
    var before = (config.toPage-1)*config.pageSize+1;
    var after = (config.toPage*config.pageSize);
  }
  console.log(before);
  console.log(after);
}
