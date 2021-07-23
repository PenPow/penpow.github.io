const scanlines = $('.scanlines');
const tv = $('.tv');
function exit() {
    $('.tv').addClass('collapse');
    term.disable();
}
const term = $('#term').terminal(function(command, term) {
    const cmd = $.terminal.parse_command(command);
    if (cmd.name === 'exit') {
        exit();
    } else if (cmd.name === 'echo') {
        term.echo(cmd.rest);
    } else if (command !== '') {
        try {
            const result = window.eval(command);
            if (result && result instanceof $.fn.init) {
                term.echo('<#jQuery>');
            } else if (result && typeof result === 'object') {
                tree(result);
            } else if (result !== undefined) {
                term.echo(new String(result));
            }
        } catch(e) {
            term.error(new String(e));
        }
    }
}, {
    name: 'js_demo',
    onResize: set_size,
    exit: false,
    // detect iframe codepen preview
    enabled: $('body').attr('onload') === undefined,
    autocompleteMenu: true,
    completion: ['exit', 'echo', 'camera()', 'play()', 'pause()'],
    onInit: function() {
        set_size();
        this.echo('Type [[b;#fff;]exit] to see turn off animation.');
        this.echo('Type [[b;#fff;]camera()] to get video and [[b;#fff;]pause()]/[[b;#fff;]play()] to stop/play');
    },
    onClear: function() {
        console.log(this.find('video').length);
        this.find('video').map(function() {
            console.log(this.src);
            return this.src;
        });
    },
    prompt: 'penpow@portfolio> '
});
function set_size() {
    // for window height of 170 it should be 2s
    const height = $(window).height();
    const width = $(window).width()
    const time = (height * 2) / 170;
    scanlines[0].style.setProperty("--time", time);
    tv[0].style.setProperty("--width", width);
    tv[0].style.setProperty("--height", height);
}

function tree(obj) {
    term.echo(treeify.asTree(obj, true, true));
}
const constraints = {
    audio: false,
    video: {
        width: { ideal: 1280 },
        height: { ideal: 1024 },
        facingMode: "environment"
    }
};
const acceptStream = (function() {
    return 'srcObject' in document.createElement('video');
})();

function camera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        term.pause();
        const media = navigator.mediaDevices.getUserMedia(constraints);
        media.then(function(mediaStream) {
            term.resume();
            let stream;
            if (!acceptStream) {
                stream = window.URL.createObjectURL(mediaStream);
            } else {
                stream = mediaStream;
            }
            term.echo('<video data-play="true" class="self"></video>', {
                raw: true,
                onClear: function() {
                    if (!acceptStream) {
                        URL.revokeObjectURL(stream);
                    }
                    mediaStream.getTracks().forEach(track => track.stop());
                },
                finalize: function(div) {
                    const video = div.find('video');
                    if (!video.length) {
                        return;
                    }
                    if (acceptStream) {
                        video[0].srcObject = stream;
                    } else {
                        video[0].src = stream;
                    }
                    if (video.data('play')) {
                        video[0].play();
                    }
                }
            });
        });
    }
}
const play = function() {
    const video = term.find('video').slice(-1);
    if (video.length) {
        video[0].play();
    }
}
function pause() {
    term.find('video').each(function() {
        this.pause(); 
    });
}

async function pictureInPicture() {
    const [video] = $('video');
    try {
        if (video) {
            if (video !== document.pictureInPictureElement) {
                await video.requestPictureInPicture();
            } else {
                await document.exitPictureInPicture();
            }
        }
  } catch(error) {
      term.error(error);
  }
}
function clear() {
    term.clear();
}

github('jcubic/jquery.terminal');
cssconsts(); // ponyfill