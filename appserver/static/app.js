require([
    'underscore',
    'backbone',
    '../app/Splunk-Modal-Window/components/ModalView',
    'splunkjs/mvc',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/ready!'
], function(_, Backbone, ModalView, mvc, SearchManager) {

    var master = mvc.Components.get("master");
    var tokens = mvc.Components.getInstance("submitted");
    
	var detailSearch = new SearchManager({
            id: "detailSearch",
            earliest_time: "-24h@h",
            latest_time: "now",
            preview: true,
            cache: false,
            search: "index=_internal sourcetype=$sourcetype$ | timechart count" 
    }, {tokens: true, tokenNamespace: "submitted"});  

    master.on("click", function(e) {
        e.preventDefault();
        if(e.field === "sourcetype") {
            var _title = e.data['click.value'];
            tokens.set('sourcetype', _title);
            var modal = new ModalView({ title: _title, search: detailSearch });
            modal.show();
        }
        
    });

});