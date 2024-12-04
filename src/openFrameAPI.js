/*! RESOURCE: /scripts/openframe/1.0.5/openFrameAPI.js */
SNC.OpenFrame = (function () {
    var EVENTS = {
        HEADER_ICON_CLICKED: 'openframe_header_icon_clicked',
        ICON_CLICKED: 'openframe_icon_clicked',
        TITLE_ICON_CLICKED: 'openframe_title_icon_clicked',
        OPENFRAME_SHOWN: 'openframe_shown',
        OPENFRAME_HIDDEN: 'openframe_hidden',
        OPENFRAME_BEFORE_DESTROY: 'openframe_before_destroy',
        COMMUNICATION_EVENT: 'openframe_communication',
        COMMUNICATION_FAILURE: 'openframe_communication_failure',
        EXPAND: 'openframe_expand',
        COLLAPSE: 'openframe_collapse',
    };

    var FRAME_MODE = {
        EXPAND: "expand",
        COLLAPSE: "collapse"
    };

    var INDICATOR_COLORS = {
        GREEN: "green",
        RED: "red",
        ORANGE: "orange",
        GREY: "grey"
    };
    var _version = '1.0.5';
    var _config = {};
    var _comm = SNC.Communication;
    var _validate = SNC.DataValidation;
    function init(config, successCallback, failureCallback) {
        _comm.init(function () {
            _comm.request(_comm.EVENTS.GET_CONFIG, config,
                successCallback, failureCallback);
        }, failureCallback);
    }
    function show() {
        _comm.publish(_comm.EVENTS.SHOW);
    }
    function hide() {
        _comm.publish(_comm.EVENTS.HIDE);
    }
    function isVisible(successCallback, failureCallback) {
        _comm.request(_comm.EVENTS.VISIBLE, {}, successCallback,
            failureCallback);
    }
    function setTitle(title) {
        if (_validate.stringValidation(title, true)) {
            _comm.publish(_comm.EVENTS.SET_HEADER_TITLE, {
                title: title
            });
        }
    }
    function setSubtitle(subtitle) {
        if (_validate.stringValidation(subtitle, true)) {
            _comm.publish(_comm.EVENTS.SET_HEADER_TITLE, {
                subtitle: subtitle
            });
        }
    }
    function setSize(width, height) {
        if (_validate.numberValidation(width) && _validate.numberValidation(height)) {
            _comm.publish(_comm.EVENTS.SET_SIZE, {
                width: width,
                height: height
            });
        }
    }
    function setWidth(width) {
        if (_validate.numberValidation(width)) {
            _comm.publish(_comm.EVENTS.SET_WIDTH, {
                width: width
            });
        }
    }
    function setHeight(height) {
        if (_validate.numberValidation(height)) {
            _comm.publish(_comm.EVENTS.SET_HEIGHT, {
                height: height
            });
        }
    }

    function setTitleIcon(icon) {
        if (_validate.objectValidation(icon)) {
            _comm.publish(_comm.EVENTS.SET_HEADER_TITLE_ICON, icon);
        }
    }
    function setIcons(iconList) {
        if (_validate.objectValidation(iconList)) {
            _comm.publish(_comm.EVENTS.SET_HEADER_ICONS, iconList);
        }
    }
    function subscribe(event, callback) {
        if (_comm.contains(this.EVENTS, event)) {
            _comm.subscribe(event, callback);
        }
        else {
            _validate.throwError(event + " is not a valid event for subscription");
        }
    }
    function openServiceNowForm(details) {
        if (_validate.objectValidation(details)) {
            if (details.query && _validate.queryStringValidation(details.query)) {
                _comm.publish(_comm.EVENTS.SET_TOP_FRAME_URL, { form: details });
            }
        }
    }
    function openServiceNowList(details) {
        if (_validate.objectValidation(details)) {
            if (details.query && _validate.queryStringValidation(details.query)) {
                _comm.publish(_comm.EVENTS.SET_TOP_FRAME_URL, { list: details })
            }
        }
    }
    function openCustomURL(url) {
        var details = { url: url };
        if (_validate.stringValidation(details.url, true, 2083) && _validate.customURLValidation(details.url)) {
            _comm.publish(_comm.EVENTS.SET_TOP_FRAME_URL, { url: details })
        }
    }
    function openInteraction(interactionSysId) {
        _comm.publish(_comm.EVENTS.OPEN_INTERACTION, { interaction_sys_id: interactionSysId });
    }

    function setFrameMode(mode) {
        if (_comm.contains(FRAME_MODE, mode)) {
            _comm.publish(_comm.EVENTS.SET_FRAME_MODE, mode);
        }
    }

    function setPresenceIndicator(state, color) {
        if (_comm.contains(this.INDICATOR_COLORS, color)) {
            _comm.publish(_comm.EVENTS.SET_PRESENCE_INDICATOR, { state: state, color: color });
        } else {
            _validate.throwError(color + " is not a valid color for presence indicator");
        }
    }

    function version() {
        return _version;
    }
    
    return {
        EVENTS: EVENTS,
        FRAME_MODE: FRAME_MODE,
        INDICATOR_COLORS: INDICATOR_COLORS,
        init: init,
        version: version,
        show: show,
        hide: hide,
        isVisible: isVisible,
        subscribe: subscribe,
        setTitle: setTitle,
        setSubtitle: setSubtitle,
        setSize: setSize,
        setIcons: setIcons,
        setTitleIcon: setTitleIcon,
        openServiceNowForm: openServiceNowForm,
        openServiceNowList: openServiceNowList,
        openCustomURL: openCustomURL,
        openInteraction: openInteraction,
        setFrameMode: setFrameMode,
        setHeight: setHeight,
        setWidth: setWidth,
        setPresenceIndicator: setPresenceIndicator
    };
})();
var openFrameAPI = SNC.OpenFrame;
;