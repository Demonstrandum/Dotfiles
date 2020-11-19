#!/usr/bin/env zsh

[ -z "$EDITOR" ] && EDITOR=vim

choose () { 
    local PS3=" > "
    cmd="locate {} | head -n 5" 
    opt="$(pmenu -p "$PS3" -c $cmd)"

    $EDITOR "$opt"
}

choose

tput sgr0
