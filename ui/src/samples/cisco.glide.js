var webexccurl = 'https://desktop.wxcc-us1.cisco.com';

var ga = new GlideAjax('propUtils');
ga.addParam('sysparm_name', 'getWebexccProp');
ga.getXMLWait();
var prop = JSON.parse(ga.getAnswer());
webexccurl = prop.url;


var adaf = document.getElementById('ccone-fr');

adaf.height = '600';
adaf.width = '550';

adaf.src = webexccurl;


window.addEventListener('message', function (eventArgs) {
    if (onMessage) {
        onMessage(eventArgs);
    } else {
        jslog('ERROR: SNOW2 onMessage is null.');
    }


}, false);

var myMap = new Map();

function onMessage(message) {
    jslog('WebexCC UI page onMessage:', message);
    var calldata = JSON.parse(message.data);
    jslog('SNOW Test UI page onMessage calldata:', calldata.entityApiName);
    if (calldata.msgType == "ScreenPop") {
        jslog('SNOW Test UI page onMessage= phone:', calldata.ani);
        screenpop(calldata.ani, calldata.callSessionInfo);
    }
    if (calldata.entityApiName == "Task") {
        jslog('SNOW Test UI page onMessage= phone:', calldata.ani);
        nowActivities(calldata, calldata.ani);
    }
    if (calldata.msgType == "CREATE_OR_OPEN_SNOW_RECORD" || calldata.msgType == "ASSOCIATE_CRM_RECORD_TO_ACTIVITY" || calldata.msgType == "OPEN_ACTIVITY_RECORD") {
        jslog('SNOW Test UI page onMessage= phone:', calldata.ani);

        if (myMap.has(calldata.msgTypeDatetimeInEPOCH)) {
            return;
        } else {
            myMap.set(calldata.msgTypeDatetimeInEPOCH, 'doesNotMatter');
            actionswidget(calldata.callSessionInfo, calldata.msgType);
        }

    }
}

//Actions widget
function actionswidget(callSessionInfo, msgType) {

    var callerani = stripPrefixes(callSessionInfo.phoneNumber);

    if (msgType == "CREATE_OR_OPEN_SNOW_RECORD") {
        var gaout = new GlideAjax('propUtils');
        gaout.addParam('sysparm_name', 'createNew');
        gaout.addParam('field', 'phone');
        gaout.addParam('value', callerani);
        gaout.getXMLWait();

        var sysObj = JSON.parse(gaout.getAnswer());
        var intsid = -1;
        if (localStorage.hasOwnProperty("intsid")) {
            intsid = localStorage.getItem("intsid");
        }
        if (sysObj.incsysid) {
            openFrameAPI.openServiceNowForm({
                entity: 'incident',
                query: 'sys_id=' + sysObj.incsysid,
                'interaction_sys_id': intsid
            });
        } else {
            openFrameAPI.openServiceNowForm({
                entity: 'incident',
                query: 'sys_id=-1',
                'interaction_sys_id': intsid //sysObj.sysid   
            });
        }

    } else if (msgType == "ASSOCIATE_CRM_RECORD_TO_ACTIVITY") {
        var actInfo = {};
        actInfo.ani = callerani;
        actInfo.dnis = callSessionInfo.dnis;
        actInfo.queuename = callSessionInfo.queuename;
        actInfo.ringingtime = callSessionInfo.ringTime;
        //webexcc.u_activitydate =actInfo.ActivityDate;
        actInfo.callobject = callSessionInfo.interactionId;
        actInfo.calltype = callSessionInfo.direction;
        actInfo.callNotes = callSessionInfo.callNotes;

        //alert(actInfo);
        var gaout = new GlideAjax('propUtils');
        gaout.addParam('sysparm_name', 'setAssociateRecord');
        gaout.addParam('actInfo', JSON.stringify(actInfo));
        gaout.addParam('ani', callerani);
        gaout.getXMLWait();
        var sysidRes = JSON.parse(gaout.getAnswer());

    } else if (msgType == "OPEN_ACTIVITY_RECORD") {
        openFrameAPI.openServiceNowList({ entity: 'sn_openframe_phone_log', query: 'call_id=' + callSessionInfo.phoneNumber });
        // openFrameAPI.openServiceNowForm({
        // 	entity: 'sn_openframe_phone_log',
        // 	query: 'sys_id=-1&amp;sysparm_query=call_type=INBOUND'
        // });

    }

}

// screen pop
function screenpop(callerani, callSessionInfo) {


    if (callerani === callSessionInfo.phoneNumber) {
        callerani = stripPrefixes(callerani);
    }

    var gaout = new GlideAjax('propUtils');
    gaout.addParam('sysparm_name', 'UserGetSysId');
    gaout.addParam('field', 'phone');
    gaout.addParam('value', callerani);
    gaout.getXMLWait();
    // var sysid = gaout.getAnswer();
    var sysObj = JSON.parse(gaout.getAnswer());
    localStorage.setItem("intsid", sysObj.sysid);
    if (sysObj.incsysid) {
        openFrameAPI.openServiceNowForm({
            entity: 'incident',
            query: 'sys_id=' + sysObj.incsysid,
            'interaction_sys_id': sysObj.sysid
        });
    } else {
        openFrameAPI.openServiceNowForm({
            entity: 'incident',
            query: 'sys_id=-1',
            'interaction_sys_id': sysObj.sysid
        });
    }

}

//  phone format in servicenow
function stripPrefixes(param) {
    var phone = param + '';
    phone = phone.replace('+', '');
    phone = phone.replace(' ', '');
    if (phone.length > 10 && parseInt(phone.substr(0, 1)) === 1) {
        phone = phone.substr(1);
        var inputPhone1 = phone.substr(0, 3);
        var inputPhone2 = phone.substr(3, 3);
        var inputPhone3 = phone.substr(6, 4);
        phone = '(' + inputPhone1 + ') ' + inputPhone2 + '-' + inputPhone3;
    } else if (phone.length == 10) {
        var inputPhone1a = phone.substr(0, 3);
        var inputPhone2a = phone.substr(3, 3);
        var inputPhone3a = phone.substr(6, 4);
        phone = '(' + inputPhone1a + ') ' + inputPhone2a + '-' + inputPhone3a;
    }

    return phone;
}

// Creating the activity record in servicenow table
function nowActivities(actInfo, ani) {
    localStorage.setItem("intsid", -1); //remove local storage value after call
    var gaout = new GlideAjax('propUtils');
    gaout.addParam('sysparm_name', 'setWebexcctable');
    gaout.addParam('actInfo', JSON.stringify(actInfo));
    gaout.addParam('ani', stripPrefixes(ani));
    gaout.getXML(SetCCsysId);


}

function SetCCsysId(response) {
    var msg = response.responseXML.documentElement.getAttribute("answer");
    if (msg) {
        //msg;

    }
}

openFrameAPI.subscribe(openFrameAPI.EVENTS.COMMUNICATION_EVENT, function (eventArgs) {

    if (eventArgs.type === 'OUTGOING_CALL') {
        adaf.contentWindow.postMessage(JSON.stringify(eventArgs), webexccurl);
    }

});