#
# ~/.profile
#
export PROFILE_LOADED=true

export CONFIG="$HOME/.config"
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_CACHE_HOME="$HOME/.cache"
export XDG_DATA_HOME="$HOME/.local/share"

export JUPYTERLAB_DIR=$HOME/.local/share/jupyter/lab

export TERMINAL=kitty
export EDITOR=nvim
export VISUAL="$EDITOR"

export PATH="$PATH:$HOME/.rvm/gems/default/bin:$HOME/.rvm/gems/default/bin:$HOME/.rvm/rubies/default/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl"

export TERM=xterm-color
[ ! -z "$KITTY_WINDOW_ID" ] && export TERM=xterm-kitty

export PATH="$HOME/.cargo/bin:$PATH:$HOME/.bin:$HOME/.scripts"

export MDV_THEME=729.8953

export PATH="$PATH:$HOME/.rvm/bin"
export PATH="$PATH:$HOME/.yarn/bin"
export PATH="$PATH:$HOME/.idris2/bin"

export XDG_CURRENT_DESKTOP="bspwm"

source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

source /usr/share/nvm/init-nvm.sh
source "$CONFIG/pfetch"
