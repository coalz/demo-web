/**
 * Created by coalz on 2018/1/3.
 */

(function () {

    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    var color_bg = '#333';// rgba(51,51,51,1)
    var color_bk = '#fff';// rgba(255,255,255,1)

    var time = [8, 8, 8, 8];
    var newTime = getTime();
    var bw = 30;
    var updating = false;

    // numbers
    var numbers = [
        // 0
        [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
        // 1
        [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
        // 2
        [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]],
        // 3
        [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
        // 4
        [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]],
        // 5
        [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
        // 6
        [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
        // 7
        [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
        // 8
        [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
        // 9
        [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]]
    ];

    // 计算各数字x轴位置
    var sx = (w - 17 * bw) / 2, sy = (h - 5 * bw) / 2;
    var nw = 3 + 1;
    // +nw * 0  时十位
    var ht = sx;
    // +nw * 1  时个位
    var hs = sx + bw * nw;
    // 偏移
    sx += bw * 2;
    // +nw * 2  分十位
    var mt = sx + bw * nw * 2;
    // +nw * 3  分个位
    var ms = sx + bw * nw * 3;

    var dy = -5 * bw;
    var d = (sy + 5 * bw);

    function update() {
        updating = true;
        if (dy > h) {
            updating = false;
            return;
        }
        clearBackground();
        drawSep();
        drawNumber(ht, sy, numbers[time[0]], color_bk);
        drawNumber(hs, sy, numbers[time[1]], color_bk);
        drawNumber(mt, sy, numbers[time[2]], color_bk);
        drawNumber(ms, sy, numbers[time[3]], color_bk);
        var opacity = 1 - (dy >= sy ? (dy - sy) : (sy - dy)) / d;
        var downColor = 'rgba(255,255,255,' + opacity + ')';
        drawNumber(ht, dy, numbers[time[0]], downColor, true);
        drawNumber(hs, dy, numbers[time[1]], downColor, true);
        drawNumber(mt, dy, numbers[time[2]], downColor, true);
        drawNumber(ms, dy, numbers[time[3]], downColor, true);
        dy += 5;
        if (dy >= sy) {
            time = newTime;
        }
        requestAnimationFrame(update);
    }

    update();

    setInterval(function () {
        if (updating) return;
        var nt = getTime();
        if (nt[3] != time[3]) {
            newTime = nt;
            dy = -5 * bw;
            update();
        }
    }, 1000);

    function drawSep() {
        var x = w / 2 - bw * 0.5;
        var y = h / 2 - bw * 1.5;
        drawPoint(x, y, bw, bw);
        drawPoint(x, y + bw * 2, bw, bw);
    }

    function drawNumber(x, y, np, color, f) {
        for (var j = 0; j < np.length; j++) {
            for (var k = 0; k < np[j].length; k++) {
                var p = np[j][k];
                if (p == (f ? 1 : 0))
                    continue;
                drawPoint(x + k * bw, y + j * bw, bw, bw, color);
            }
        }
    }

    function drawPoint(x, y, pw, ph, color) {
        ctx.beginPath();
        ctx.fillStyle = color || color_bk;
        ctx.strokeStyle = color_bg;
        ctx.lineWidth = 1;
        ctx.rect(x, y, pw, ph);
        ctx.fill();
        ctx.stroke();
    }

    function clearBackground() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = color_bg;
        ctx.fillRect(0, 0, w, h);
    }

    function getTime() {
        var dr = [];
        var dt = new Date();
        var dh = new String(dt.getHours());
        var dm = new String(dt.getMinutes());
        if (dh.length > 1) {
            dr.push(dh[0]);
            dr.push(dh[1]);
        } else {
            dr.push(0);
            dr.push(dh[0]);
        }
        if (dm.length > 1) {
            dr.push(dm[0]);
            dr.push(dm[1]);
        } else {
            dr.push(0);
            dr.push(dm[0]);
        }
        return dr;
    }

})();