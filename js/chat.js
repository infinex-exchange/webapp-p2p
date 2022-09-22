window.addEventListener('message', function(event) {
    if(typeof event.data != 'object')
        return;
    
    converse.initialize({
		bosh_service_url: 'https://conversejs.org/http-bind/',
		view_mode: 'fullscreen',
		auto_login: true,
		jid: event.data.jid,
		password: event.data.password
	});
}, false);