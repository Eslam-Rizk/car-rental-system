#!/bin/bash

# Set the directory containing the images
dir="."  # current directory; change if needed

# Find all .webp images and store them safely
mapfile -d '' images < <(find "$dir" -maxdepth 1 -iname '*.webp' -print0 | sort -z)

# Initialize counters
group=1
index=1

# Loop over each image
for img in "${images[@]}"; do
    # Remove leading ./ if present
    img="${img#./}"

    # Format group number with leading zeros
    group_padded=$(printf "%03d" "$group")
    
    # Construct new filename
    new_name="car_${group_padded}_${index}.webp"
    
    # Rename the file
    mv -- "$img" "$dir/$new_name"
    
    # Increment index
    ((index++))
    
    # After 5 images, reset index and increment group
    if [ "$index" -gt 5 ]; then
        index=1
        ((group++))
    fi
done

echo "Renaming completed."
