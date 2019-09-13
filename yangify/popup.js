// Change replace button texts
var button1Name = "Yang Gang"
var button2Name = "Yang Army"
var button3Name = "Math Man"
var button4Name = "1000 Bucks"

function intialSettings() {

  document.getElementById('scorecardTitle').innerHTML = "Yang Score";
  document.getElementById("cardIcon").classList.remove('fa-cogs');
  document.getElementById("cardIcon").classList.add('fa-address-card');

  document.getElementById('labelButton1').innerHTML = button1Name
  document.getElementById('labelButton2').innerHTML = button2Name
  document.getElementById('labelButton3').innerHTML = button3Name
  document.getElementById('labelButton4').innerHTML = button4Name

  document.getElementById("section2").classList.add('section2');
  document.getElementById("section2").classList.remove('section22');

  document.getElementById("section3").classList.add('section3');
  document.getElementById("section3").classList.remove('section33');

  document.getElementById("radioButtons").style.display = "block";
  document.getElementById("changeYangTo").style.display = "block";
  document.getElementById("yangPercentage").style.display = "block";
  document.getElementById("yangCaption").style.display = "block";
  document.getElementById("progressBar").style.display = "block";
  document.getElementById("yangCount").style.display = "block";

  document.getElementById("settingsList").style.display = "none";

  document.getElementById("settingsIcon").classList.remove('far');
  document.getElementById("settingsIcon").classList.remove('fa-arrow-alt-circle-left');
  document.getElementById("settingsIcon").classList.remove('backIconStyle');
  document.getElementById("settingsIcon").classList.add('fa-cogs');
  document.getElementById("settingsIcon").classList.add('fa');
  document.getElementById("settingsIcon").classList.add('settingsIconStyle');
}

document.addEventListener('DOMContentLoaded', function () {

  intialSettings()

  document.getElementById('settingsIcon').addEventListener('click',
    toggleSettings, false)

});

function toggleSettings() {
  if (document.getElementById('scorecardTitle').innerHTML === "Settings") {

    intialSettings()

  } else {
    document.getElementById('scorecardTitle').innerHTML = "Settings";
    document.getElementById("cardIcon").classList.remove('fa-address-card');
    document.getElementById("cardIcon").classList.add('fa-cogs');

    document.getElementById("section2").classList.add('section22');
    document.getElementById("section2").classList.remove('section2');

    document.getElementById("section3").classList.add('section33');
    document.getElementById("section3").classList.remove('section3');

    document.getElementById("radioButtons").style.display = "none";
    document.getElementById("changeYangTo").style.display = "none";
    document.getElementById("yangPercentage").style.display = "none";
    document.getElementById("yangCaption").style.display = "none";
    document.getElementById("progressBar").style.display = "none";
    document.getElementById("yangCount").style.display = "none";

    document.getElementById("settingsList").style.display = "block";

    document.getElementById("settingsIcon").classList.remove('fa-cogs');
    document.getElementById("settingsIcon").classList.remove('fa');
    document.getElementById("settingsIcon").classList.remove('settingsIconStyle');
    document.getElementById("settingsIcon").classList.add('far');
    document.getElementById("settingsIcon").classList.add('fa-arrow-alt-circle-left');
    document.getElementById("settingsIcon").classList.add('backIconStyle');
  }
}

const yangnessCountArray = [
  [0, 'Mathless', 25, 'progressFaces/mathless.png'],
  [4, 'Ying and Yang', 50, 'progressFaces/yinyang.png'],
  [6, 'Freedom Dividend', 75, 'progressFaces/freedomDividend.png'],
  [12, 'Yang Gangster', 100, 'progressFaces/yangster.png']
];

/* [0 /*yang count*/ /* , 'Bernie Sadders' /* level acheived*/ /* , 0 /* % of progressbar*/ /* , 'progressFaces/bernieSadders.png'], */

function yangnessDecider(count) {

  for (var i = yangnessCountArray.length - 1; i >= 0; i--) {
    const threshCount = yangnessCountArray[i][0]
    const level = yangnessCountArray[i][1]

    if (threshCount <= count) {
      return level
    }
  }
}

