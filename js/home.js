$(function(){
    var Post = Backbone.Model.extend({
        getText: function() {
            return this.splitTags(this.get("text"));
        },
        getTextShort: function() {
            var LENGTH = 30;
            var textShort = this.splitTags(this.get("text"));
            if(textShort.length > LENGTH){
                textShort = textShort.substring(0, LENGTH - 1) + "...";
            }
            return textShort;
        },
        getDateStr: function() {
            return this.get("date");
        },
        getCommentCount: function() {
            return this.get("comments").length;
        },
        getLikeCount: function() {
            return this.get("likes").length;
        },
        splitTags : function(text) {
            return text.replace(/<\/?[^>]+>/gi, "");
        }
    });

    window.TimelinePage = Backbone.View.extend({
        el: "#timeline",
        initialize: function() {
            console.log("TimelinePage.initialize()");
            this.reset();
        },
        render: function() {
            return this;
        },
        reset: function() {
            var list = $("#post-list");
            list.empty();
            this.head = $(this.templateHead()).appendTo(list);
            this.tail = $(this.templateTail()).appendTo(list);
            this.loadDummy();
        },
        add: function(post) {
            var list = $("#post-list");
            this.tail.before(this.template({text: post.getTextShort(), id: post.get("id"), thumb: post.get("thumb"), name: post.get("name"), commentCount: post.getCommentCount(), likeCount: post.getLikeCount(), date: post.getDateStr()}));
        },
        template: _.template(
            "<li id='<%= id %>'>\n\
                <img class='thumb' src='<%= thumb %>' />\n\
                <span class='name'><%= name %></span>\n\
                <span class='date'><%= date %></span>\n\
                <span class='text'><%= text %></span>\n\
                <span class='commentCount'>Comment:<%= commentCount %>\n\
                <span class='likeCount'>Like:<%= likeCount %></span>\n\
            </li>"
            ),
        detail: function(target, post) {
            var list = $("#post-list");

            var newTarget = $(this.templateDetail({
                    text: post.getText(), 
                    id: post.get("id"), 
                    thumb: post.get("thumb"), 
                    name: post.get("name"), 
                    commentCount: post.getCommentCount(), 
                    likeCount: post.getLikeCount(), 
                    date: post.getDateStr()
                }));

            target.after(newTarget);
            $('#post-list').listview('refresh');
            var targetHeight = newTarget.height();
            newTarget.height(target.height());
            newTarget.animate({ height: targetHeight});
            target.remove();
        },
        templateDetail: _.template(
            "<li id='<%= id %>' class='detail'>\n\
                <img class='thumb' src='<%= thumb %>' />\n\
                <span class='name'><%= name %></span>\n\
                <span class='date'><%= date %></span>\n\
                <span class='text'><%= text %></span>\n\
                <span class='commentCount'>Comment:<%= commentCount %>\n\
                <span class='likeCount'>Like:<%= likeCount %></span>\n\
            </li>"
            ),
        templateNew: _.template(
            "<li id='<%= id %>' class='new'>\n\
                <img class='thumb' src='<%= thumb %>' />\n\
                <span class='name'><%= name %></span>\n\
                <span class='date'><%= date %></span>\n\
                <span class='text'><%= text %></span>\n\
                <span class='commentCount'>Comment:<%= commentCount %>\n\
                <span class='likeCount'>Like:<%= likeCount %></span>\n\
            </li>"
            ),
        templateHead: _.template(
            "<li id='listHead'>&nbsp;</li>"
            ),
        templateTail: _.template(
            "<li id='listTail'>loading...</li>"
            ),
        loadMore: function() {
            console.log("timeline page loadMore");
            this.loadDummy();
        },
        loadDummy: function() {
            if(typeof DUMMY_DATA_LOADED != "undefined" && DUMMY_DATA_LOADED){
                for(var i in POAT_DATA) {
                    this.add(new Post(POAT_DATA[i]));
                }
            }
            $('#post-list').listview('refresh');
        },
        replaceDetailDummy: function(target) {
            if(typeof DUMMY_DATA_LOADED != "undefined" && DUMMY_DATA_LOADED){
                this.detail(target, new Post(POAT_DATA[target.attr("id")-1]));
            }
            $('#post-list').listview('refresh');
        },
        hideToolbar: function() {
            var str = "hideToolbar: " + $( "#timelineFooter" ).hasClass('ui-fixed-hidden')
                 + "," + $( "#timelineFooter" ).hasClass('out')
                 + "," + $( "#timelineFooter" ).hasClass('in')
                 + "," + $( "#timelineFooter" ).hasClass('reverse');
            if(!$( "#timelineFooter" ).hasClass('ui-fixed-hidden') &&
                !$( "#timelineFooter" ).hasClass('out') &&
                !$( "#timelineFooter" ).hasClass('reverse')){
                //console.log(str);
                $( "#timelineHeader" ).fixedtoolbar( "hide" );
                $( "#timelineFooter" ).fixedtoolbar( "hide" );
            }
        },
        showToolbar: function() {
            var str = "showToolbar: " + $( "#timelineFooter" ).hasClass('ui-fixed-hidden')
                 + "," + $( "#timelineFooter" ).hasClass('out')
                 + "," + $( "#timelineFooter" ).hasClass('in')
                 + "," + $( "#timelineFooter" ).hasClass('reverse');
            if($( "#timelineFooter" ).hasClass('ui-fixed-hidden') &&
                !$( "#timelineFooter" ).hasClass('out') &&
                !$( "#timelineFooter" ).hasClass('reverse')){
                //console.log(str);
                $( "#timelineHeader" ).fixedtoolbar( "show" );
                $( "#timelineFooter" ).fixedtoolbar( "show" );
            }
        },
        showDetail: function(target) {
            console.log("showDetail(" + target.attr("id") + ")");
            this.replaceDetailDummy(target);
        }
    });

    window.MessagePage = Backbone.View.extend({
        el: "#message",
        events: {
            //"click li": "changePage"
        },
        initialize: function() {
            this.reset();
        },
        render: function() {
            return this;
        },
        reset: function() {
        },
        changePage: function(event) {
            var title = "";
            var id = "";
            if(typeof page.talkPage === "undefined"){
                page.talkPage = new TalkPage(title);
            } else {
                //page.talkPage.reset(title);
            }
            page.talkPage.render(id);
            $.mobile.changePage("#talk");
        }
    });

    window.TalkPage = Backbone.View.extend({
        el: "#talk",
        initialize: function(title) {
            this.reset(title);
        },
        render: function(id) {
            return this;
        },
        reset: function(title) {
            $("#talk-title").text(title);
        },
    });

    window.GroupPage = Backbone.View.extend({
        el: "#group",
        initialize: function() {
            this.reset();
        },
        render: function() {
            return this;
        },
        reset: function() {
        }
    });

    window.GroupTalkPage = Backbone.View.extend({
        el: "#groupTalk",
        initialize: function() {
            this.reset();
        },
        render: function() {
            return this;
        },
        reset: function() {
        }
    });

    window.ProfilePage = Backbone.View.extend({
        el: "#profile",
        initialize: function() {
            this.reset();
        },
        render: function() {
            return this;
        },
        reset: function() {
        }
    });

    window.Footer = Backbone.View.extend({
        el: ".footer",
        events: {
            "click .timeline": "goToTimelineMode",
            "click .group": "goToGroupMode",
            "click .message": "goToMessageMode",
            "click .profile": "goToProfileMode"
        },
        initialize: function() {
            console.log("Footer.initialize()");
        },
        goToTimelineMode: function() {
            console.log("goToTimelineMode");
            if(typeof page.timelinePage === "undefined"){
                page.timelinePage = new TimelinePage();
            } else {
                //page.timelinePage.reset();
            }
            page.timelinePage.render();
            $.mobile.changePage("#timeline");
        },
        goToGroupMode: function() {
            console.log("goToGroupMode");
            if(typeof page.groupPage === "undefined"){
                page.groupPage = new GroupPage();
            } else {
                //page.groupPage.reset();
            }
            page.groupPage.render();
            $.mobile.changePage("#group");
        },
        goToMessageMode: function() {
            console.log("goToMessageMode");
            if(typeof page.messagePage === "undefined"){
                page.messagePage = new MessagePage();
            } else {
                //page.messagePage.reset();
            }
            page.messagePage.render();
            $.mobile.changePage("#message");
        },
        goToProfileMode: function() {
            console.log("goToProfileMode");
            if(typeof page.profilePage === "undefined"){
                page.profilePage = new ProfilePage();
            } else {
                //page.profilePage.reset();
            }
            page.profilePage.render();
            $.mobile.changePage("#profile");
        }
    });

    $(window).bind('scrollstop', function() {
        var activePageId = $.mobile.activePage.attr("id");
        switch (activePageId) {
            case "timeline":
                var w = $(this);
                if(w.scrollTop() + w.height() > $(document).height() - 65){
                    page.timelinePage.loadMore();
                }
                break;
            default:
                console.log("nothing to do");
        }
    });

    var swipeStart = function(){
        var start = {
            time: (new Date()).getTime(),
            coords: [event.touches[0].clientX, event.touches[0].clientY]
        };
        var stop = {};

        var target = $(event.target);
        if(!target.is("li")){
            target = target.parent("li");
        }

        var isSwiping = false;
        var isScrolling = false;
        var isScrollUp = undefined;
        var SCALE = 1;
        var THRESHOLD = 100;

        var moveHandler = function() {
            var _stop = {
                time: (new Date()).getTime(),
                coords: [event.touches[0].clientX, event.touches[0].clientY]
            };
            if(isSwiping){
                stop = _stop;
                var offset = target.position();
                target.offset({top:offset.top, left:((stop.coords[0] - start.coords[0]) * SCALE)});
                if(start.coords[0] - stop.coords[0] > THRESHOLD){
                    $("#post-list").css("background", "blue");
                } else if(stop.coords[0] - start.coords[0] > THRESHOLD){
                    $("#post-list").css("background", "green");
                } else {
                    $("#post-list").css("background", "none");
                }
                event.preventDefault();
                return;
            }
            if(stop.coords){
                if((_stop.time - stop.time) < 50){
                    return;
                }
                if(stop.coords[1] - _stop.coords[1] > 0){
                    isScrollUp = false;
                } else if(stop.coords[1] - _stop.coords[1] < 0){
                    isScrollUp = true;
                }
            }
            stop = _stop;
            if(isScrolling){
                return;
            }
            if(Math.abs(start.coords[0] - stop.coords[0]) > 30){
                if(Math.abs(start.coords[1] - stop.coords[1]) < 20){
                    console.log('Swiping!');
                    isSwiping = true;
                } else {
                    console.log('Scrolling');
                    isScrolling = true;
                }
            }
        };

        var stopHandler = function(){
            $('#post-list').unbind('touchmove', moveHandler);
            $('#post-list').unbind('touchend', stopHandler);
            if(isSwiping){
                var offset = target.position();
                if((offset.left * (-1)) > THRESHOLD){
                    console.log('swipeleft');
                    target.animate({ left: $('#post-list').width()*(-1) }, "", "", function(){
                        $( '#timelineShare' ).popup( 'open', {transition:"slide"} );
                        target.offset({top:offset.top, left:0});
                    });
                } else if(offset.left > THRESHOLD){
                    console.log('swiperight');
                    target.animate({ left: $('#post-list').width() }, "", "", function(){
                        $( '#timelineReply' ).popup( 'open', {transition:"slide"} );
                        target.offset({top:offset.top, left:0});
                    });
                } else {
                    target.animate({ left: 0 });
                    //target.offset({top:offset.top, left:0});
                }
            } else {
                if(isScrollUp === true){
                    page.timelinePage.showToolbar();
                } else if(isScrollUp === false){
                    page.timelinePage.hideToolbar();
                }
            }
        };

        $('#post-list').bind('touchmove', moveHandler);
        $('#post-list').bind('touchend', stopHandler);
    };
    $('#post-list').bind('touchstart', swipeStart);

    var tapStart = function(){
        console.log("tapStart");
        var _this = $(this);
        var target = $(event.target);
        if(!target.is("li")){
            target = target.parent("li");
        }
        console.log(_this);
        console.log(target);
        if(_this.data("dblTap")){
            _this.data("dblTap",false);
            //ダブルタップ時の命令
            console.log("doubletap");
            alert('doubletap');
        }else{
            console.log("dblTap === false");
            _this.data("dblTap",true);
            setTimeout(function(){
                console.log("timeout...");
                if(_this.data("dblTap")){
                    //タップ時の命令
                    console.log("tap");
                    page.timelinePage.showDetail(target);
                }
                _this.data("dblTap",false);
            },500);
        }
    };
    var doubletapStart = function(){
        console.log("tapStart");
        var _this = $(this);
        var target = $(event.target);
        if(!target.is("li")){
            target = target.parent("li");
        }
        if(_this.data("dblTap")){
            _this.data("dblTap",false);
            //ダブルタップ時の命令
            console.log("doubletap");
            if(target.hasClass("detail")){
                $.mobile.changePage("#timelineDetail");
            } else {
                page.timelinePage.showDetail(target);
            }
        }else{
            _this.data("dblTap",true);
        }
        setTimeout(function(){
            _this.data("dblTap",false);
        },500);
    };
    $("#post-list").bind("tap", doubletapStart);
});