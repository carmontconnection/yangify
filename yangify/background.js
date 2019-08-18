window.counts = {}
window.YangNameReplace = ''
window.isApplicationOn = null;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  
  window.isApplicationOn = request.isApplicationOn
  window.YangNameReplace = request.YangNameReplace
  window.counts[request.url] = request.count
 
  
})
