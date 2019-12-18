#!/bin/bash
ps cax | grep polybar > /dev/null
if [ $? -eq 0 ]; then
  killall polybar
else
	polybar top
fi
