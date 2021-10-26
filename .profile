#
# ~/.profile

export PROFILE_LOADED=true
export SHELL=dash

export CONFIG="$HOME/.config"
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_CACHE_HOME="$HOME/.cache"
export XDG_DATA_HOME="$HOME/.local/share"

export CC=gcc

export JUPYTERLAB_DIR=$HOME/.local/share/jupyter/lab

export TERMINAL=kitty
export EDITOR=nvim
export VISUAL="$EDITOR"
export THEME=1

export FZF_DEFAULT_COMMAND="find . -name '*' -type f -printf '%P\n'"

export TERM=xterm-color
[ ! -z "$KITTY_WINDOW_ID" ] && export TERM=xterm-kitty

export MDV_THEME=729.8953

export PATH="$PATH:$HOME/.local/bin"
export PATH="$PATH:$HOME/.bin:$HOME/.scripts:$HOME/.utils"
export PATH="$PATH:$HOME/.cargo/bin"
export PATH="$PATH:$HOME/.rvm/bin"
export PATH="$PATH:$HOME/.yarn/bin"
export PATH="$PATH:$HOME/.idris2/bin"
export PATH="$PATH:$HOME/go/bin"

export XDG_CURRENT_DESKTOP="bspwm"

source /usr/share/nvm/init-nvm.sh
source "$CONFIG/pfetch"

