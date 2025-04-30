#!/bin/bash

# Set the directory containing the images
dir="."  # current directory; change if needed

# Find all .webp images and store them safely
mapfile -d '' images < <(find "$dir" -maxdepth 1 -iname '*.webp' -print0 | sort -z)

# Initialize counters
group=1
index=1

# Store newly renamed images to replicate them later
all_groups=()  # Each element is a group of 5 images (array of arrays)
current_batch=()

# Step 1: Rename original images in batches of 5
for img in "${images[@]}"; do
    # Remove leading ./ if present
    img="${img#./}"

    group_padded=$(printf "%03d" "$group")
    new_name="car_${group_padded}_${index}.webp"

    mv -- "$img" "$dir/$new_name"

    current_batch+=("$new_name")

    ((index++))

    if [ "$index" -gt 5 ]; then
        all_groups+=("$(printf "%s " "${current_batch[@]}")")
        current_batch=()
        index=1
        ((group++))
    fi
done

# If the last batch is partially filled, include it
if [ ${#current_batch[@]} -gt 0 ]; then
    while [ ${#current_batch[@]} -lt 5 ]; do
        current_batch+=("${current_batch[-1]}")
    done
    all_groups+=("$(printf "%s " "${current_batch[@]}")")
    ((group++))
fi

# Step 2: Duplicate batches to reach 60 groups
group_total=${#all_groups[@]}
while [ "$group" -le 60 ]; do
    group_padded=$(printf "%03d" "$group")

    # Use batches from the beginning in order
    batch_index=$(( (group - 1) % group_total ))
    read -ra batch <<< "${all_groups[$batch_index]}"

    for i in {1..5}; do
        src="${batch[$((i-1))]}"
        dst="car_${group_padded}_${i}.webp"
        cp -- "$dir/$src" "$dir/$dst"
    done

    ((group++))
done

echo "All groups renamed and extended to 60 batches successfully."
