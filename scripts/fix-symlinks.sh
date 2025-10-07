#!/bin/bash

# Script to fix and verify symbolic links in the portal repository
# This addresses issues where Git with core.symlinks=false converts symlinks to regular files

set -e

echo "🔗 Checking and fixing symbolic links..."

# Function to check and fix a symbolic link
fix_symlink() {
    local link_path="$1"
    local target_path="$2"
    
    echo "Checking: $link_path -> $target_path"
    
    if [[ -L "$link_path" ]]; then
        # It's a symbolic link, check if it points to the right place
        local current_target=$(readlink "$link_path")
        if [[ "$current_target" == "$target_path" ]]; then
            echo "  ✅ Correct symbolic link"
            return 0
        else
            echo "  ⚠️  Wrong target: $current_target (expected: $target_path)"
            rm "$link_path"
        fi
    elif [[ -e "$link_path" ]]; then
        echo "  ❌ Regular file/directory found, removing..."
        rm -rf "$link_path"
    else
        echo "  ℹ️  Missing, will create..."
    fi
    
    # Create the symbolic link
    echo "  🔧 Creating symbolic link: $link_path -> $target_path"
    ln -s "$target_path" "$link_path"
    
    # Verify the target exists
    if [[ ! -e "$link_path" ]]; then
        echo "  ❌ ERROR: Target doesn't exist or link is broken!"
        return 1
    else
        echo "  ✅ Created and verified"
    fi
}

# Check all expected symbolic links
fix_symlink "docs/building-apps/developer-tools/dfx" "../../../submodules/sdk/docs/cli-reference"
echo ""
fix_symlink "docs/references/samples" "../../submodules/samples" 
echo ""
fix_symlink "docs/motoko" "../submodules/motoko/doc/md"
echo ""

echo "🎉 All symbolic links have been checked and fixed!"

# Check Git configuration
echo "📋 Git symbolic link configuration:"
echo "  Repository: $(git config core.symlinks || echo 'not set')"
echo "  Global: $(git config --global core.symlinks || echo 'not set')"

if [[ "$(git config core.symlinks)" == "false" ]] || [[ "$(git config --global core.symlinks)" == "false" ]]; then
    echo ""
    echo "⚠️  WARNING: Git is configured with core.symlinks=false"
    echo "   This can cause symbolic links to be converted to regular files."
    echo "   Consider running: git config core.symlinks true"
    echo "   (Note: This may cause issues on Windows systems)"
fi
