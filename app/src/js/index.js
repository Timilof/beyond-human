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
              // img.src = img.value;
              img.classList.remove('lazy');
              console.log(img)
              console.log(img.src)
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
