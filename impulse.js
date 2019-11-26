
const listDiv = document.querySelector("#video-list");
console.log(listDiv);


createIframe(listDiv, "tgbNymZ7vqY");

function insertVideoDiv(videoId){
    const videoDiv = document.createElement('div');
    videoDiv.setAttribute('id', videoId);
    videoDiv.setAttribute('class', 'video-embed');
    videoDiv.appendChild(createIframe(videoId))

    //delete button
    const button = document.createElement('BUTTON');
    button.innerText = "X";
    button.setAttribute('class', videoId + ' delete-video');
    // button.setAttribute('class', 'delete-video');
    
    videoDiv.appendChild(button);
    // videoDiv.append('<button>XX</button>')
    listDiv.append(videoDiv);
}

function createIframe(id){
    const ifrm = document.createElement('iframe');
    const embedlink = "https://www.youtube.com/embed/"
    ifrm.setAttribute('allowFullScreen', '');
    ifrm.setAttribute('src', embedlink+id);
    // parentElement.append(ifrm);
    return ifrm;
}


chrome.storage.local.get(['videoList'], function(data){
    data.videoList.forEach(element => {
        insertVideoDiv(element.Id);
    });
})

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    // document.getElementsByClassName(".delete-video").onclick = function() {
    //     console.log("Clicked");
    // }

    document.querySelectorAll('button.delete-video').forEach(function(item){
        // item.addEventListener('click', function(){
        //     console.log(item);
        // })
        console.log(item);
    })
});

window.setInterval(addButtonListener, 5000);

function addButtonListener(){
    document.querySelectorAll('button.delete-video').forEach(function(item){
        item.addEventListener('click', function(){
            console.log("clicked" + item.classList[0]);
            removeVideo(item.classList[0]);
        })
    })
}

function removeVideo(videoId){
    return new Promise((resolve, reject) =>{
        chrome.storage.local.get(['videoList'], function(data){
            if(data.videoList != undefined){
                data.videoList.forEach((index,element) => {
                    if(element.Id == videoId){
                        // data.videoList.splice(index, 1);
                        console.log(index);
                    }
                })
                resolve(false);
            }
        });
    })
}











