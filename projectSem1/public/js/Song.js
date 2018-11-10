document.addEventListener('DOMContentLoaded', function (event) {
    loadMp3();
});

function loadMp3() {
    var MP3_API = "https://2-dot-backup-server-002.appspot.com/_api/v2/songs";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", MP3_API, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Parse kết quả trả về thành kiểu json.
            var responseJson = JSON.parse(this.responseText);
            var symbol, color;
            symbol = '0123456789ABCDEF';

            var htmlContent = "";
            for (var i = 0; i < responseJson.length; i++) {
                var int = Math.floor(Math.random() * 10000);
                color = '#';
                for (var j = 0; j<6; j++){
                    color = color + symbol[Math.floor(Math.random() * 16)];
                }
                htmlContent += '<div class="audio"><div class="stt" style="color: '+ color +'">' + (i + 1) + '</div><span>-</span><div class="imgSong"><img src="' + responseJson[i].thumbnail + '" alt="Song"></div>' +
                    '<div class="titleSong"><div class="nameSong">' + responseJson[i].name + '</div><div class="nameSinger">' + responseJson[i].author + ', ' + responseJson[i].singer + '</div></div>' +
                    '<div class="controlsIcon"><ul><li><a href="#"><i class="fa fa-download" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-plus" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-share-alt" aria-hidden="true"></i></a></li><li><a href="javascript:void(0)" onclick="loadMp3(\'' + responseJson[i].link + '\')"><i class="fa fa-play" aria-hidden="true"></i></a></li></ul></div>' +
                    '<div class="view">' + formatNumber(int) + '</div>'+
                    '</div>';
                if(i === 5) break;
            }
            document.getElementById('listSong').innerHTML = htmlContent;
        } else if (this.readyState === 4) {
            console.log("Fails");
        }
    };
    var token = localStorage.getItem('token');
    xhr.setRequestHeader('Authorization', 'Basic ' + token);
    xhr.send();
};

function playSong(link) {
    alert(link);
}

// function random number and format
function formatNumber(n, c, t) {
    var c = isNaN(c = Math.abs(c)) ? 0 : c,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
