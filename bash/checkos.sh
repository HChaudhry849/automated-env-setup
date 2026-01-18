#!/usr/bin/env bash

OUTPUT="$(uname -s)"
echo "${OUTPUT}"

if [[ $OUTPUT == "MINGW64_NT-10.0-26100" ]]; then
    echo "Windows OS detected"
else 
    echo "Error: Unsupported OS detected: $OUTPUT" >&2
    exit 1
fi

chmod +x bash/checkos.sh


