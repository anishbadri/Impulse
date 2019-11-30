
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

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM loaded");
//     // document.getElementsByClassName(".delete-video").onclick = function() {
//     //     console.log("Clicked");
//     // }

//     // document.querySelectorAll('button.delete-video').forEach(function(item){
//     //     // item.addEventListener('click', function(){
//     //     //     console.log(item);
//     //     // })
//     //     console.log(item);
//     // })
// });

window.setTimeout(addButtonListener, 5000);

function addButtonListener(){
    document.querySelectorAll('button.delete-video').forEach(function(item){
        item.addEventListener('click', function(){
            console.log("clicked" + item.classList[0]);
            removeVideoFromStorage(item.classList[0]).then((result) => {
                if (result){
                    removeVideoDiv(item)
                }
            });
        })
        // console.log(index + item);
    })
}

function removeVideoDiv(item){
    console.log("removed");
    var videoDiv = document.querySelector('#' + item.classList[0]);
    videoDiv.parentNode.removeChild(videoDiv);
}

function removeVideoFromStorage(videoId){
    return new Promise((resolve, reject) => { 
        chrome.storage.local.get(['videoList'], function(data){
            if(data.videoList != undefined){
                data.videoList.forEach((element, index) => {
                    console.log(element.Id + "  " + videoId)
                    if(element.Id == videoId){
                        data.videoList.splice(index, 1);
                        console.log(data.videoList);
                        chrome.storage.local.set({videoList: data.videoList});
                        resolve(true);
                    }
                    // console.log(element.Id)
                })
                resolve(false);
            }
        });
    })
    // console.log("removed");
}

const request = new Request('https://www.youtube.com/get_video_info?html5=1&video_id=' + '7mTGUzTgg08');

fetch(request).then(response => {
    console.log(response.status);
});


  
// var request = require('request');

// function qsToJson(qs) {
//   var res = {};
//   var pars = qs.split('&');
//   var kv, k, v;
//   for (i in pars) {
//     kv = pars[i].split('=');
//     k = kv[0];
//     v = kv[1];
//     res[k] = decodeURIComponent(v);
//   }
//   return res;
// }

// retrieve = function(id, callback) {
//   var url = 'https://www.youtube.com/get_video_info?html5=1&video_id=' + id;
  
//   request(url, function(err, res, body) {
//     if (!err && res.statusCode == 200) {
//       var get_video_info = qsToJson(body);
      
//       // remapping urls into an array of objects
//       var tmp = get_video_info["url_encoded_fmt_stream_map"];
//       if (tmp) {
//         tmp = tmp.split(',');
//         for (i in tmp) {
//           tmp[i] = qsToJson(tmp[i]);
//         }
//         get_video_info["url_encoded_fmt_stream_map"] = tmp;
//       }
      
//       // done
//       callback(null, get_video_info);
//     }
//     else {
//       console.log('(youtube.get-video.info) HTTP response not 200/OK');
//       callback(err, null);
//     }
//   });
// }

// var yt = require('youtube.get-video-info');
// yt.retrieve('ml-v1bgMJDQ', function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });











