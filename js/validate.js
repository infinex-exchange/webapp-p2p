function validateP2PNickname(nickname) {
    var lc = nickname.toLowerCase();
    if(lc.startsWith('client') || lc.startsWith('vpay')) return false;
    return nickname.match(/^[a-zA-Z0-9]{2,64}$/);
}