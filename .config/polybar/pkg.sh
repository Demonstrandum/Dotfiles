#!/bin/bash

pac=$(checkupdates | wc -l)
#aur=$(cower -u 2>&1 > /dev/null | wc -l)

check=$((pac)) #+ aur))
if [[ "$check" != "0" ]]
then
    echo "$pac %{F#25232A}%{F-}" # $aur"
else
	echo "%{F#25232A}%{F-} No updates!"
fi
