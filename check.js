const ESCAPE_KEYCODE = 27,
      ENTER_KEYCODE = 13,
      START_TIME_DELAY = 1000,
      CHECK_TIME_DELAY = 6000;

var init = function(){
  var el = document.createElement('div');
  el.id = "sidetabene";
  el.style.width = "20%";
  el.style.height = "100%";
  el.style.textAlign = "left";
  el.style.padding = "20px";
  el.style.fontSize = "15px";
  el.style.fontFamily = "Inconsolata";
  el.contentEditable = true;
  el.innerHTML = "<h2> Content </h2>";
  el.style.position = "fixed";
  el.style.right = 0;
  el.style.zIndex = 2999999999;
  if (window.location.hostname === "www.evernote.com") {
    el.style.background = "transparent";
    el.style.display = "block";
    el.style.borderLeft = "1px solid lightgrey";
    el.style.borderTop = "1px solid lightgrey";
    el.style.top = "87px";
  } else {
    el.style.boxShadow = "-1px 0px 5px 0px rgba(0,0,0,0.75)";
    el.style.display = "none";
    el.style.borderLeft = "none";
    el.style.background = "white";
    el.style.borderTop = "none";
    el.style.top = "0";
  }

  document.body.appendChild(el);
  chrome.storage.sync.get('sidetabene', function(obj){
    el.innerHTML = obj.sidetabene;
  });
};


setTimeout(function(){
  init();
}, START_TIME_DELAY);
setTimeout(function(){
  if (document.getElementById('sidetabene') == undefined) init();
}, CHECK_TIME_DELAY);

document.onkeydown = function(e) {
   if (e.keyCode == ESCAPE_KEYCODE || e.keyCode == ENTER_KEYCODE) {
     chrome.storage.sync.set({
        'sidetabene': e.target.innerHTML
        }, function(){
          console.log('sidetabene saved');
        });
   }
   if (e.keyCode == ESCAPE_KEYCODE) e.target.blur();
 };
 //
 chrome.storage.onChanged.addListener(function(changes, namespace) {
   for (var key in changes) {
     var storageChange = changes[key];
     console.log(storageChange);
     var el = document.getElementById('sidetabene');
     if (key === "visible" && storageChange.newValue === true) {
       el.style.display = "block";
     } else if (key === "visible" && storageChange.newValue === false) {
       el.style.display = "none";
     }
   }
 });
