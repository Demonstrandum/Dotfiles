#!/bin/sh

echo 0 > /sys/class/vtconsole/vtcon1/bind
modprobe -r intel_ipts
modprobe intel_ipts
systemctl start lightdm


