#
# ~/.profile
#
export EDITOR=vim
export VISUAL=vim

export PATH="$PATH:$HOME/.rvm/gems/default/bin:$HOME/.rvm/gems/default/bin:$HOME/.rvm/rubies/default/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl"

export TERM=xterm-color
export PATH="$HOME/.cargo/bin:$PATH:$HOME/.bin:$HOME/.scripts"

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"
export PATH="$PATH:$HOME/.yarn/bin"
export XDG_CURRENT_DESKTOP="Deepin"
source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*


