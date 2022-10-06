function realOnOpen() {
    console.log('open');
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
            var seconds = Math.floor((Date.now() / 1000) - window.presenceLastSeen);
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
        console.log('close');
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
        if($('.chat-msg-item[data-timestamp="' + msg.time + '"]').length)
            return;
        
        var incoming = '';
        if(msg.incoming) incoming = 'incoming';
        
        var msgHtml = `
            <div class="row chat-msg-item" data-timestamp="${msg.time}">
            <div class="col-12 py-1">
                <div class="chat-msg ${incoming}">
                    <div class="row">
                        <div class="col-12">
                            ${msg.body}
                        </div>
                        <div class="col-auto ms-auto">
                            <i class="small secondary">${msg.time}</i>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;
        
        $('#chat-data').append(msgHtml);
    });
    
    window.chatClient.open();
});