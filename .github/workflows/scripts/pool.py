from icp_core import Agent, Client, Identity, encode, Types
import os
import sys
import base64


#
# Interact with preview canister pool: https://github.com/dfinity/preview-canister-pool
#

private_key = base64.b64decode(os.environ["ICP_IDENTITY_PREVIEW"]).decode("utf-8")
pool_id = os.environ["POOL_CANISTER_ID"]

identity = Identity.from_pem(private_key)
client = Client()
agent = Agent(identity, client)

def release_canister():
  res = agent.update_raw(
      pool_id, "release_canister", encode([{'type': Types.Text, 'value': sys.argv[1]}]),
      verify_certificate=False)
  return res


def request_canister():
  res = agent.update_raw(
      pool_id, "request_canister", encode([{'type': Types.Text, 'value': sys.argv[1]}]),
      return_type=Types.Principal,
      verify_certificate=False)
  return res
