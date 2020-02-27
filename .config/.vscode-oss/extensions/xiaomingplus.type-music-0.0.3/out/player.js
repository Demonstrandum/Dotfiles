"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var findExec = require('find-exec'), cp = require('child_process'), players = ['mplayer', 'afplay', 'mpg123', 'mpg321', 'play', 'omxplayer', 'aplay', 'cmdmp3'];
var spawn = cp.spawn;
var globalEventId = 1; //默认为1
var Play = /** @class */ (function () {
    function Play(opts) {
        this.playlist = [];
        this.playIndex = 0;
        this.random = false;
        this.repeat = 'all';
        this.eventCallbackMap = {};
        opts = Object.assign({
            playlist: [],
            playIndex: 0,
            repeat: 'all',
            random: false //是否开启随机
        }, opts);
        if (!(opts.playlist.length > 0)) {
            throw new Error('No audio file specified');
        }
        this.players = opts.players || players;
        this.player = opts.player || findExec(this.players);
        if (!this.player) {
            throw new Error("Couldn't find a suitable audio player");
        }
        this.playlist = opts.playlist;
        this.playIndex = opts.playIndex;
        this.random = opts.random;
        this.repeat = opts.repeat;
    }
    Play.prototype.setPlaylist = function (opts) {
        opts = Object.assign({
            playlist: []
        }, opts);
        if (!(opts.playlist.length > 0)) {
            throw new Error('No audio file specified');
        }
        this.playlist = opts.playlist;
        this.playIndex = 0;
        this.stop();
    };
    Play.prototype.on = function (event, callback) {
        var eventId = getEventId();
        if (this.eventCallbackMap[event]) {
            this.eventCallbackMap[event].push({
                id: eventId,
                exec: callback
            });
        }
        else {
            this.eventCallbackMap[event] = [
                {
                    id: eventId,
                    exec: callback
                }
            ];
        }
        return eventId;
    };
    Play.prototype.emit = function (event, data) {
        if (this.eventCallbackMap[event]) {
            this.eventCallbackMap[event].forEach(function (event) {
                if (event.exec) {
                    if (data) {
                        event.exec(data);
                    }
                    else {
                        event.exec();
                    }
                }
            });
        }
    };
    Play.prototype.off = function (eventId) {
        var _this = this;
        var keys = Object.keys(this.eventCallbackMap);
        keys.forEach(function (key) {
            for (var i = 0; i < _this.eventCallbackMap[key].length; i++) {
                if (_this.eventCallbackMap[key][i].id === eventId) {
                    delete _this.eventCallbackMap[key][i];
                    return;
                }
            }
        });
    };
    Play.prototype.play = function () {
        var _this = this;
        if (this.process) {
            this.stop();
        }
        var options = {
            stdio: 'ignore'
        }; //执行命令的options
        if (this.playlist.length > 0 && this.playlist[this.playIndex]) {
            var args = ['-q', '1', this.playlist[this.playIndex]];
            var soundProcess = spawn(this.player, args, options);
            this.process = soundProcess;
            if (!this.process) {
                throw new Error('Unable to spawn process with ' + this.player);
            }
            this.process.on('close', function (err, signal) {
                if (err && !err.killed) {
                    _this.emit('stop');
                    throw err;
                }
                else if (err === 0) {
                    //next
                    _this.autoNext();
                    return;
                }
                else {
                    _this.emit('stop');
                }
                _this.process = null;
            });
            this.process.on('error', function (err) {
                _this.emit('stop');
                _this.process = null;
                throw new Error('Unable to spawn process with ' + _this.player);
            });
        }
        else {
            throw new Error('No audio file specified');
        }
    };
    Play.prototype.autoNext = function () {
        if (this.random) {
            //index
            if (this.repeat !== 'one') {
                this.playIndex = Play.getRandomInt(0, this.playlist.length);
            }
        }
        else {
            if (this.repeat === 'all') {
                if (this.playlist[this.playIndex + 1]) {
                    this.playIndex = this.playIndex + 1;
                }
                else {
                    this.playIndex = 0;
                }
            }
            else if (this.repeat === 'off') {
                if (this.playlist[this.playIndex + 1]) {
                    this.playIndex = this.playIndex + 1;
                }
                else {
                    //stop
                    this.stop();
                    return;
                }
            }
        }
        this.play(); //这里继续play
    };
    Play.prototype.next = function () {
        this.stop();
        if (this.playlist[this.playIndex + 1]) {
            this.playIndex = this.playIndex + 1;
        }
        else {
            this.playIndex = 0;
        }
    };
    Play.prototype.previous = function () {
        if (this.playlist[this.playIndex - 1]) {
            this.playIndex = this.playIndex - 1;
        }
        else {
            this.playIndex = this.playlist.length - 1;
        }
    };
    Play.prototype.stop = function () {
        if (this.process) {
            this.process.kill('SIGKILL');
        }
    };
    Play.prototype.resume = function () {
        if (this.process) {
            this.process.kill('SIGCONT');
        }
        else {
            this.play();
        }
    };
    Play.prototype.pause = function () {
        if (this.process) {
            this.process.kill('SIGSTOP');
        }
    };
    Play.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    return Play;
}());
function getEventId() {
    return ++globalEventId;
}
exports.default = Play;
//# sourceMappingURL=player.js.map