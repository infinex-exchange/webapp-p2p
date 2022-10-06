function nl2br(str) {
    return str.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
}