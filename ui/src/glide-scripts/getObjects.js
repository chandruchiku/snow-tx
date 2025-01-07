var InstaCCTX = Class.create();
InstaCCTX.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    getObjects: function() {
        var objectType = this.getParameter('sysparm_object_type');
        var searchEntity = this.getParameter('sysparm_search_entity');
        var searchQuery = this.getParameter('sysparm_search_query');
        var object = new GlideRecord(objectType);
        object.addQuery(searchEntity, searchQuery);
        object.query();
        var objects = [];
        while (object.next()) {
            var obj = {};
            obj.sys_id = object.sys_id.toString();
            obj.display_value = object.getDisplayValue();
            objects.push(obj);
        }
    },
    type: 'InstaCCTX'
});