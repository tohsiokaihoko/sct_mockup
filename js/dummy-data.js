var DUMMY_DATA_LOADED = true;

var USER_DATA = [{
    id:1,
    name:"kaihoko",
    thumb:"images/thumb_01.png"
},{
    id:2,
    name:"kazuto",
    thumb:"images/thumb_02.png"
},{
    id:3,
    name:"iimura",
    thumb:"images/thumb_03.png"
},{
    id:4,
    name:"saku",
    thumb:"images/thumb_04.png"
},{
    id:5,
    name:"iijima",
    thumb:"images/thumb_05.png"
}];

var POAT_DATA = [{
    id:1, 
    name:"kaihoko", 
    thumb:"images/thumb_01.png", 
    date:"06:12 PM", 
    comments:[{user:USER_DATA[1], text:"コメントコメントコメントコメント"}], 
    likes:[USER_DATA[1],USER_DATA[2]], 
    text:"ＷＢＣ２次ラウンド１組（１２日、日本－オランダ、東京ドーム）３連覇へ決勝ラウンド進出を決めた日本は、３大会目で初の２次リーグ１位通過を目指し、オランダと対戦する。"
},{
    id:2, 
    name:"kazuto", 
    thumb:"images/thumb_02.png", 
    date:"03:10 PM", 
    comments:[], 
    likes:[], 
    text:"シオンで選手兼監督を務めている元イタリア代表MFジェンナーロ・ガットゥーゾは、今シーズン限りでスパイクを脱ぐことを考えているようだ。"
},{
    id:3, 
    name:"iimura", 
    thumb:"images/thumb_03.png", 
    date:"01:02 PM", 
    comments:[{user:USER_DATA[3], text:"ほげほげほげ"}], 
    likes:[], 
    text:"「ＷＢＣ・２次ラウンド１組１位決定戦、日本１０‐６オランダ」（１２日、東京ド）. ２次ラウンド１組の１位決定戦が行われ、日本が巨人・阿部慎之助捕手（３３）の「１イニング２本塁打」などで二回に一挙８点を挙げて逆転勝ちし、同組１位となった。"
},{
    id:4, 
    name:"saku", 
    thumb:"images/thumb_04.png", 
    date:"11:22 AM", 
    comments:[], 
    likes:[USER_DATA[4],USER_DATA[5]], 
    text:"火星のゲイルクレーターの岩石（右）には生命活動に適した水環境の特徴がみられる。別の探査車が以前、別の場所で撮影した岩石（左）には強い酸性を示す特徴があり、微生物は生存できなかったと考えられている（ＮＡＳＡ提供・共同）"
},{
    id:5, 
    name:"iijima", 
    thumb:"images/thumb_05.png", 
    date:"11:15 AM", 
    comments:[], 
    likes:[], 
    text:"本日2013年の3月10日、太陽に『パンスターズ彗星』という彗星が最接近します。それに伴い、3月10日ごろから4月の下旬にかけて「肉眼での観測チャンス」が訪れます。"
},{
    id:6, 
    name:"sato", 
    thumb:"images/thumb_02.png", 
    date:"11:13 AM", 
    comments:[], 
    likes:[], 
    text:"米Googleは現地時間2013年3月12日、拡張現実（AR）機能を組み込んだめがね型ウエアラブル機器「Google Glass」の開発プロジェクト「Project Glass」において、視力矯正めがねにも対応することを明らかにした。"
},{
    id:7, 
    name:"yamada", 
    thumb:"images/thumb_01.png", 
    date:"10:12 AM", 
    comments:[], 
    likes:[], 
    text:"米GoogleのWebメール「Gmail」は、モバイル端末向けのWebアプリケーションを新しくした。米Appleの「iOS」向けアプリに近い操作画面や機能を採用しており、iOSはもちろん米Googleの「Android」搭載端末などからでも専用のURLにアクセス、ログインすると利用できる。"
}];
