#!/bin/sh

$(dunstify -i ~/Pictures/.icons/warn.png \
	-A true,Yes -A false,Cancel \
	"Are you sure you want to exit BSPWM?") \
	&& bspc quit
