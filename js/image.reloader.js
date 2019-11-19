'use strict';

var ImageReloader = (function () {

    var obj = {};
    var local = {};

    local.customs = {};

    local.customs.refresh = {
        icon: '<i class="fa fa-refresh" aria-hidden="true"></i>',
        text: 'Recargar'
    };

    local.customs.loading = {
        icon: '<i class="fa fa-refresh fa-spin" aria-hidden="true"></i>',
        text: 'Cargando...'
    };

    local.customs.images = {
        default: 'img/img-default.jpg',
        default720: 'img/img-default-720x478.jpg',
        default360: 'img/img-default-360x239.jpg',
        default180: 'img/img-default-180x120.jpg',
    };

    obj.init = function (props = null) {

        if (!props || !props.container) {
            console.error('Invalid properties');
            return;
        }

        if (props.customs && props.customs.refresh) local.container.refresh = props.customs.refresh;
        if (props.customs && props.customs.loading) local.container.loading = props.customs.loading;
        if (props.customs && props.customs.images) local.container.images = props.customs.images;

        props.container = typeof props.container == 'string' ? $(props.container) : props.container;

        props.container.find('img').on('error', function(event){
            event.target.src = local.customs.images.default360;
        });

        if (props.reload) {
            props.container.find('img').each(function(index, image){
                image.src = image.src + '?d=' + new Date().getTime(); 
            });    
        }
    
        props.container.find('img').wrap('<div class="image-wrapper-container"></div>');

        var button = '';
        button += '<button type="button" class="btn btn-sm btn-outline-secondary mx-auto my-2 d-block reload-action">';
        button += local.customs.refresh.icon + '&nbsp;' + local.customs.refresh.text;
        button += '</button>';

        props.container.find('.image-wrapper-container').append(button);

        props.container.find('.image-wrapper-container button.reload-action').click(function(event){
            event.preventDefault();
            local.reload(event.target);
        });
    };

    local.reload = function(target, timeout = 500) {
        var element = target.nodeName == 'I' ? $(target).closest('button') : $(target);
        var image = element.siblings('img');

        if (element.prop('disabled')) return; 

        element.prop('disabled', true);
        element.html(local.customs.loading.icon + '&nbsp;' + local.customs.loading.text);

        setTimeout(function(){
            var date = new Date();
            var http = image[0].src;
            var key = (http.indexOf('?') !== -1) ? (http.indexOf('?d') !== -1) ? '?d' : '&d' : '?d';
            if (http.indexOf(key) !== -1) {
                http = http.split(key + '=')[0];
            }
            image[0].src = http + key + '=' + date.getTime();

            element.prop('disabled', false);
            element.html(local.customs.refresh.icon + '&nbsp;' + local.customs.refresh.text);
            
        }, timeout);
    };

    return obj;
})();