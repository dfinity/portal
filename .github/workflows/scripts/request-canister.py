import os
import sys
import traceback

if len(sys.argv) != 2:
  print("Usage: python3 request_canister.py <ref>")
  exit(1)

for v in ["ICP_IDENTITY_PREVIEW","POOL_CANISTER_ID"]:
  if not v in os.environ:
    print(f"request-canister.py: {v} env variable missing")
    exit(1)

from pool import request_canister

try:
  result = request_canister()
  canister_id = result[0]['value'].to_str()
  print(canister_id)
except Exception as e:
  print(f"request-canister.py: failed to request canister: {e}", file=sys.stderr)
  traceback.print_exc(file=sys.stderr)
  if 'result' in dir():
    print(f"request-canister.py: raw result: {result}", file=sys.stderr)
  exit(1)
