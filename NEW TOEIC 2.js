//第二次作答 (滿分)
function run() {
        var data_Q_s = window.localStorage.getItem("data_Q");
        var data_Q = data_Q_s.split("|");
        var data_A_s = window.localStorage.getItem("data_A");
        var data_A = data_A_s.split("|");

        var raw_table = $("table[cellspacing=5]");

        for(var i=0;i<raw_table.length;i++){
            var temp_Q = $($(raw_table[i]).find("b")).text().trim();
            for(var p=1;p<data_Q.length;p++){
                if(data_Q[p].indexOf(temp_Q) == 0) {
                    //已找到題目
                    var Option_s = $($(raw_table[i]).find("td label"));

                    for(var p2=0;p2<Option_s.length;p2++){
                        var Option = $(Option_s[p2]).text();
                        Option = Option.substring(4,Option.length);

                        var Seikai = data_A[p];
                        Seikai = Seikai.substring(4,Seikai.length-4);

                        if(Option == Seikai) {
                            //已找到答案
                            $($($(Option_s[p2]).parent()).find("input")).click();
                            //console.log(Seikai);
                        }
                    }
                }
            }
        }
    }
(function() {
    if(!window.jQuery)
    {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    setTimeout("run();",2000);
})();