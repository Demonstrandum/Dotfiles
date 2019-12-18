#!/bin/bash


tempGPU=$(sensors | grep temp1 | head -n1 | sed -r 's/.*:\s+[\+-]?(.*C)\s+.*/\1/')

tempCore0=$(sensors | grep -i "Core 0" | head -n1 | sed -r 's/.*:\s+[\+-]?(.*C)\s+.*/\1/' | grep -oP '.*?(?=\.)')
tempCore1=$(sensors | grep -i "Core 1" | head -n1 | sed -r 's/.*:\s+[\+-]?(.*C)\s+.*/\1/' | grep -oP '.*?(?=\.)')
tempCore4=$(sensors | grep -i "Physical id 0" | head -n1 | sed -r 's/.*:\s+[\+-]?(.*C)\s+.*/\1/' | grep -oP '.*?(?=\.)')

tempCPU=$(( ($tempCore0 + $tempCore1 + $tempCore4) / 5))
tempCPU="$tempCPU°C"

printf " CPU: $tempCPU / GPU: $tempGPU"
