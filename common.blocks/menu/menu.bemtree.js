var data = require('../data.js');

block('menu').content()(function() {
    var ctx = this.ctx;
    var active = ctx.active;
    return data.map(function(link){
        if (link.url.indexOf(active) === -1){
            return link;
        }
        return Object.assign({}, link, {url: false});
    });
});