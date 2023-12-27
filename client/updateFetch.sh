#!/bin/bash

NEW_IP="http://replace:8000"

FILES_TO_UPDATE=(
    "src/Components/Events/EventCount.jsx"
    "src/Components/Login/Login.jsx"
    "src/Components/Register/Register.jsx"
    "src/Pages/EventPage.jsx"
    "src/Pages/Home.jsx"
    "src/Pages/SearchPage.jsx"
)

for file in "${FILES_TO_UPDATE[@]}"; do
    if [[ -f "$file" ]]; then
        sed -i "s|http://server:8000|http://$NEW_IP|g" "$file"
    fi
done

echo "All files updated."