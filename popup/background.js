
function listenForClicks(){ document.addEventListener("click" , (e) => {
    console.log("background 3");

    function start(tabs){
        browser.tabs.sendMessage(tabs[0].id,{
            command: "start",
        });
    }

    function stop(tabs){
        browser.tabs.sendMessage(tabs[0].id,{
            command: "stop",
        });
    }

    function reportError(error) {
        console.error(`Could not beastify: ${error}`);
      }

    if(e.target.classList.contains("start"))
    {
        browser.tabs.query({active: true, currentWindow: true})
        .then(start)
        .catch(reportError);
    }
    else if(e.target.classList.contains("stop"))
    {
        browser.tabs.query({active: true, currentWindow: true})
        .then(stop)
        .catch(reportError);
    }
});
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
  }
  

browser.tabs.executeScript({file: "/content_scripts/content_script.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);