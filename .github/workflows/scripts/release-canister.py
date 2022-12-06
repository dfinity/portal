import os
import sys

if len(sys.argv) != 2:
  print("Usage: python3 release-canister.py <ref>")
  exit(1)

for v in ["DFX_IDENTITY_PREVIEW","POOL_CANISTER_ID"]:
  if not v in os.environ:
    print(f"release-canister.py: {v} env variable missing")
    exit(1)


from pool import release_canister

release_canister()