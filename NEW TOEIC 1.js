//取得答案 (在作答完後執行 要在 mainFrame 作用  執行完後畫面不要關掉)
(function() {
    function run() {
        var raw_table = $("table[cellspacing=5]");
        var data_Q = Array(raw_table.length);
        var data_A = Array(raw_table.length);
        var data_Q_s = "data_Q";
        var data_A_s = "data_A";
        for(var i=0;i<raw_table.length;i++){
            data_Q[i] = $($(raw_table[i]).find("font")[0]).text();
            data_A[i] = $($($(raw_table[i]).find("font")[1]).parent()).text().trim();
            data_Q_s += "|"+data_Q[i];
            data_A_s += "|"+data_A[i];
        }
        window.localStorage.setItem("data_Q", data_Q_s);
        window.localStorage.setItem("data_A", data_A_s);
    }
    if(!window.jQuery)
    {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
})();