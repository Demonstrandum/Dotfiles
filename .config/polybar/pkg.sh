#!/bin/bash

yay -Sy 2>&1 > /dev/null

pac=$(pacman -Qu 2>&1 | wc -l)
aur=$(yay    -Qu 2>&1 | wc -l)

[ -z "$pac$aur" ] \
	&& echo "No Internet" \
	&& exit 1

check=$(($pac + $aur))
if [[ "$check" != "0" ]]
then
	aur=$(($aur - $pac))
    echo "$pac  $aur"
else
	echo "-  -"
fi
