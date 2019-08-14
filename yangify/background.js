window.counts = {}
window.YangNameReplace = ''
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  window.counts[request.url] = request.count
  window.YangNameReplace = request.YangNameReplace
})
