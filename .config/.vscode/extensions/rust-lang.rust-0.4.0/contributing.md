# Contributing

This repo provides the RLS client for vscode built using the Language 
Server protocol.

This file contains information for building, running, and debugging the plugin.
If you just want to use it, you can download it from the VSCode marketplace. See
[README.md](README.md) for more info.

## Building and Running

Git clone or download the files and use `npm install` in the directory to
download and install the required modules.

Next, without installing the client as a regular VSCode extension, open the
client folder in VSCode. Go to the debugger and run "Launch Extension". This
opens a new instance of VSCode with the plugin installed.


### Via Rustup

This is the default, if you don't set any of the environment variables below,
the extension will run (and install) the RLS via rustup. You can install rustup
from https://www.rustup.rs/.


### Via Source

Check out the RLS source code, following the [directions](https://github.com/rust-lang-nursery/rls/blob/master/contributing.md). 
For the plugin to find the RLS, set the `rls.root` setting to the
root of your rls checkout (e.g., `/Source/rls`):


### Via an executable

Similar to above, but use the `rls.path` and point it at the RLS executable
(e.g., `/rls/target/release/rls`). Note that you must include the name of the
executable, not just the path.


## Logging

You can log to the output panel in VSCode by setting `rust-client.revealOutputChannelOn` to
`info`. You can log to a file in the project directory by setting `rust-client.logToFile`
to `true`.


## Installing in VSCode

If you'd like to test on multiple projects and already have the extension
working properly, you can manually install the extension so that it's loaded
into VSCode by default.

After following the above instructions, and successfully building the extension
once, build a .vsix archive by running the following:

```
npm install -g vsce
vsce package
```

Then, install it in VSCode from the Extensions tab menu, select "Install from VSIX..."

Restart VSCode in order to load the extension. More information available via
[VSCode docs](https://code.visualstudio.com/Docs/extensions/example-hello-world#_installing-your-extension-locally).


## Troubleshooting

### Error messages containing `tsc -watch -p ./` or `ENOSPC`

```
> npm ERR! Failed at the rls_vscode@0.0.1 compile script 'tsc -watch -p ./'.
> npm ERR! Make sure you have the latest version of node.js and npm installed.
> npm ERR! If you do, this is most likely a problem with the rls_vscode package,
> npm ERR! not with npm itself.
```

run

```
> npm dedupe
```

see http://stackoverflow.com/a/31926452/1103681 for an explanation

if that doesn't work, run

```
> echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
