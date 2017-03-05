chrome.browserAction.onClicked.addListener(function(tab) {
  var vis = false;
  chrome.storage.sync.get('visible', function(obj){
    if (obj.visible === false) vis = true;
    chrome.storage.sync.set({'visible': vis});
  });
});
