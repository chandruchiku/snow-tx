var propUtils = Class.create();
propUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getWebexccProp: function () {
        var webexccprop = {};
        webexccprop.instanceurl = 'https://' + gs.getProperty('instance_name') + '.service-now.com/';
        webexccprop.url = gs.getProperty('agentdesktop_url');
        return JSON.stringify(webexccprop);

    },
    UserGetSysId: function () {
        var opened_for;

        var sysidlist = {};
        var user = new GlideRecordSecure("sys_user");
        user.addQuery(this.getParameter('field'), this.getParameter('value'));
        user.query();
        if (user.next()) {
            opened_for = user.sys_id;//return user.sys_id;
            var inc = new GlideRecordSecure('incident');
            inc.addQuery('caller_id', opened_for);
            inc.addQuery('state', 'IN', '1,2');
            inc.orderByDesc('sys_created_on');
            inc.query();
            if (inc.next()) {
                sysidlist.incsysid = inc.getUniqueValue();
            } else {
                inc.initialize();
                inc.caller_id = opened_for;
                inc.contact_type = 'phone';
                inc.short_description = 'Call Received From ' + this.getParameter('value');
                sysidlist.incsysid = inc.insert();
            }
        }
        var grInt = new GlideRecordSecure('interaction');
        grInt.initialize();
        grInt.assigned_to = gs.getUserID();
        grInt.type = 'phone';
        grInt.opened_for = opened_for;
        var sysid = grInt.insert();
        sysidlist.sysid = sysid;

        return JSON.stringify(sysidlist);//sysid;
    },
    createNew: function () {
        var opened_for;

        var sysidlist = {};
        var user = new GlideRecordSecure("sys_user");
        user.addQuery(this.getParameter('field'), this.getParameter('value'));
        user.query();
        if (user.next()) {
            opened_for = user.sys_id;//return user.sys_id;
            var inc = new GlideRecordSecure('incident');
            inc.initialize();
            inc.caller_id = opened_for;
            inc.contact_type = 'phone';
            inc.short_description = 'Call Received From ' + this.getParameter('value');
            sysidlist.incsysid = inc.insert();

        }
        // var grInt = new GlideRecordSecure('interaction');
        // 	grInt.initialize(); 
        // 	grInt.assigned_to= gs.getUserID(); 
        // 	grInt.type= 'phone'; 
        // 	grInt.opened_for= opened_for; 
        // var sysid=grInt.insert();
        // sysidlist.sysid=sysid;
        sysidlist.sysid = -1;

        return JSON.stringify(sysidlist);//sysid;
    },
    setAssociateRecord: function () {
        var sys_id = 0;

        //Activities on Incident record;
        var actInfoString = this.getParameter('actInfo');
        var suser = new GlideRecordSecure("sys_user");
        suser.addQuery("phone", this.getParameter('ani'));
        suser.query();
        if (suser.next()) {
            var inc = new GlideRecordSecure('incident');
            inc.addQuery('caller_id', suser.sys_id);
            inc.addQuery('state', 'IN', '1,2');
            inc.orderByDesc('sys_created_on');
            inc.query();
            if (inc.next()) {
                var jsonPretty = JSON.stringify(JSON.parse(actInfoString), null, 2);
                inc.comments = jsonPretty;
                inc.update();

            }
        }

        return sys_id;
    },
    setWebexcctable: function () {
        var sys_id = 0;

        var actInfo = JSON.parse(this.getParameter('actInfo'));
        var webexcc = new GlideRecordSecure(gs.getProperty('webexccactivitytable'));
        webexcc.addQuery("u_callobject", actInfo.CallObject);
        webexcc.query();
        if (!webexcc.next()) {
            webexcc.u_ani = actInfo.ani;
            webexcc.u_dnis = actInfo.dnis;
            webexcc.u_queuename = actInfo.queuename;
            webexcc.u_wrapuptime = actInfo.wrapuptime;
            webexcc.u_callduration = actInfo.CallDurationInSeconds;
            webexcc.u_ringingtime = actInfo.ringingtime;
            webexcc.u_activitydate = actInfo.ActivityDate;
            webexcc.u_callobject = actInfo.CallObject;
            webexcc.u_calltype = actInfo.CallType;
            webexcc.u_calldisposition = actInfo.CallDisposition;
            webexcc.u_callnotes = actInfo.callNotes;
            sys_id = webexcc.insert();

            //Activities on Incident record;
            var actInfoString = this.getParameter('actInfo');
            var suser = new GlideRecordSecure("sys_user");
            suser.addQuery("phone", this.getParameter('ani'));
            suser.query();
            if (suser.next()) {
                var inc = new GlideRecordSecure('incident');
                inc.addQuery('caller_id', suser.sys_id);
                inc.addQuery('state', 'IN', '1,2');
                inc.orderByDesc('sys_created_on');
                inc.query();
                if (inc.next()) {
                    var jsonPretty = JSON.stringify(JSON.parse(actInfoString), null, 2);
                    inc.comments = jsonPretty;
                    inc.update();

                }
            }

        }
        return sys_id;
    },
    type: 'propUtils'
});