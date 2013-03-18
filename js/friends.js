var Friend = Backbone.Model.extend({
    // 作成日時を保持
    initialize: function() {
        this.set({date: new Date()});
    }
});

var Friends = Backbone.Collection.extend({
    model: Friend
});

var FriendView = Backbone.View.extend({
    el: "#friends",
    events: {
        "click button": "addFriend" // #friends要素以下のbuttonにclickイベントを登録
    },
    initialize: function() {
        this.collection = new Friends();
        this.collection.bind("add", this.render, this); // collectionにaddされたらrenderを実行
    },
    render: function(friend) {
        $(this.el).children("ul").append(this.template(friend));
    },
    // friendを作成し、collectionに追加する
    addFriend: function() {
        var rand = Math.floor(Math.random()*this.nameTemplate.length);
        var name = this.nameTemplate[rand];
        var friend = new Friend({friendName: name});
        this.collection.add(friend);
    },
    template: function(friend) {
        return "<li>"+friend.get("friendName")+"</li>";
    },
    nameTemplate: [
        "山田",
        "小鳥遊",
        "種島",
        "伊波",
        "轟",
        "白藤",
        "佐藤",
        "相馬",
        "音尾"
    ]
});