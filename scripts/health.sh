#!/bin/bash
 
MAX_RETRIES=30      # 30 attempts
SLEEP_INTERVAL=5    # 5 seconds between each attempt
# Total wait time = 30 × 5 = 150 seconds max
 
for i in $(seq 1 $MAX_RETRIES); do
    echo "Health check attempt $i of $MAX_RETRIES..."
    if curl -sf http://127.0.0.1:3000/ > /dev/null 2>&1; then
        echo "App is healthy on port 3000"
        exit 0
    fi
    echo "App not ready yet, waiting ${SLEEP_INTERVAL}s..."
    sleep $SLEEP_INTERVAL
done
 
echo "ERROR: App failed to start on port 3000 after $((MAX_RETRIES * SLEEP_INTERVAL)) seconds"
exit 1
