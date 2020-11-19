#!/bin/zsh

STICKS=$(bspc query -N -n .sticky)
HIDDEN=$(bspc query -N -n .hidden)

echo "$STICKS" > /tmp/sticks
echo "$HIDDEN" > /tmp/hidden

BOTH=$(comm -12 --nocheck-order \
	<(sort /tmp/sticks) \
	<(sort /tmp/hidden))


BOTHLIST=("${(@f)$(echo $BOTH)}")

echo "$BOTHLIST"

if [ -z "$BOTH" ]; then
	STICKLIST=("${(@f)$(echo $STICKS)}")
	for id in $STICKLIST; do
		bspc node $id -g hidden
	done
else
	echo "Unhide"
	for id in $BOTHLIST; do
		bspc node $id -g hidden=off
	done
fi



