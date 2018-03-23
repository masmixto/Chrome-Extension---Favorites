(function(){



  var i,j;
  var bookmarksArray = [];
  var bookmarksId = [];
  chrome.bookmarks.getTree((bookmarkTree)=>{
    let favorites = bookmarkTree[0].children;
    for(i = 0; i<favorites.length; i++){
      bookmarksArray.push(favorites[i].title);
      bookmarksId.push(favorites[i].id);
      var favChild = favorites[i].children;
      for(j=0; j<favChild.length; j++){
          if(typeof favChild[j].dateGroupModified !== 'undefined'){
            bookmarksArray.push(favChild[j].title);
            bookmarksId.push(favChild[j].id);
          }
       }
   }




  for(i=0; i<bookmarksArray.length; i++){
      $('#bookmarks').append('<button class="buttons" id="'+bookmarksId[i]+'">'+bookmarksArray[i]+'</button>');
  }
  })
})();

$( document ).ready(function() {
  $('.buttons').on('click', function(){

    //read current page
      var tab;
      chrome.tabs.getSelected(null, function(tab) {
        myFunction(tab.url, tab.title);
    });

    var bookmarkId = $(this).attr('id');

    function myFunction(tablink, tabTitle) {
      chrome.bookmarks.create({'parentId': bookmarkId,
                             'title': tabTitle,
                             'url': tablink
                           });
    }
      $(this).fadeTo('fast', 0.5).fadeTo('fast', 1.0);
  })
});

// chrome.bookmarks.getChildren(id, callback)  //read children of certain bookmark
// Read Main Bookmarks.
// (function(){
//   var i;
//   chrome.bookmarks.getTree((bookmarkTree)=>{
//     let favorites = bookmarkTree[0].children;
//     for(i = 0; i<favorites.length; i++){
//       console.log(favorites[i]);
//    }
//   })
// })();
