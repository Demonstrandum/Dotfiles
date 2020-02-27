#!/usr/bin/zsh

for i (dde-desktop dde-system-daem
       dde-file-manage dde-session-dae
       deepin-anything deepin-wm-dbus); do
  sudo pkill "$i"
done

