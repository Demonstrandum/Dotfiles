'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode_1 = require("vscode");
var util_1 = require("./util");
var player_1 = require("./player");
var cp = require('child_process');
var path = require('path');
var fs = require('fs-extra');
var spawn = cp.spawn;
var globalPlayer;
var isInit = false; //是否初始化
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('extension "Type-Music" is now active!');
    var playlists = util_1.getDirsFromDir(path.resolve(__dirname, '../audios'));
    var currentPlayListName = context.globalState.get('currentPlaylist', 'piano');
    var currentPlayList = [];
    var isPlaylistExist = false;
    for (var index = 0; index < playlists.length; index++) {
        var playlistPath = playlists[index];
        var playlistName = util_1.getDirName(playlistPath);
        if (playlistName === currentPlayListName) {
            currentPlayList = util_1.getFilesFromDir(playlistPath, '.mp3');
            isPlaylistExist = true;
            break;
        }
    }
    if (!isPlaylistExist && playlists.length > 0) {
        var playlistName = util_1.getDirName(playlists[0]);
        currentPlayList = util_1.getFilesFromDir(playlists[0], '.mp3');
        context.globalState.update('currentPlaylist', playlistName);
        vscode_1.window.showInformationMessage("There is no setted playlist,will set " + playlistName + " as the default playlist. ");
    }
    var player = new player_1.default({
        playlist: currentPlayList
    });
    globalPlayer = player;
    var status = context.globalState.get('status', 'open');
    var disposable = vscode_1.commands.registerCommand('extension.toggle', function () {
        // The code you place here will be executed every time your command is executed
        status = context.globalState.get('status', 'open');
        if (status === 'open') {
            player.stop();
            context.globalState.update('status', 'close');
            // Display a message box to the user
            vscode_1.window.showInformationMessage('ok,now type music is closed!');
        }
        else {
            context.globalState.update('status', 'open');
            if (!isInit) {
                var music = new Music(player);
                var controller = new MusicController(music, context);
                // Add to a list of disposables which are disposed when this extension is deactivated.
                context.subscriptions.push(music);
                context.subscriptions.push(controller);
                isInit = true;
            }
            vscode_1.window.showInformationMessage('ok,now type music is open!');
        }
    });
    var chooseDisposable = vscode_1.commands.registerCommand('extension.choose', function () {
        // The code you place here will be executed every time your command is executed
        var playlists = util_1.getDirsFromDir(path.resolve(__dirname, '../audios')).map(function (item) {
            var dirName = util_1.getDirName(item);
            currentPlayListName = context.globalState.get('currentPlaylist', 'piano');
            if (dirName === currentPlayListName) {
                return dirName + "(current choosed)";
            }
            else {
                return dirName;
            }
        });
        if (playlists.length > 0) {
            vscode_1.window.showQuickPick(playlists, {
                canPickMany: false
            }).then(function (data) {
                if (data) {
                    data = data.replace('(current choosed)', '');
                    var playlistArr = util_1.getFilesFromDir(path.resolve(__dirname, '../audios', data), '.mp3');
                    if (playlistArr.length > 0) {
                        //set
                        context.globalState.update('currentPlaylist', data);
                        player.setPlaylist({ playlist: playlistArr });
                    }
                    else {
                        vscode_1.window.showErrorMessage('There are no any mp3 files in this playlist,please copy some .mp3 files to here.');
                        setTimeout(function () {
                            openFinder(path.resolve(__dirname, '../audios', data));
                        }, 1000);
                    }
                }
            });
        }
        else {
            vscode_1.window.showErrorMessage('There are not any playlists in your local,please created first.');
            return;
        }
    });
    var nextDisposable = vscode_1.commands.registerCommand('extension.next', function () {
        player.next();
        vscode_1.window.showInformationMessage('Have switched the next music.');
    });
    var openDisposable = vscode_1.commands.registerCommand('extension.open', function () {
        openFinder(path.resolve(__dirname, '../audios'));
    });
    var addDisposable = vscode_1.commands.registerCommand('extension.add', function () {
        vscode_1.window.showOpenDialog({
            canSelectMany: true,
            filters: {
                'Musics': ['mp3']
            }
        }).then(function (data) {
            if (data && Array.isArray(data)) {
                var promises = data.map(function (item) {
                    return fs.copy(item.path, path.resolve(__dirname, '../audios/liked', path.basename(item.path)));
                });
                Promise.all(promises).then(function () {
                    vscode_1.window.showInformationMessage("Succedd Added Music to " + currentPlayListName);
                }).catch(function (e) {
                    console.error('error', e);
                    vscode_1.window.showErrorMessage('Some error occured.');
                });
            }
        });
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(chooseDisposable);
    context.subscriptions.push(nextDisposable);
    context.subscriptions.push(addDisposable);
    context.subscriptions.push(openDisposable);
    if (status === 'open') {
        // create a new word counter
        var music = new Music(player);
        var controller = new MusicController(music, context);
        // Add to a list of disposables which are disposed when this extension is deactivated.
        context.subscriptions.push(music);
        context.subscriptions.push(controller);
        isInit = true;
    }
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    if (globalPlayer) {
        globalPlayer.stop(); //stop
    }
}
exports.deactivate = deactivate;
var MusicController = /** @class */ (function () {
    function MusicController(Music, context) {
        this._music = Music;
        this._context = context;
        // subscribe to selection change and editor activation events
        var subscriptions = [];
        vscode_1.workspace.onDidChangeTextDocument(this._onEvent, this, subscriptions);
        vscode_1.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        // create a combined disposable from both event subscriptions
        this._disposable = vscode_1.Disposable.from.apply(vscode_1.Disposable, subscriptions);
    }
    MusicController.prototype.dispose = function () {
        this._disposable.dispose();
    };
    MusicController.prototype._onEvent = function () {
        var status = 'close';
        if (this._context) {
            status = this._context.globalState.get('status', 'open');
        }
        if (status === 'open') {
            this._music.onTyping();
        }
    };
    return MusicController;
}());
var MusicState;
(function (MusicState) {
    MusicState[MusicState["Init"] = 0] = "Init";
    MusicState[MusicState["Playing"] = 1] = "Playing";
    MusicState[MusicState["Pause"] = 2] = "Pause";
})(MusicState || (MusicState = {}));
var Music = /** @class */ (function () {
    function Music(player) {
        var _this = this;
        this._lastTypingTime = 0;
        this._musicState = MusicState.Init;
        this.player = player;
        this.player.on('stop', function () {
            _this._musicState = MusicState.Init;
        });
    }
    Music.prototype.onTyping = function () {
        var _this = this;
        //是否开启了功能
        this._lastTypingTime = new Date().getTime(); //记录上一次打字时间
        //当开始打字的时候，开启一个计时器，定时去查看是否有在打字
        if (this._timer) {
            //如果有，那就清空
            clearTimeout(this._timer);
        }
        if (this._stopTimer) {
            clearTimeout(this._stopTimer);
        }
        this._timer = setTimeout(function () {
            //是否有在打字，
            var nowTime = new Date().getTime();
            var howLongTimeFromLastTyping = nowTime - _this._lastTypingTime;
            if (howLongTimeFromLastTyping < 2000) {
                //在打字
                // donothing
            }
            else {
                //不再打字了，暂停播放
                _this.pause();
                _this._stopTimer = setTimeout(function () {
                    //在打字
                    //60s没有工作就stop，避免影响别的音乐程序
                    _this.stop();
                }, 60 * 1000);
            }
        }, 3000);
        //是否正在播放
        if (this._musicState === MusicState.Init) {
            //还没开始播放，那么就播放
            this.start();
        }
        else if (this._musicState === MusicState.Pause) {
            this.resume();
        }
        else if (this._musicState === MusicState.Playing) {
            //do nothing.
        }
    };
    Music.prototype.pause = function () {
        //停止播放
        if (this._musicState === MusicState.Playing) {
            this._musicState = MusicState.Pause;
            if (this.player) {
                this.player.pause();
            }
        }
    };
    Music.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //开始播放
                this._musicState = MusicState.Playing;
                // create player instance
                if (this.player) {
                    this.player.play();
                }
                return [2 /*return*/];
            });
        });
    };
    Music.prototype.resume = function () {
        //继续播放
        this._musicState = MusicState.Playing;
        if (this.player) {
            this.player.resume();
        }
    };
    Music.prototype.stop = function () {
        //停止播放
        this._musicState = MusicState.Init;
        if (this.player) {
            this.player.stop();
        }
    };
    Music.prototype.dispose = function () {
    };
    return Music;
}());
function openFinder(dirPath) {
    spawn('open', [
        dirPath
    ]);
}
//# sourceMappingURL=extension.js.map