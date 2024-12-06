#!/bin/bash

# The objective of this script is to flag entries to be removed by a human reviewer.
# An entry is flagged if it meets one of the next requirements:
# 1. The `usesInternetIdentity` field is set to `true` and the `website` field is a GitHub URL.
# 2. The website is unreachable (HTTP status code in the 4XX or 5XX range).

# Input JSON file
INPUT_FILE="showcase.json"

# Temporary file to store intermediate results
TEMP_FILE="temp.json"
TEMP_FILE_2="temp2.json"

# Substitute `usesInternetIdentity: true` with `usesInternetIdentity: false` for all entries with a GitHub URL instead of a website.
jq '[.[] | if (.usesInternetIdentity == true) and ((.website // "") | test("^https://github.com/")) then .usesInternetIdentity = false else . end]' "$INPUT_FILE" > "$TEMP_FILE"

# Function to check the status of a website
check_canister_website() {
    local url=$1
    # Get the HTTP headers and extract the status code
    local response_status
    response_status=$(curl -s -o /dev/null -I -w "%{http_code}" "$url")

    echo "HTTP status: $response_status"
    
    # If the status is in the 4XX or 5XX range, return failure
    if [[ "$response_status" -ge 400 && "$response_status" -lt 600 ]]; then
        echo "HTTP $response_status error detected for $url"
        return 1
    fi

    return 0
}

# Start output as an empty array
echo "[" > "$TEMP_FILE_2"

# Process each entry in the filtered JSON
first_item=true
jq -c '.[]' "$TEMP_FILE" | while read -r item; do
    website=$(echo "$item" | jq -r '.website')
    echo "Processing $website"

    # Check if the header is present for the website
    if check_canister_website "$website"; then
        # Add valid entries to the output file, handling comma placement
        if [ "$first_item" = true ]; then
            first_item=false
            echo "$item" >> "$TEMP_FILE_2"
        else
            echo ",$item" >> "$TEMP_FILE_2"
        fi
    fi
done

# Close the JSON array
echo "]" >> "$TEMP_FILE_2"

jq '.' "$TEMP_FILE_2" > "$INPUT_FILE"

# Clean up temporary files
rm -f "$TEMP_FILE"
rm -f "$TEMP_FILE_2"

echo "Showcase file has been cleaned up successfullly."
