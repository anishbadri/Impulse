console.log("Hello");


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
        chrome.tabs.update(tabId, {url: chrome.runtime.getURL('index.html')});
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

function addVideoIdInStorage(videoId){
    chrome.storage.local.get(['videoList'], function(data){
        if(data.videoList == undefined){
            var array = []
            chrome.storage.local.set({videoList: array})
        }
        data.videoList.push(videoId);
        chrome.storage.local.set({videoList: data.videoList})
    })
}