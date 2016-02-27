if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
} else {
    var container = document.getElementById('container');
    var globe = new DAT.Globe(container);

    var setTime = function(globe, t) {
        return function() {
            new TWEEN.Tween(globe).to({time: t},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        };
    };

    var xhr;
    TWEEN.start();

    xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/normalized-points.json', true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                window.data = data;
                for (i=0;i<data.length;i++) {
                    globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
                }
                globe.createPoints();
                setTime(globe,0)();
                globe.animate();
            }
        }
    };
    xhr.send(null);
}