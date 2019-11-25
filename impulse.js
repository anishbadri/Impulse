
const listDiv = document.querySelector("#video-list");
console.log(listDiv);
createIframe(listDiv, "tgbNymZ7vqY");


function createIframe(parentElement, id){
    const ifrm = document.createElement('iframe');
    const embedlink = "https://www.youtube.com/embed/"
    
    ifrm.setAttribute('src', embedlink+id);
    parentElement.append(ifrm);
}


chrome.storage.local.get(['videoList'], function(data){
    data.videoList.forEach(element => {
        createIframe(listDiv, element.Id);
    });
})







