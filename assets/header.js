// Section-specific JS: header
// Initialize header interactions such as search open/close and breadcrumb behaviors.

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var searchForms = document.querySelectorAll('.theme-site-header__search');
    searchForms.forEach(function(form){
      var input = form.querySelector('input');
      if(!input) return;
      // small UX: focus input when opening search
      form.addEventListener('click', function(){ input.focus(); });
    });
  });
})();
