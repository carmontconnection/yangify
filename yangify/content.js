// Change replace button texts
var button1Name = "Yang Gang"
var button2Name = "Yang Army"
var button3Name = "Math Math"
var button4Name = "1000 Bux"

window.yangNameReplace = button1Name
window.count  = 0;

window.counter = 0
function htmlreplace(a,b,element) {
    if(!element)element=document.body;
    let nodes=element.childNodes;
    for(let n=0;n<nodes.length;n++){
    if(nodes[n].type&&nodes[n].type.toLowerCase()=='textarea'){
        let r=new RegExp(a,'gim');
        if(nodes[n].value.match(r)){
            window.count++;
        }
        nodes[n].value=nodes[n].value.replace(r,b);
        }
        else if(nodes[n].nodeValue && nodes[n].nodeValue.length > 0){
        let r=new RegExp(a,'gim');
        if(nodes[n].nodeValue.match(r)){
            window.count++;
        }
        nodes[n].nodeValue=nodes[n].nodeValue.replace(r,b)
        }
        else{
        htmlreplace(a,b,nodes[n])
        }
    }
}
chrome.storage.sync.get('whatButton', function(whatButton) {
    if(whatButton===1){
        window.yangNameReplace= button1Name
    } else if(whatButton===2){
        window.yangNameReplace = button2Name
    } else if(whatButton===3){
        window.yangNameReplace= button3Name
    } else if(whatButton===4){
        window.yangNameReplace= button4Name
    } 
  });

htmlreplace("Andrew Yang", window.yangNameReplace );

chrome.runtime.sendMessage({
    url: window.location.href,
    count: window.count
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    htmlreplace(window.yangNameReplace, request.yangNameReplace)
    // window.count = count2
    window.yangNameReplace = request.yangNameReplace
    
});
