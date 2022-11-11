import json
import pickle
from dataclasses import dataclass, field
from typing import Any, Optional, Tuple
from Crypto.Cipher import AES
from Crypto.Hash import SHA256

SALTING_REALM_NAME = "@GROUP_6_ISAMAZING"

class LoginServer:
    """This server will be related to the login part of the code"""

    def __init__(self) -> None:
        with open("users.json", "rb") as file:
            self.users = {k: bytes.fromhex(v) for k, v in json.load(file).items()}


    def derive_secret_key(username: str, password: str) -> bytes:
        """
        Function related to the derivation of a secret key (stored in users.json)
        for the given combination of password and username
        """
        global SALTING_REALM_NAME

        saltedPassword = username + SALTING_REALM_NAME + password

        hashObj = SHA256.new()
        hashObj.update(bytes(saltedPassword.encode("utf-8")))
        return hashObj.digest()



    def encrypt(key: bytes, data: Any) -> bytes:
        """Encrypts the given data using AES."""
        dataBytes = pickle.dumps(data)
        # utilizes EAX as mode
        cipher = AES.new(key, AES.MODE_EAX)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(dataBytes)
        # returning all as bytes
        return nonce + ciphertext + tag

    def decrypt(key: bytes, data: bytes) -> Any:
        """Decrypts the given message using AES."""
        try:
            givenNonce = data[:AES.block_size]
            givenCiphertext = data[AES.block_size:-16]
            givenTag = data[-16:]

            # create object
            decCipher = AES.new(key, AES.MODE_EAX, nonce=givenNonce)
            decryptedMessage = decCipher.decrypt(givenCiphertext)
            message = pickle.loads(decryptedMessage)

            # verify integrity with tag
            decCipher.verify(givenTag)
            return message

        except Exception as e:
            raise Exception(f"Failed to decrypt client/TGS session key")

    def createNewUser(self, username: str, password: str) -> bool:
        try:
            with open("./users.json", "r") as file:
                users = json.loads(file)
                print(users)

        except Exception as e:
            print(e)


#test 1
test = LoginServer()
test.createNewUser("user1", "123123")