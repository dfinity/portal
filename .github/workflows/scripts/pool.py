from ic.client import Client
from ic.identity import Identity
from ic.agent import Agent
import os
import sys
import base64
from ic.candid import encode, Types


#
# Interact with preview canister pool: https://github.com/dfinity/preview-canister-pool
#

private_key = base64.b64decode(os.environ["DFX_IDENTITY_PREVIEW"]).decode("utf-8")
pool_id = os.environ["POOL_CANISTER_ID"]

identity = Identity.from_pem(private_key)
client = Client()
agent = Agent(identity, client)

def release_canister():
  res = agent.update_raw(
      pool_id, "release_canister", encode([{'type': Types.Text, 'value': sys.argv[1]}]))
  return res


def request_canister():
  res = agent.update_raw(
      pool_id, "request_canister", encode([{'type': Types.Text, 'value': sys.argv[1]}]), Types.Principal)
  return res