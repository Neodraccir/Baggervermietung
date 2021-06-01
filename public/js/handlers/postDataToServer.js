function postDataToServer(xhr, url, data){

    xhr.open('POST', url, data, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);

    logThis(`awaiting answer for these information:`);
    logThis(data);

    if(document.getElementsByTagName("main")[0].style.visibility !== "hidden"){
        loader.style.visibility = "visible"
    }


}

export {postDataToServer}