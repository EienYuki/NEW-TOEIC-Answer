var status=0,_delay=0,_Seikai_Ritu=0;
var data_Q,data_S;
var src;
//覆蓋掉原本的function
function set_level(instr){
    if(document.getElementById("testtype").value == '0'){
        alert("尚未選擇單元");
    }
    else{
        src = "toeic_exam2.asp?ToeicSec=start&qlevel=" + instr + "&part="+document.getElementById("testtype").value; 
        _delay = parseInt($("#a_time").val());
        _delay *= 1000;
        _Seikai_Ritu = parseInt($("#a_seikai").val());
        init();
    }
}
function init(){
    var iframe = document.createElement('iframe');
    iframe.id = "run";
    iframe.name = "run";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    //iframe.style.display = "none";
    iframe.src = src;
    //document.body.appendChild(iframe);
    $("body").html(iframe);
    $('#run').load(function(){
        if(status == 0)
            setTimeout(run0,500+_delay);
        else if(status == 1)
            setTimeout(run1,500);
        else if(status == 2)
            setTimeout(run2,500);
        else if(status == 3)
            setTimeout(run3,500+_delay);
        else if(status == 4)
            setTimeout(run4,500);
        status++;
    });
}
function rerun(){
    _delay = parseInt($("#a_time").val());
    _delay *= 1000;
    _Seikai_Ritu = parseInt($("#a_seikai").val());
    status = 3;
    var iframe = document.createElement('iframe');
    iframe.id = "run";
    iframe.name = "run";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    //iframe.style.display = "none";
    iframe.src = src;
    //document.body.appendChild(iframe);
    $("body").html(iframe);
    $('#run').load(function(){
        if(status == 3)
            setTimeout(run3,500+_delay);
        else if(status == 4)
            setTimeout(run4,500);
        status++;
    });
}
function run0(){
    //第一次答題
    var f = document.getElementById("run");
    var doc = f.contentDocument;
    var raw_table = $(doc).find("table[cellspacing=5]");
    for(var i=0;i<raw_table.length;i++){
        var se = $(raw_table[i]).find("input");
        $(se[Math.floor((Math.random() * 4) + 0)]).click();
    }
    doc.getElementsByTagName("form")[0].target = "run";
    $(doc).find("input[type=image]")[0].click();
}
function run1(){
    //按下訂正
    var f = document.getElementById("run");
    var doc = f.contentDocument;
    $($(doc).find("#modify_a4")[0]).click();
}
function run2(){
    //取得題目、答案
    var f = document.getElementById("run");
    var doc = f.contentDocument;
    doc = doc.getElementsByName("mainFrame")[0].contentDocument;
    var raw_table = $(doc).find("table[cellspacing=5]");
    data_Q = Array(raw_table.length);
    data_A = Array(raw_table.length);
    for(var i=0;i<raw_table.length;i++){
        data_Q[i] = $($(raw_table[i]).find("font")[0]).text().trim();
        data_A[i] = $($($(raw_table[i]).find("font")[1]).parent()).text().trim();
    }
    f.src = src;
}
function run3(){
    //第二次作答
    var f = document.getElementById("run");
    var doc = f.contentDocument;
    var raw_table = $(doc).find("table[cellspacing=5]");
    var run_max = parseInt(raw_table.length*(_Seikai_Ritu/100));
    for(var i=0;i<run_max;i++){
        var temp_Q = $($(raw_table[i]).find("b")).text().trim();
        for(var p=0;p<data_Q.length;p++){
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
    doc.getElementsByTagName("form")[0].target = "run";
    $(doc).find("input[type=image]")[0].click();
}
function run4(){
    $("body").html(
        '<center>'+
        "<div><label id='range_val'>作答延遲300秒</label><br><input id='a_time' type='range' min='0' max='600' onchange=\"document.getElementById('range_val').innerHTML='作答延遲'+this.value+'秒';\"><br>"+
        "<label id='range2_val'>答對率50%</label><br><input id='a_seikai' type='range' min='0' max='100' onchange=\"document.getElementById('range2_val').innerHTML='答對率'+this.value+'%';\"></div>"+
        '<button type="submit" onclick="rerun();">再次執行</button>'+
        '</center>'
    );
}
(function(){
    $($($($("#testtype").parent()[0]).parent()[0]).parent()[0]).append(
        "<tr bgcolor='#FFFFFF'><td width='75%' align='center'><label id='range_val'>作答延遲0秒</label><br><input id='a_time' type='range' min='0' max='600' onchange=\"document.getElementById('range_val').innerHTML='作答延遲'+this.value+'秒';\"></td></tr>"
    );
    $($($($("#testtype").parent()[0]).parent()[0]).parent()[0]).append(
        "<tr bgcolor='#FFFFFF'><td width='75%' align='center'><label id='range2_val'>答對率100%</label><br><input id='a_seikai' type='range' min='0' max='100' onchange=\"document.getElementById('range2_val').innerHTML='答對率'+this.value+'%';\"></td></tr>"
    );
    alert("請選好類型、回數 程式將會自動完成作答");
    alert("中間出現的警告無須理會");
    $("#range_val").html("作答延遲"+$("#a_time").val()+"秒");
    $("#range2_val").html("答對率"+$("#a_seikai").val()+"%");
})();
