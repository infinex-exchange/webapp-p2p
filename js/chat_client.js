class ChatClient {
    constructor(url, onOpen = null, onClose = null) {
        this.url = url;
        this.onOpen = onOpen;
        this.onClose = onClose;
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
            
            if(t.onOpen != null)
                t.onOpen();
            
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
            
            if(t.onClose != null && !t.onCloseCalled) {
	            t.onCloseCalled = true;
                t.onClose();
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
            if(t.onClose != null && !t.onCloseCalled) {
	            t.onCloseCalled = true;
                t.onClose();
            }
            t.ws.close();
        }, 2000);
        
        t.pingId = t.randomId();
        
        t.send({
            op: 'ping',
            id: t.pingId
        });
    }
    
    auth(apiKey, ptid, respCallback, errorCallback) { 
        this.authId = this.randomId();
        this.authRespCb = respCallback;
        this.authErrorCb = errorCallback;
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
                    t.authRespCb();
                }
                else {
                    t.authErrorCb(msg.error);
	                delete t.apiKey;
	                delete t.ptid;
	                delete t.authRespCb;
	                delete t.authErrorCb;
	            }
	            
	            delete t.authId;
            }
        }
            
        else if(msg.class == 'data') {
            /*for(var stream in t.subDb) {
                if(msg.stream == stream)
                    t.subDb[stream]['dataCallback'](msg);
            }*/
        }
    }
    
    unsub(streams, errorCallback) {
        var t = this;
        
        var streamsArr = streams;
        if(typeof(streams) === 'string')
            streamsArr = new Array(streams);
            
        var id = t.randomId();
        
        $.each(streamsArr, function(k, stream) {
            t.subDb[stream]['status'] = 'unsub_wait';
            t.subDb[stream]['id'] = id;
        });
        
        t.send({
            op: 'unsub',
            streams: streams,
            id: id
        });
    }
}