function realOnOpen() {
    $('.chat-footer-recon').addClass('d-none');
    $('.chat-footer-good').removeClass('d-none');
    doJsSizing();
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
            var lastSeenStr = formatLastSeen(seconds);
            $('#chat-last-seen').html('Seen ' + lastSeenStr + ' ago');
        }
    }
}

function sendChatMessage() {
    var body = $('#chat-input').val();
    if(body.trim().length == 0) return;
    
    window.chatClient.sendMessage('text', body);
    
    $('#chat-input').val('');
}

function formatLastSeen(seconds) {
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    if(d > 0) return d + (d == 1 ? " day" : " days");
    if(h > 0) return h + (h == 1 ? " hour" : " hours");
    if(m > 0) return m + (m == 1 ? " minute" : " minutes");
    return s + (s == 1 ? " second" : " seconds");
}

function formatMessageTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    var today = new Date();
    
    if(date.getDate() == today.getDate() &&
       date.getMonth() == today.getMonth() &&
       date.getFullYear() == today.getFullYear()
    ) {
        return date.toLocaleTimeString();
    }
    
    return date.toLocaleString();
}

$(document).on('ptidVerified', function() {
    window.presenceOnline = false;
    window.presenceLastSeen = null;
    
    setInterval(updatePresence, 1000);
    updatePresence();
    
    
    
    
    $("#chat-input").keypress(function (e) {
        if(e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
        
        var now = new Date().getTime();
        if(typeof(window.typingOutLastSent) == 'undefined' || now - window.typingOutLastSent > 1500) {
            window.chatClient.sendTyping();
            window.typingOutLastSent = now;
        } 
    });
    
    $('#chat-submit').click(function() {
        sendChatMessage();
    });




    window.chatClient = new ChatClient(p2pConfig.chatServerUrl);
    
    window.chatClient.on('open', function() {
        window.chatClient.auth(window.apiKey, window.ptid);
        window.chatClient.on('open', realOnOpen);
        realOnOpen();
    });
    
    window.chatClient.on('close', function() {
        $('.chat-footer-recon').removeClass('d-none');
        $('.chat-footer-good').addClass('d-none');
        doJsSizing();
    });
    
    window.chatClient.on('authFailed', msgBox);
    
    window.chatClient.on('presence', function(presence) {
        window.presenceOnline = presence.online;
        if(typeof(presence.last_seen) != 'undefined')
            window.presenceLastSeen = presence.last_seen;
        
        updatePresence();
    });
    
    window.chatClient.on('typing', function() {
        $('.chat-typing-vmsg').removeClass('d-none');
        $('#chat-data').scrollTop(999999);
        
        if(typeof(window.typingInTimeout) != 'undefined' && window.typingInTimeout !== null)
            clearTimeout(window.typingInTimeout);
        
        window.typingInTimeout = setTimeout(function() {
            $('.chat-typing-vmsg').addClass('d-none');
            window.typingInTimeout = null;
        }, 4000);
    });
    
    window.chatClient.on('message', function(msg) {
        if($('.chat-msg-item[data-timestamp="' + msg.time + '"]').length)
            return;
        
        if(msg.incoming && typeof(window.typingInTimeout) != 'undefined' && window.typingInTimeout !== null) {
            $('.chat-typing-vmsg').addClass('d-none');
            clearTimeout(window.typingInTimeout);
            window.typingInTimeout = null;
        }
        
        var incoming = '';
        if(msg.incoming) incoming = 'incoming';
        
        var body = msg.body.replace(/\n/g, '<br>');
        
        var time = formatMessageTimestamp(msg.time);
        
        var msgHtml = `
            <div class="row chat-msg-item" data-timestamp="${msg.time}">
            <div class="col-12 py-1">
                <div class="chat-msg ${incoming}">
                    <div class="row">
                        <div class="col-12">
                            ${body}
                        </div>
                        <div class="col-auto ms-auto">
                            <i class="small">${time}</i>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;
        
        if(typeof(window.mostRecentMsgTime) == 'undefined')
            window.mostRecentMsgTime = 0;
        
        if(msg.time > window.mostRecentMsgTime) {
            $(msgHtml).insertBefore('.chat-typing-vmsg');
            window.mostRecentMsgTime = msg.time;
        }
        else {
            $('#chat-data').prepend(msgHtml);
        }
        
        $('#chat-data').scrollTop(999999);
    });
    
    window.chatClient.open();
});

$(document).on('afterJsSizing', function() {
    $('#chat-data').scrollTop(999999);
});