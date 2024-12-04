var config = {
    height: 300,
    width: 200
}

const handleCommunicationEvent = (context) => {
    console.log("Communication from Topframe", context);
}

const initSuccess = (snConfig) => {
    console.log("openframe configuration", snConfig);
    //register for communication event from TopFrame
    openFrameAPI.subscribe(openFrameAPI.EVENTS.COMMUNICATION_EVENT,
        handleCommunicationEvent);
}
const initFailure = (error) => {
    console.log("OpenFrame init failed..", error);
}

const setupEventListeners = (document) => {
    openFrameAPI.init(config, initSuccess, initFailure);

    document.getElementById("newInteraction").addEventListener("click", triggerNewInteraction);
    document.getElementById("closeInteraction").addEventListener("click", triggerCloseInteraction);
    document.getElementById("search").addEventListener("click", search);
    document.getElementById("newCase").addEventListener("click", newCase);
    document.getElementById("updateCase").addEventListener("click", updateCase);
    document.getElementById("openContact").addEventListener("click", openContact);
    document.getElementById("openCase").addEventListener("click", openCase);
}

const triggerNewInteraction = () => {
    console.log("New Interaction Triggered");
    // var data = {
    //     "message": "Hello from Snowflake"
    // }
    // openFrameAPI.publish(openFrameAPI.EVENTS.COMMUNICATION_EVENT, data);
}

const triggerCloseInteraction = () => {
    console.log("Close Interaction Triggered");
    // var data = {
    //     "message": "Close from Snowflake"
    // }
    // openFrameAPI.publish(openFrameAPI.EVENTS.COMMUNICATION_EVENT, data);
}

const search = () => {
    console.log("Search Triggered");
}

const newCase = () => {
    console.log("New Case Triggered");
}

const updateCase = () => {
    console.log("Update Case Triggered");
}

const openContact = () => {
    console.log("Open Contact Triggered");
}

const openCase = () => {
    console.log("Open Case Triggered");
}

export { setupEventListeners }