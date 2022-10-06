function realOnOpen() {
    alert('open');
}

function updatePresence() {
    if(window.presenceOnline) {
        $('#chat-online-icon').removeClass('secondary').addClass('text-green');
        $('#chat-last-seen').html('Online');
    }
    else {
        $('#chat-online-icon').removeClass('text-green').addClass('secondary');
        if(window.presenceLastSeen == null) {
            $('#chat-last-seen').html('Offline');
        }
        else {
            var seconds = (Date.now() / 1000) - window.presenceLastSeen;
            $('#chat-last-seen').html('Seen ' + seconds + ' seconds ago');
        }
    }
}

$(document).on('ptidVerified', function() {
    window.presenceOnline = false;
    window.presenceLastSeen = null;
    
    setInterval(updatePresence, 1000);
    updatePresence();
    
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
        window.presenceOnline = presence.online;
        if(typeof(presence.last_seen) != 'undefined')
            window.presenceLastSeen = presence.last_seen;
        
        updatePresence();
    });
    
    window.chatClient.on('typing', function() {
        //
    });
    
    window.chatClient.on('message', function(msg) {
        //
    });
    
    window.chatClient.open();
});