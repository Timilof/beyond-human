document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll(".lazy");
  var lazyloadThrottleTimeout;

  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});


document.querySelector(".creditBox button").addEventListener("click", function(){
document.querySelector(".creditBox").classList.toggle("short");
window.scrollTo(0,document.body.scrollHeight);
})

document.body.addEventListener("keydown", function(e) {
  if(e.code == 'Space'){
  e.preventDefault()
  pageScroll()
  }

})



function pageScroll() {
  const lastButton = document.querySelector(".creditBox button")
  const main = document.querySelector(".main")
  if(window.innerHeight + window.pageYOffset == lastButton.offsetTop){
  window.scrollTo(0,0);
  setTimeout(pageScroll,3000);
}else{

  window.scrollBy(0,1.5);
  scrolldelay = setTimeout(pageScroll,3);
}

}
