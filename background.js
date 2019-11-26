console.log("Hello Impulse");

function videoItem(Id){
    this.Id = Id;
    this.time = new Date().getTime();
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(isUrlActiveYTVideo(changeInfo.url))
    {
        videoId = getVideoIdFromUrl(changeInfo.url);
        console.log(tabId);

        // if(videoId){
        //     //save video ID
        //     incrementVideoCount(new Date().toLocaleDateString()).then((result)=> {updateBadge()})
        // } 
        addVideoIdInStorage(videoId);
        // videoCount++;
        // console.log("Url changed to ", changeInfo.url);
        chrome.tabs.update(tabId, {url: chrome.runtime.getURL('impulse.html')});
    }
})

function isUrlActiveYTVideo(url){
    //watch regex
    const youTubeWatchRegex = new RegExp("/*youtube.com/watch*");
    if(youTubeWatchRegex.exec(url)){
        return true;
    }
    return false;
}

function getVideoIdFromUrl(url){
    //works only for a striaght forward Url 
    const regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    return url.match(regex) ? url.match(regex)[1]: null;
}


//remove duplicated from added and update their time 
function addVideoIdInStorage(videoId){
    dupilcateVideoIdCheck(videoId).then((duplicate) => {
        // console.log("duplicates " + duplicate);
        if(!duplicate) {
            chrome.storage.local.get(['videoList'], function(data){
                if(data.videoList == undefined){
                    data.videoList = []
                }
                var newVideoItem = new videoItem(videoId); 
                console.log(newVideoItem);
                data.videoList.push(newVideoItem);
                chrome.storage.local.set({videoList: data.videoList})
            })
        }
        else{
            // Can update time for the existing Id
        }
    })
}

function dupilcateVideoIdCheck(videoId){
    return new Promise((resolve, reject) =>{
        chrome.storage.local.get(['videoList'], function(data){
            if(data.videoList != undefined){
                data.videoList.forEach(element => {
                    if(element.Id == videoId){
                        resolve(true);
                    }
                })
                resolve(false);
            }
        });
    })
}
