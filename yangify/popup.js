// document.addEventListener('DOMContentLoaded', function(){
//   document.getElementById('button1').addEventListener('click',
//   onclickButton1, false)


//   const bg = chrome.extension.getBackgroundPage()
//   function onclickButton1(){
//       chrome.tabs.query({},
//       function(tabs){
//           window.yangNameReplace = "button1"
//           chrome.tabs.sendMessage(tabs, 'hi', window.yangNameReplace)
//       })
//   }
// }, false)


// document.addEventListener('DOMContentLoaded', function(){
//     document.querySelector('button').addEventListener('click',
//     onclick, false)

//     function onclick(){
//         chrome.tabs.query({currentWindow: true, active: true},
//         function(tabs){
//             chrome.tabs.sendMessage(tabs[0].id, 'hi')
//         })
//     }
// }, false)

document.getElementById('settingsIcon').addEventListener('click',
settingsOn, false)

function settingsOn(){
  document.getElementById('scorecardTitle').innerHTML = "Settings";
  document.getElementById("cardIcon").classList.remove('fa-address-card');
  document.getElementById("cardIcon").classList.add('fa-cogs');

  document.getElementById("section2").classList.add('section22');
  document.getElementById("section2").classList.remove('section2');

  document.getElementById("section3").classList.add('section33');
  document.getElementById("section3").classList.remove('section3');

  document.getElementById("radioButtons").style.display = "none";
}



function yangnessDecider(count){
  const yangnessCountArray= [
    [0 /*yang count*/, 'Bernie Sadders' /* level acheived*/,   0 /* % of progressbar*/],
    [2, 'Mathless', 25], 
    [4, 'Ying and Yang', 50], 
    [6, 'Freedom Dividend', 75], 
    [12, 'Yang Gangster', 100]
  ]

  for (var i = yangnessCountArray.length-1; i >=0; i--) {
    const threshCount= yangnessCountArray[i][0]
    const level = yangnessCountArray[i][1]
    const progressBarPercent = yangnessCountArray[i][2]

    if( threshCount <= count){
      return [level, progressBarPercent]
    }
  }
}




document.addEventListener('DOMContentLoaded', function () {

  const bg = chrome.extension.getBackgroundPage()
  document.getElementById('rdo-1').addEventListener('click',
  onclickButton1, false)
  function onclickButton1(){
          chrome.tabs.query({currentWindow: true, active: true},
          function(tabs){
              window.oldName = bg.yangNameReplace
              window.yangNameReplace = "button1"
              chrome.tabs.sendMessage(tabs[0].id, {yangNameReplace:  window.yangNameReplace})
          })
      }

  document.getElementById('rdo-2').addEventListener('click',
  onclickButton2, false)
  function onclickButton2(){
          chrome.tabs.query({currentWindow: true, active: true},
          function(tabs){
              window.oldName = bg.yangNameReplace
              window.yangNameReplace = "button2"
              chrome.tabs.sendMessage(tabs[0].id, {yangNameReplace:  window.yangNameReplace})
          })
      }
          
  document.getElementById('rdo-4').addEventListener('click',
  onclickButton4, false)
  function onclickButton4(){
          chrome.tabs.query({currentWindow: true, active: true},
          function(tabs){
             window.oldName = bg.yangNameReplace
              window.yangNameReplace = "button4"
              chrome.tabs.sendMessage(tabs[0].id, {yangNameReplace:  window.yangNameReplace})
          })
      }

  document.getElementById('rdo-5').addEventListener('click',
  onclickButton5, false)
  function onclickButton5(){
          chrome.tabs.query({currentWindow: true, active: true},
          function(tabs){
              window.oldName = bg.yangNameReplace
              window.yangNameReplace = "button5"
              chrome.tabs.sendMessage(tabs[0].id, {yangNameReplace:  window.yangNameReplace})
          })
      }
  
    Object.keys(bg.counts).forEach(function (url) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
          }, function(tabs) {
            var tab = tabs[0];
            var curr_url = tab.url;

            if (curr_url == url){
                var url_count = bg.counts[url]
                document.getElementById('yang-count').innerHTML = `Yang Count ${url_count}`
                var [level, percentProgressBar] = yangnessDecider(url_count)
                
                document.getElementById('progress-bar-yangness').value = percentProgressBar
                document.getElementById('label-progress-bar-yangness').innerHTML = "Status: " + level
               
            }
          });
    })
  }, false)

  