function percentage(maxCount, count) {
  if (maxCount <= count) {
    return 100;
  }
  var percentage = Math.floor(100 * count / maxCount)
  return percentage
}

function marginMove(percent) {
  var leftMostMargin = -220 // '-220px'
  var rightMostMargin = -40 //'-40px'

  var marginPosition = leftMostMargin - (percent / 100) * (leftMostMargin - rightMostMargin)

  return marginPosition.toString() + "px"

}

document.addEventListener('DOMContentLoaded', function () {

  const bg = chrome.extension.getBackgroundPage()

  if(bg.isApplicationOn === true){
    document.getElementById('app-on-off-switch').checked = true
  } else if(bg.isApplicationOn === false){
    document.getElementById('app-on-off-switch').checked = false
  }

  if (bg.whatButtonBg ===1){
    document.getElementById('rdo-1').checked = true
    document.getElementById('rdo-2').checked = false
    document.getElementById('rdo-3').checked = false
    document.getElementById('rdo-4').checked = false
  } else if (bg.whatButtonBg ===2){
    document.getElementById('rdo-1').checked = false
    document.getElementById('rdo-2').checked = true
    document.getElementById('rdo-3').checked = false
    document.getElementById('rdo-4').checked = false
  } else if (bg.whatButtonBg ===3){
    document.getElementById('rdo-1').checked = false
    document.getElementById('rdo-2').checked = false
    document.getElementById('rdo-3').checked = true
    document.getElementById('rdo-4').checked = false
  } else if (bg.whatButtonBg ===4){
    document.getElementById('rdo-1').checked = false
    document.getElementById('rdo-2').checked = false
    document.getElementById('rdo-3').checked = false
    document.getElementById('rdo-4').checked = true
  }

  document.getElementById('app-on-off-switch').addEventListener('click', onclickOnOffButton, false)
  function onclickOnOffButton() {

    window.isApplicationOn = document.getElementById('app-on-off-switch').checked;
    if (window.isApplicationOn === false) {
      window.yangNameReplace = "Andrew Yang"
      bg.isApplicationOn = false;
      chrome.storage.sync.set({isAppOn: false}, function() {

      });
    }

    if (window.isApplicationOn === true) {

    if(document.getElementById('rdo-1').checked == true){
      window.yangNameReplace = button1Name;
    } else if(document.getElementById('rdo-2').checked == true){
      window.yangNameReplace = button2Name;
    } else if( document.getElementById('rdo-3').checked == true){
      window.yangNameReplace = button3Name;
    } else if(document.getElementById('rdo-4').checked == true){
      window.yangNameReplace = button4Name;
    }

      bg.isApplicationOn = true;
      chrome.storage.sync.set({isAppOn: true}, function() {


      });
    }

    // chrome.tabs.query({ currentWindow: true, active: true },
    chrome.tabs.query({},
    function (tabs) {
      var message =  { isApplicationOn: window.isApplicationOn, yangNameReplace: window.yangNameReplace, whatButton: 1 };
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
    })

    // chrome.tabs.sendMessage(tabs[0].id, { isApplicationOn: window.isApplicationOn, yangNameReplace: window.yangNameReplace, whatButton: 1 });




    }


  document.getElementById('rdo-1').addEventListener('click',
    onclickButton1, false)
  function onclickButton1() {
    document.getElementById('app-on-off-switch').checked = true
    chrome.tabs.query({},
      function (tabs) {
        window.yangNameReplace = button1Name
        window.whatButtonBg = 1
        bg.whatButtonBg = 1
        for (var i=0; i<tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg});
        }
      })

    // chrome.tabs.query({ currentWindow: true, active: true },
    //   function (tabs) {
    //     window.yangNameReplace = button1Name
    //     window.whatButtonBg = 1
    //     bg.whatButtonBg = 1
    //     chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg})
    //   })
  }

  document.getElementById('rdo-2').addEventListener('click',
    onclickButton2, false)
  function onclickButton2() {
    chrome.storage.sync.set({whatButton: 2}, function() {
      // console.log(2)
    })
    document.getElementById('app-on-off-switch').checked = true
    chrome.tabs.query({},
      function (tabs) {
        window.yangNameReplace = button2Name
        window.whatButtonBg = 2
        bg.whatButtonBg = 2
        for (var i=0; i<tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg  });
        }
      })

    // chrome.tabs.query({ currentWindow: true, active: true },
    //   function (tabs) {
    //     window.yangNameReplace = button2Name
    //     window.whatButtonBg = 2
    //     bg.whatButtonBg = 2
    //     chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg  })
    //   })
  }

  document.getElementById('rdo-3').addEventListener('click',
    onclickButton3, false)
  function onclickButton3() {
    document.getElementById('app-on-off-switch').checked = true

    chrome.tabs.query({},
      function (tabs) {
        window.yangNameReplace = button3Name
        window.whatButtonBg = 3
        bg.whatButtonBg = 3
        for (var i=0; i<tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg  });
        }
      })
    // chrome.tabs.query({ currentWindow: true, active: true },
    //   function (tabs) {
    //     window.yangNameReplace = button3Name
    //     window.whatButtonBg = 3
    //     bg.whatButtonBg = 3
    //     chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg })
    //   })

  }

  document.getElementById('rdo-4').addEventListener('click',
    onclickButton4, false)
  function onclickButton4() {
    document.getElementById('app-on-off-switch').checked = true

    chrome.tabs.query({},
      function (tabs) {
        window.yangNameReplace = button4Name
        window.whatButtonBg = 4
        bg.whatButtonBg = 4
        for (var i=0; i<tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg  });
        }
      })
    // chrome.tabs.query({ currentWindow: true, active: true },
    //   function (tabs) {
    //     window.yangNameReplace = button4Name
    //     window.whatButtonBg = 4
    //     bg.whatButtonBg = 4
    //     chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace, whatButton: window.whatButtonBg })
    //   })
  }

  getCount()

  function getCount(){
    Object.keys(bg.counts).forEach(function (url) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {

        var tab = tabs[0];
        var curr_url = tab.url;

        if (curr_url == url) {

          var percent;
          var url_count;
          var maxYangCount = 40;

          url_count =  bg.counts[url]
          percent = percentage(maxYangCount, url_count)

          changesToPopup(url_count, percent)

        }
      });
    })
  }


}, false)

