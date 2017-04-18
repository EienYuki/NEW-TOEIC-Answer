//第一次作答 (隨便作答)
(function() {
    function run() {
        var raw_table = $("table[cellspacing=5]");
        for(var i=0;i<raw_table.length;i++){
            var se = $(raw_table[i]).find("input");
            $(se[Math.floor((Math.random() * 4) + 0)]).click();
        }
    }
    if(!window.jQuery)
    {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        setTimeout("run();",2000)
    }
})();