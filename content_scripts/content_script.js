(function() {
    console.log("hello i am here");
if (window.hasRun) {
    console.log("hello i am here");

    return;
  }
  window.hasRun = true;

var start_id;
var offline_id;


function came_online(){
    let status = document.querySelector("span[title='online']");
    let person = document.querySelector("#main span[dir='auto']");
    var current = new Date();
    var online_time = current.toLocaleString();
    // console.log("Started Stalking "+person.innerHTML+" at " + online_time);

    // while(status == null && flag === 1)
    // {
    //     console.log("why i am not coming out of loop 1");
    //     status = document.querySelector(span[title='online']);
    // }
    // console.log("came out of loop 1");
    
    // online_time = current.toLocaleString();
    if(status != null){
        console.log(person.innerHTML+" came online at " + online_time);
        clearInterval(start_id);
        offline_id = setInterval(gone_offline,500);
    }
    // else
    // {
    //     console.log("Stopped Stalking " + person.innerHTML +" at " +online_time);
    //     return;
    // }
}

function gone_offline(){
    let status = document.querySelector("span[title='online']");
    let person = document.querySelector("#main span[dir='auto']");
    var current = new Date();
    var online_time = current.toLocaleString();

    if(status == null){
        console.log(person.innerHTML+" gone offline at " + online_time);
        clearInterval(offline_id);
        start_id = setInterval(came_online,500);
    }
}

browser.runtime.onMessage.addListener((message) => {
    // console.log("In message listner ");
    if(message.command == "start")
    {
        console.log("Started stalking");
        start_id = setInterval(came_online,500);
    }
    else if (message.command == "stop")
    {
        clearInterval(start_id);
        clearInterval(offline_id);
        clearInterval(start_id);
        console.log("Stopped stalking");
    }
});
})();