function changesToPopup(url_count, percent){
        var num1 = 0;
        var yangnessColor = 'red';
        var level = yangnessDecider(url_count);

        // if (percent >= 100) {
        //   yangnessColor = 'green'; // Changes this
        //   num1 = 4;
        // } else

        // #7DCBF5 - Light blue from logo
        if (percent >= 75) {
          yangnessColor = '#83c3e6'; // Changes this //
          num1 = 3;
        } else if (percent >= 50) {
          yangnessColor = '#2ECC40'; // Changes this
          num1 = 2;
        } else if (percent >= 25) {
          yangnessColor = '#FF851B'; // Changes this
          num1 = 1;
        } else if (percent >= 0) {
          yangnessColor = '#83c3e6'; // Changes this // 
          num1 = 0;
        }

        document.getElementById('progessBarImg').src = yangnessCountArray[num1][3];

        var marginPos = marginMove(percent)
        document.getElementById('progessBarImg').style.marginLeft = marginPos

        document.getElementById('progress-bar-yangness').value = percent.toString();

        document.getElementById('yangCaption').innerHTML = level
        document.getElementById('yangCaption').style.color = yangnessColor


        document.getElementById('yangPercentage').innerHTML = percent.toString() + "%";
        document.getElementById('yangPercentage').style.color = yangnessColor

        document.getElementById('yangCount').innerHTML = `${url_count} mentions of "Andrew Yang"`
        document.getElementById('yangCount').style.color = yangnessColor
}
