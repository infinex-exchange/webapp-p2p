window.addEventListener('message', function(event) {
    if(typeof event.data != 'object')
        return;
    
    converse.initialize({
		bosh_service_url: 'https://stream.sandbox.vayamos.cc/bosh/',
		view_mode: 'fullscreen',
		auto_login: true,
		jid: event.data.jid,
		password: event.data.password,
		discover_connection_methods: false,
		singleton: true,
		auto_join_private_chats: [ event.data.opposite_jid ]
	});
}, false);