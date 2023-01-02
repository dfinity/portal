import os
import sys

if len(sys.argv) != 2:
  print("Usage: python3 request_canister.py <ref>")
  exit(1)

for v in ["DFX_IDENTITY_PREVIEW","POOL_CANISTER_ID"]:
  if not v in os.environ:
    print(f"request-canister.py: {v} env variable missing")
    exit(1)

from pool import request_canister

canister_id = request_canister()[0]['value'].to_str()
print(canister_id)
