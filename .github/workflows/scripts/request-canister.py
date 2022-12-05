from ic.client import Client
from ic.identity import Identity
from ic.agent import Agent
import os
import sys
import base64
from ic.candid import encode, Types

if len(sys.argv) != 2:
  print("Usage: python3 request_canister.py <ref>")
  exit(1)

for v in ["DFX_IDENTITY_PREVIEW","POOL_CANISTER_ID"]:
  if not v in os.environ:
    print(f"request_canister.py: {v} env variable missing")
    exit(1)

private_key = base64.b64decode(os.environ["DFX_IDENTITY_PREVIEW"]).decode("utf-8")
pool_id = os.environ["POOL_CANISTER_ID"]

identity = Identity.from_pem(private_key)
client = Client()
agent = Agent(identity, client)

def request_canister():
  res = agent.update_raw(
      pool_id, "request_canister", encode([{'type': Types.Text, 'value': sys.argv[1]}]), Types.Principal)
  return res

canister_id = request_canister()[0]['value'].to_str()
print(canister_id)
