import os
import sys
import traceback

if len(sys.argv) != 2:
  print("Usage: python3 release-canister.py <ref>")
  exit(1)

for v in ["ICP_IDENTITY_PREVIEW","POOL_CANISTER_ID"]:
  if not v in os.environ:
    print(f"release-canister.py: {v} env variable missing")
    exit(1)


from pool import release_canister

try:
  release_canister()
except Exception as e:
  print(f"release-canister.py: failed to release canister: {e}", file=sys.stderr)
  traceback.print_exc(file=sys.stderr)
  exit(1)
