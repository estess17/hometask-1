function cutText(text, length) {
    if (text.length > length) {
        let res = text.substring(0, length);
        let last = res.lastIndexOf(' ');
        res = res.substring(0, last);
        return res + `...`;
    } else return text;
}

export {cutText};