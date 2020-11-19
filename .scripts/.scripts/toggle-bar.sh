#!/bin/sh

[ -z "$BAR_NAME" ] && BAR_NAME="$(sys-conf get bar_name)"
[ -z "$BAR_NAME" ] && BAR_NAME=top

pgrep polybar > /dev/null

if [ $? -eq 0 ]; then
	pkill polybar
	bspc config top_padding 0
else
	bspc config top_padding 60
	polybar "$BAR_NAME" &
fi

border-refresh.sh
