class ChatClient {
    constructor(url) {
        this.url = url;
        this.callbacks = new Object();
        this.reconDelay = 0;
        this.onCloseCalled = false;
    }
    
    open() {
        var t = this;
        
        t.connTimeout = setTimeout(function() {
	        t.ws.close();
	    }, 5000);
        
        t.ws = new WebSocket(t.url);
               
        t.ws.onopen = function(e) {
	        clearTimeout(t.connTimeout);
	        t.reconDelay = 0;
	        
            t.pingInterval = setInterval(function() {
                t.ping();
            }, 5000);
            
            if(typeof(t.apiKey) !== 'undefined')
	            t.auth(t.apiKey, t.ptid, t.authRespCb, t.authErrorCb);
            
            if(typeof(t.callbacks['open']) != 'undefined')
                t.callbacks['open']();
            
            t.onCloseCalled = false;
        }
        
        t.ws.onclose = function(e) {
	        t.ws = null;
	        
            clearTimeout(t.connTimeout);
            if(t.reconDelay < 20000)
	            t.reconDelay += 1000;
	        
	        clearTimeout(t.pingTimeout);
	        clearInterval(t.pingInterval);
            
            setTimeout(function() {
	            t.open();
            }, t.reconDelay);
            
            if(typeof(t.callbacks['open']) != 'undefined' && !t.onCloseCalled) {
	            t.onCloseCalled = true;
                t.callbacks['close']();
            }
        }
        
        t.ws.onmessage = function(e) {
            var msg = JSON.parse(e.data);
            t.process(msg);
        }
    }
    
    ping() {
        var t = this;
        
        t.pingTimeout = setTimeout(function() {
            if(typeof(t.callbacks['open']) != 'undefined' && !t.onCloseCalled) {
	            t.onCloseCalled = true;
                t.callbacks['close']();
            }
            t.ws.close();
        }, 2000);
        
        t.pingId = t.randomId();
        
        t.send({
            op: 'ping',
            id: t.pingId
        });
    }
    
    auth(apiKey, ptid) { 
        this.authId = this.randomId();
        this.apiKey = apiKey;
        this.ptid = ptid;
        
        this.send({
            op: 'auth',
            id: this.authId,
            api_key: this.apiKey,
            ptid: this.ptid
        });
    }
    
    send(obj) {
        if(this.ws && this.ws.readyState === this.ws.OPEN)
            this.ws.send(JSON.stringify(obj));
    }
    
    randomId() {
        return Math.floor(Math.random() * 10000) + 1;
    }
    
    process(msg) {
        var t = this;
        
        if(msg.class == 'resp') {
            if(msg.id == t.pingId) {
                clearTimeout(t.pingTimeout);
                delete t.pingId;
                return;
            }
            
            if(msg.id == t.authId) {
                if(msg.success) {
                    if(typeof(t.callbacks['authSuccess']) != 'undefined')
                        t.callbacks['authSuccess']();
                }
                else {
                    if(typeof(t.callbacks['authFailed']) != 'undefined')
                        t.callbacks['authFailed'](msg.error);
	                delete t.apiKey;
	                delete t.ptid;
	            }
	            
	            delete t.authId;
            }
        }
            
        else if(msg.class == 'data') {
            if(typeof(t.callbacks[msg.event]) != 'undefined')
                t.callbacks[msg.event](msg);
        }
    }
    
    function on(event, callback) {
        this.callbacks[event] = callback;
    }
    
    function sendTyping() {
        this.send({
            id: this.randomId(),
            op: 'typing'
        });
    }
    
    function sendMessage(type, body) {
        this.send({
            id: this.randomId(),
            op: 'message',
            type: type,
            body: body
        });
    }
}