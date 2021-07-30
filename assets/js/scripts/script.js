//*****************
// Website scripts
//*****************

// Event DOM ready
var callback = function(){
  // trigger events on Dom ready.

  // =======
  // fitvids
  // =======
  fitvids();

  // ===========
  // Navbar Menu
  // ===========
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });

      $el.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEnter = false;
        var isEscape = false;
        if ("key" in evt) {
            isEnter = (evt.key == "Enter" || evt.key == "Ent");
            isEscape = (evt.key == "Escape" || evt.key == "Esc");
        } else {
            isEnter = (evt.keyCode == 13);
            isEscape = (evt.keyCode == 27);
        }
        if (isEnter) {
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.add('is-active');
          $target.classList.add('is-active');
        }

        if (isEscape) {
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.remove('is-active');
          $target.classList.remove('is-active');
        }
      };
    });
  }

  // =======================================
  // Load comments when it's in the viewport
  // =======================================
  var comments = document.getElementById('comments');

  if (comments) {
    var scroll = function(e) {
      if(isInViewport(comments) == true) {
        loadComments();
        document.removeEventListener('scroll', scroll, true);
      }
    };
    document.addEventListener('scroll', scroll, true);
  }

  // =============
  // Image Gallery
  // =============
  var images = document.querySelectorAll('.kg-gallery-image img');
  images.forEach(function (image) {
      var container = image.closest('.kg-gallery-image');
      var width = image.attributes.width.value;
      var height = image.attributes.height.value;
      var ratio = width / height;
      container.style.flex = ratio + ' 1 0%';
  })
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

// ===============================
// Check if element is in viewport
// ===============================
function isInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

// ==================
// Add class function
// ==================
function addClass(selector, myClass) {
  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // add class to all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].classList.add(myClass);
  }
}

// =====================
// Remove class function
// =====================
function removeClass(selector, myClass) {
  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // remove class from all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].classList.remove(myClass);
  }
}

// =============
// Load Comments
// =============
function loadComments() {
  /**
  *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
  *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
  */
  var disqus_config = function () {
    this.page.url = '{{url absolute="true"}}';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = '{{comment_id}}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };

  (function () {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
}
