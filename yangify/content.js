window.yangNameReplace = "Yang Gang"
htmlreplace = (a,b,element) => {
        let count = 0
        if(!element)element=document.body;
        let nodes=element.childNodes;
        for(let n=0;n<nodes.length;n++){
        if(nodes[n].type&&nodes[n].type.toLowerCase()=='textarea'){
            let r=new RegExp(a,'gim');
            if(nodes[n].value.match(r)){
                count ++;
            }
            nodes[n].value=nodes[n].value.replace(r,b)
            }
            else if(nodes[n].nodeValue && nodes[n].nodeValue.length > 0){
            let r=new RegExp(a,'gim');
            if(nodes[n].nodeValue.match(r)){
                count ++;
            }
            nodes[n].nodeValue=nodes[n].nodeValue.replace(r,b)
            }
            else{
            htmlreplace(a,b,nodes[n])
            }
        }
        return count
    }
let count = htmlreplace("andrew yang","Yang Gang")

chrome.runtime.sendMessage({
  url: window.location.href,
  count: count
})



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    window.count = htmlreplace(window.yangNameReplace, request.yangNameReplace)
    window.yangNameReplace = request.yangNameReplace
    window.isApplicationOn = request.isApplicationOn
})
