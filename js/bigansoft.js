$(document).ready(function() {
    var pos = 0;
    var len = $('#shots li').length;
    var itimer = null
    var active = false;
    $('#marquee ul').width(len * 800);
    $('#shots').width(len * 962);
    $('#slider-next').bind('click', function(e) {
        if(active) return;
        active = true;
        if(itimer != null) {
            clearInterval(itimer);
        }
        $('#shots').animate({'margin-left': '-=962'}, 500, function() {
            li = $('#shots li:first-child'); li.remove(); $('#shots').append(li);
            $('#shots').css('margin-left', '0px');
            itimer = setInterval(function() {
                $('#slider-next').click();
            }, 5000);
            active = false;
        }); 
        $('#marquee ul').animate({'margin-left': '-=800'}, 500, function() {
            li = $('#marquee ul li:first-child'); li.remove(); $('#marquee ul').append(li);
            $('#marquee ul').css('margin-left', '0px');
        });
        pos += pos == (len - 1) ? -(len - 1) : 1;
        $('#slider-buttons li').removeClass('selected');
        $('#slider-buttons li.m' + pos.toString()).addClass('selected');
    });
    $('#slider-prev').bind('click', function(e) {
        if(active) return;
        active = true;
        if(itimer != null) {
            clearInterval(itimer);
        }
        li = $('#shots li:last-child'); li.remove(); $('#shots').prepend(li);
        $('#shots').css('margin-left', '-962px');
        $('#shots').animate({'margin-left': '+=962'}, 500, function() {
            $('#shots').css('margin-left', '0px');
            itimer = setInterval(function() {
                $('#slider-next').click();
            }, 5000);
            active = false;
        }); 
        lim = $('#marquee ul li:last-child'); lim.remove(); $('#marquee ul').prepend(lim);
        $('#marquee ul').css('margin-left', '-800px');
        $('#marquee ul').animate({'margin-left': '+=800'}, 500, function() {
            $('#marquee ul').css('margin-left', '0px');
        }); 
        pos -= pos == 0 ? -(len - 1) : 1;
        $('#slider-buttons li').removeClass('selected');
        $('#slider-buttons li.m' + pos.toString()).addClass('selected');
    });
    $('#slider-buttons li:not([id])').bind('click', function(e) {
        if(active) return;
        ds = parseInt($(this).attr('class').replace(/[a-zA-Z]/, ''));
        if(ds == pos - 1 || (ds == 2 && pos == 0)) {
            $('#slider-prev').click();
        }
        if(ds == pos + 1 || (ds == 0 && pos == 2)) {
            $('#slider-next').click();
        }
    });
    
    itimer = setInterval(function() {
        $('#slider-next').click();
    }, 5000);
    
    if($('ul.recomendations').is('ul')) {
        $('ul.recomendations > li > a.reco-link').lightBox({fixedNavigation:true});
    }
    
    if($('#subject').is('select')) {
        $('#subject').change(function(e) {
            $('#subject').parent().find('span').text($('#subject option:selected').text());
        });
        $('#subject').change();
    }
    
    if($('ul.slogans').is('ul')) {
        $('ul.slogans li').click(function(e) {window.location.href = $(this).find('h4 a').attr('href'); });
    }
    
})