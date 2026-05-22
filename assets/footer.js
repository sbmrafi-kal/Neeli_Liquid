// Section-specific JS: footer
// Footer interactions (e.g., collapsible lists on mobile) go here.

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var columns = document.querySelectorAll('.theme-footer-column');
    columns.forEach(function(col){
      var title = col.querySelector('.theme-footer-column__title');
      if(!title) return;
      title.addEventListener('click', function(){
        if(window.innerWidth > 749) return;
        col.classList.toggle('is-open');
        var list = col.querySelector('.theme-footer-list');
        if(list) list.style.display = col.classList.contains('is-open') ? 'block' : 'none';
      });
    });
  });
})();
