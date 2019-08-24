window.counts = {}
window.YangNameReplace = ''
window.isApplicationOn = null;
window.whatButtonBg = 1;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  
  window.YangNameReplace = request.YangNameReplace
  window.counts[request.url] = request.count

  chrome.storage.sync.get('isAppOn', function(isAppOn) {
    if(isAppOn == false){
      window.isApplicationOn = isAppOn
    } else{
      window.isApplicationOn  = true
    }
  });

  chrome.storage.sync.get('whatButton', function(whatButton) {
    if(whatButton){
      window.whatButtonBg = whatButton
    } else {
      window.whatButtonBg = 1
    }
  });
})
