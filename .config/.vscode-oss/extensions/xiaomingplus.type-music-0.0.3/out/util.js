"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
function getDirsFromDir(dir) {
    var list = fs.readdirSync(dir);
    if (list && Array.isArray(list)) {
        return list
            .filter(function (item) {
            var isDir = fs.lstatSync(path.resolve(dir, item)).isDirectory();
            if (isDir) {
                return true;
            }
            else {
                return false;
            }
        })
            .map(function (item) {
            return path.resolve(dir, item);
        });
    }
    else {
        return [];
    }
}
exports.getDirsFromDir = getDirsFromDir;
function getFilesFromDir(dir, filterFileType) {
    var list = fs.readdirSync(dir);
    if (list && Array.isArray(list)) {
        return list
            .filter(function (item) {
            var filePath = path.resolve(dir, item);
            var isFile = fs.lstatSync(filePath).isFile();
            if (isFile && path.extname(filePath) === filterFileType) {
                return true;
            }
            else {
                return false;
            }
        })
            .map(function (item) {
            var currentFilePath = path.resolve(dir, item);
            return {
                path: currentFilePath,
                time: fs.statSync(currentFilePath).mtime.getTime()
            };
        })
            .sort(function (a, b) {
            return b.time - a.time;
        })
            .map(function (item) {
            return item.path;
        });
    }
    else {
        return [];
    }
}
exports.getFilesFromDir = getFilesFromDir;
function getDirName(filePath) {
    if (fs.lstatSync(filePath).isDirectory()) {
        //文件夹的话
        return path
            .resolve(filePath)
            .split(path.sep)
            .pop();
    }
    else {
        //文件的话
        return path
            .dirname(filePath)
            .split(path.sep)
            .pop();
    }
}
exports.getDirName = getDirName;
//# sourceMappingURL=util.js.map