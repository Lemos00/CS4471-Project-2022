import json
import pickle
from dataclasses import dataclass, field
from typing import Any, Optional, Tuple
from Crypto.Cipher import AES
from Crypto.Hash import SHA256

SALTING_REALM_NAME = "@GROUP_6_AMAZING"

class LoginServer:
    """This server will be related to the login part of the code"""

    def __init__(self) -> None:
        # with open("./python-login/users.json", "rb") as file:
            # self.users = {k: bytes.fromhex(v) for k, v in json.load(file).items()}
        with open("./Users.json", "rb") as file:
                self.users = json.load(file)
        print("hello world")


    def derive_secret_key(self, username: str, password: str) -> bytes:
        """
        Function related to the derivation of a secret key (stored in users.json)
        for the given combination of password and username
        """
        global SALTING_REALM_NAME

        saltedPassword = username + SALTING_REALM_NAME + password

        hashObj = SHA256.new()
        hashObj.update(bytes(saltedPassword.encode("utf-8")))
        return hashObj.hexdigest()



    def encrypt(self, key: bytes, data: Any) -> bytes:
        """Encrypts the given data using AES."""
        dataBytes = pickle.dumps(data)
        # utilizes EAX as mode
        cipher = AES.new(bytes.fromhex(key), AES.MODE_EAX)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(dataBytes)
        # returning all as bytes
        return nonce + ciphertext + tag

    def decrypt(self, key: str, data: bytes) -> Any:
        """Decrypts the given message using AES."""
        try:
            givenNonce = data[:AES.block_size]
            givenCiphertext = data[AES.block_size:-16]
            givenTag = data[-16:]

            # create object
            decCipher = AES.new(bytes.fromhex(key), AES.MODE_EAX, nonce=givenNonce)
            decryptedMessage = decCipher.decrypt(givenCiphertext)
            message = pickle.loads(decryptedMessage)

            # verify integrity with tag
            decCipher.verify(givenTag)
            return message

        except Exception as e:
            raise Exception(f"Failed to decrypt: {e}")

    def encryptPassword(self, username: str, password: str) -> bytes:
        """
            Function related to encrypting the given password, as a means to isolate encrypt, decrypt and key generation
        """

        secretKey = self.derive_secret_key(username, password)
        encryptedPassword = self.encrypt(secretKey, password)

        return encryptedPassword

    def decryptPassword(self, key: bytes, password: bytes) -> str:
        """
            Function related to decrypting the given password, as a means to isolate encrypt, decrypt and key generation
        """
        try:
            result = self.decrypt(key, password)

            return result
        except Exception as e:
            print(e)
    
    def findUser(self, username: str) -> bool:
        """
            Verifies if a given username is in the database or not.
            Returns: TRUE if username is in database, FALSE other
        """
        found = False
        for user in self.users["commonUsers"]:
            if user["username"] == username:
                found = True
        
        return found

    def findIndex(self, username: str) -> bool:
        """
            Gets Index of given user in the database.
            Returns: index if username is in database, None other
        """
        found = None
        for user in range(len(self.users["commonUsers"])):
            if self.users["commonUsers"][user]["username"] == username:
                found = user
        
        return found

    def createNewUser(self, username: str, password: str) -> bool:
        """
            Registers new user into the Database in case it does not exist
            Returns: TRUE if it could register new user, FALSE otherwise
        """
        try:
            if not self.findUser(username):
                newUser = {"username": username,"password": self.encryptPassword(username, password).hex()}
                self.users["commonUsers"].append(newUser)

                with open("./Users.json", "w") as file:
                    json.dump(self.users, file, indent=4)

                file.close()
            else:
                print("user already registered")
            
            return True
        except Exception as e:
            print(f"[error] unable to create new user: {e}")
            return False

    def changePassword(self, username: str, newPassword: str) -> bool:
        try:
            if self.findUser(username):
                newPass = self.encryptPassword(username, newPassword).hex()
                userIndex = self.findIndex(username)
                del self.users["commonUsers"][userIndex]["password"]
                self.users["commonUsers"][userIndex]["password"] = newPass

            with open("./Users.json", "w") as file:
                json.dump(self.users, file, indent=4)
            
            return True
        except Exception as e:
            print(f"Error on changing password - {e}")
            return False

if __name__ == "__main__":
    #test 1
    test = LoginServer()
    test.createNewUser("Gabriel", "123123")
    encryptionTest = test.encrypt(test.derive_secret_key("user1", "test123"), b"e7e2456a808ebfec10d56443ab85a5cbf22701c02a98d875081d130cd38e495a")
    print(test.decrypt(test.derive_secret_key("user1", "test123"), encryptionTest).decode())

    # test 2
    testNewEncrypt = test.encryptPassword("user1", "test123")
    print(test.decryptPassword(test.derive_secret_key("user1", "test123"), testNewEncrypt))

    # test 3
    test.createNewUser("Gabriel Lemos", "test123")
    test.changePassword("Gabriel Lemos", "123123")
    gottenPassword = test.users["commonUsers"][test.findIndex("Gabriel Lemos")]["password"]
    print(test.decryptPassword(test.derive_secret_key("Gabriel Lemos", "123123"), bytes.fromhex(gottenPassword)))