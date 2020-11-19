#!/bin/zsh

ID="$(pgrep onboard)"

IDs=("${(@f)$(echo $ID)}")
unset 'IDs[-1]'

if [ -z "$IDs" ]; then
	onboard &
else
	for pid in $IDs; do
		kill -9 "$pid"
	done
fi
