#!/bin/sh

# Run the test!
if [ "$2" = "report" ]; then
  # Pipe report into file
  node test/scripts/run.js > test/report.txt
else
  node test/scripts/run.js
fi