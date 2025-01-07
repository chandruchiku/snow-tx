var config = {
    height: 300,
    width: 200
}

// Sending communication event from topframe sample code: 
var payload = {
    "type": "CONTACT_OPENED",
    "data": {
        
    }
}
// var context = {"payload": payload, "method" : "openframe_communication" };
// CustomEvent.fireAll("openframe_request", context);

const handleCommunicationEvent = (context) => {
    console.log("Communication from Topframe", context);

    if(context && context.type === "OUTGOING_CALL")
    {
        console.log("Outgoing Call: ", context.data.metaData.phoneNumber);
    }
}

const initSuccess = (snConfig) => {
    console.log("initSuccess: openframe configuration", snConfig);
    //register for communication event from TopFrame
    openFrameAPI.subscribe(openFrameAPI.EVENTS.COMMUNICATION_EVENT,
        handleCommunicationEvent);
}
const initFailure = (error) => {
    console.log("OpenFrame init failed..", error);
}

const setupEventListeners = (document) => {

    console.log("Initializing OpenFrame API");
    openFrameAPI.init(config, initSuccess, initFailure);

    console.log("Setting up Event Listeners");
    document.getElementById("newIncident").addEventListener("click", triggerNewIncident);
    document.getElementById("closeIncident").addEventListener("click", triggerCloseIncident);
    document.getElementById("search").addEventListener("click", search);
    document.getElementById("newCase").addEventListener("click", newCase);
    document.getElementById("newContact").addEventListener("click", newContact);

    document.getElementById("btnGetCases").addEventListener("click", triggerGetCases);
    document.getElementById("btnGetContacts").addEventListener("click", triggerGetContacts);
}

const triggerGetContacts = () => {
    console.log("Get Contacts Triggered");
    const url = "/Snow/contacts";
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        var res = response.json();
        var listHolder = document.getElementById("caseList");
        listHolder.innerHTML = "";
        res.then(data => {
            console.log("Data: ", data);
            data.forEach(element => {
                var listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode(element.sys_id + " " + element.name));
                listHolder.appendChild(listItem);
            });
        });

    }).then(data => {
        console.log("Data: ", data);
    }).catch(error => {
        console.log("Error: ", error);
    });
}

const triggerGetCases = () => {
    console.log("Get Cases Triggered");
    const url = "/Snow/cases";
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        var res = response.json();
        var listHolder = document.getElementById("caseList");
        listHolder.innerHTML = "";
        res.then(data => {
            console.log("Data: ", data);
            data.forEach(element => {
                var listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode(element.sys_id + " " + element.number));
                listHolder.appendChild(listItem);
            });
        });

    }).then(data => {
        console.log("Data: ", data);
    }).catch(error => {
        console.log("Error: ", error);
    });
}

const triggerNewIncident = () => {
    console.log("New Incident Triggered");

    const incidentData = {
        short_description: "Incident created from TX application",
        description: "This incident is being created using the OpenFrameAPI",
        caller_id: "",
        assignment_group: ""
    };

    // openFrameAPI.openServiceNowForm("incident", incidentData);
    openFrameAPI.openServiceNowForm({ entity: 'incident', query: 'sys_id=-1' });
}

const triggerCloseIncident = () => {
    console.log("Close Incident Triggered");
    openFrameAPI.closeFrame();
}

const search = () => {
    console.log("Search Triggered");

    const searchTable = document.getElementById("entity").value;
    const searchType = document.getElementById("type").value;
    const searchSource = document.getElementById("source").value;
    const searchQuery = document.getElementById("title").value;

    console.log("Search Entity: ", searchTable);
    console.log("Search Type: ", searchType);
    console.log("Search Source: ", searchSource);

    if(searchSource === "frame")
    {
        console.log("Search Source: Frame");
        openFrameAPI.openServiceNowList({ entity: searchTable, query: searchType + "=" + searchQuery });
    }
    else if(searchSource === "api")
    {
        console.log("Search Source: API");
        const url = "/Snow/search?table=" + searchTable + "&property=" + searchType + "&value=" + searchQuery;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            var res = response.json();
            var listHolder = document.getElementById("caseList");
            listHolder.innerHTML = "";
            res.then(data => {
                console.log("Data: ", data);
                data.forEach(element => {
                    var listItem = document.createElement("li");
                    listItem.appendChild(document.createTextNode(element.sys_id + " " + element.number));
                    listHolder.appendChild(listItem);
                });
            });

        }).then(data => {
            console.log("Data: ", data);
        }).catch(error => {
            console.log("Error: ", error);
        });
    }
}

const newCase = () => {
    console.log("New Case Triggered");
    openFrameAPI.openServiceNowForm({ entity: 'sn_customerservice_case', query: 'sys_id=-1' });
}

const newContact = () => {
    console.log("Update Case Triggered");
}

const openContact = () => {
    console.log("Open Contact Triggered");

    const contactData = {
        first_name: "John",
        last_name: "Doe",
        email: ""
    };

    openFrameAPI.openServiceNowForm({ entity: 'contact', query: 'sys_id=-1' });
}

const openCase = () => {
    console.log("Open Case Triggered");

    const searchQuery = document.getElementById("title").value;
    openFrameAPI.openServiceNowForm({ entity: 'case', query: 'number=' + searchQuery });

}

export { setupEventListeners }