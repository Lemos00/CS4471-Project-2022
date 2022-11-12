from login import LoginServer
import pytest
import string
import random

# python -m pytest loginTests.py
test = LoginServer()

def test_EncryptDecrypt() -> None:
    """
        Test Encrypt and Decrypt methods
    """
    global test
    username = "userTesting"
    password = "123123"

    test = LoginServer()
    testNewEncrypt = test.encryptPassword(username, password)
    assert password == test.decryptPassword(test.derive_secret_key(username, password), testNewEncrypt)

def test_userCreation() -> None:
    """
        Test successful user creation
    """
    global test
    S = 14 
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))

    test.createNewUser(ran, "123123")
    assert test.findUser(ran) == True
    
    userIndex = test.findIndex(ran)
    
    del test.users["commonUsers"][userIndex]
        
    test.writeUsers()

def test_userCreation() -> None:
    """
        Test successful user creation
    """
    global test
    S = 14 
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))

    test.createNewUser(ran, "123123")
    assert test.findUser(ran) == True
    
    userIndex = test.findIndex(ran)
    
    del test.users["commonUsers"][userIndex]
        
    test.writeUsers()

def test_changePassword():
    """
        test if chaging password of existing user works
    """
    global test
    S = 14 
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))

    test.createNewUser(ran, "test123")
    test.changePassword(ran, "123123")

    gottenPassword = test.users["commonUsers"][test.findIndex(ran)]["password"]
    assert "123123" == test.decryptPassword(test.derive_secret_key(ran, "123123"), bytes.fromhex(gottenPassword))

    userIndex = test.findIndex(ran) 
    del test.users["commonUsers"][userIndex]
    test.writeUsers()

def test_login():
    """
        Test if login functionality is working
    """
    global test
    test.createNewUser("Gabriel Lemos", "123123")

    assert True == test.loginUser("Gabriel Lemos", "123123")
    assert False == test.loginUser("Gabriel Lemos", "abcd")
    

if __name__ == "__main__":
    test_EncryptDecrypt()
    test_changePassword()
    test_changePassword()
    test_login()