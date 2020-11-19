#!/bin/sh

# Blacl
MAIN_0="#000000"
HINT_0="#1a1a1a"

# Gray Theme
MAIN_1="#333333"
HINT_1="#2a2a2a"

# White Theme
MAIN_2="#fafafa"
HINT_2="#dddddd"

# Blue
MAIN_3="#4455ff"
HINT_3="#2233ee"

# Purple
MAIN_4="#5d5a99"
HINT_4="#413f69"

# Dark Blue
MAIN_5="#1c55a6"
HINT_5="#2f5a96"

# Red
MAIN_6="#962f50"
HINT_6="#94465f"

# Light
MAIN_7="#9d9d9d"
HINT_7="#999999"

## End of Themes ##
[ -z "$THEME" ] && THEME=1

MAIN="$(eval echo "\$MAIN_$THEME")"
HINT="$(eval echo "\$HINT_$THEME")"

echo "Setting theme no. $THEME."
bspc config focused_border_color "$MAIN"
bspc config  normal_border_color "$HINT"

