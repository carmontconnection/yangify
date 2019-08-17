// Change replace button texts
var button1Name = "Yang Gang"
var button2Name = "Yang Army"
var button3Name = "Math Math"
var button4Name = "1000 Bux"

function intialSettings() {

  document.getElementById('scorecardTitle').innerHTML = "Yang Scorecard";
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
  // document.getElementById("yangDes").style.display = "block";
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
    // document.getElementById("yangDes").style.display = "none";
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
  [0 /*yang count*/, 'Bernie Sadders' /* level acheived*/, 0 /* % of progressbar*/, 'progressFaces/bernieSadders.png'],
  [2, 'Mathless', 25, 'progressFaces/mathless.png'],
  [4, 'Ying and Yang', 50, 'progressFaces/yinyang.png'],
  [6, 'Freedom Dividend', 75, 'progressFaces/freedomDividend.png'],
  [12, 'Yang Gangster', 100, 'progressFaces/yangster.png']
];

function yangnessDecider(count) {

  for (var i = yangnessCountArray.length - 1; i >= 0; i--) {
    const threshCount = yangnessCountArray[i][0]
    const level = yangnessCountArray[i][1]
    const progressBarPercent = yangnessCountArray[i][2]

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
  document.getElementById('rdo-1').addEventListener('click',
    onclickButton1, false)
  function onclickButton1() {
    chrome.tabs.query({ currentWindow: true, active: true },
      function (tabs) {
        window.oldName = bg.yangNameReplace
        window.yangNameReplace = button1Name
        chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace })
      })
  }

  document.getElementById('rdo-2').addEventListener('click',
    onclickButton2, false)
  function onclickButton2() {
    chrome.tabs.query({ currentWindow: true, active: true },
      function (tabs) {
        window.oldName = bg.yangNameReplace
        window.yangNameReplace = button2Name
        chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace })
      })
  }

  document.getElementById('rdo-3').addEventListener('click',
    onclickButton4, false)
  function onclickButton4() {
    chrome.tabs.query({ currentWindow: true, active: true },
      function (tabs) {
        window.oldName = bg.yangNameReplace
        window.yangNameReplace = button3Name
        chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace })
      })
  }

  document.getElementById('rdo-4').addEventListener('click',
    onclickButton5, false)
  function onclickButton5() {
    chrome.tabs.query({ currentWindow: true, active: true },
      function (tabs) {
        window.oldName = bg.yangNameReplace
        window.yangNameReplace = button4Name
        chrome.tabs.sendMessage(tabs[0].id, { yangNameReplace: window.yangNameReplace })
      })
  }

  Object.keys(bg.counts).forEach(function (url) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var tab = tabs[0];
      var curr_url = tab.url;

      if (curr_url == url) {
        var url_count = bg.counts[url]
        document.getElementById('yangCount').innerHTML = `Yang Count ${url_count}`
        var level = yangnessDecider(url_count)

        var maxYangCount = 40;
        var percent = percentage(maxYangCount, url_count)
        document.getElementById('yangPercentage').innerHTML = percent.toString() + "%";

        let num1;

        if (percent === 0) {
          num1 = 0;
        } else if (percent === 25) {
          num1 = 1;
        } else if (percent === 50) {
          num1 = 2;
        } else if (percent === 75) {
          num1 = 3;
        } else if (percent === 100) {
          num1 = 4;
        }

        document.getElementById('progessBarImg').src = yangnessCountArray[num1][3];

        var marginPos = marginMove(percent)
        document.getElementById('progessBarImg').style.marginLeft = marginPos

        // NICK NEED YOUR HELP HERE, COULD YOU CHANGE THE SRC OF THE IMAGE TO THE 5
        // INSIDE THE 'progessFaces' folder? I added the srcs to them just above in the yangnessCountArray

        document.getElementById('progress-bar-yangness').value = percent.toString();
        document.getElementById('yangCaption').innerHTML = level

      }
    });
  })
}, false)
