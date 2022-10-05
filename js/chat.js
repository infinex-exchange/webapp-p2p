function realOnOpen() {
    alert('open');
}

$(document).on('ptidVerified', function() {
    window.chatClient = new ChatClient(p2pConfig.chatServerUrl);
    
    window.chatClient.on('open', function() {
        window.chatClient.auth(window.apiKey, window.ptid);
        window.chatClient.on('open', realOnOpen);
        realOnOpen();
    });
    
    window.chatClient.on('close', function() {
        alert('close');
    });
    
    window.chatClient.on('authFailed', msgBox);
    
    window.chatClient.on('presence', function(presence) {
        alert(presence);
    });
    
    window.chatClient.on('typing', function() {
        alert('typing');
    });
    
    window.chatClient.on('message', function(msg) {
        alert(msg.body);
    });
    
    window.chatClient.open();
});