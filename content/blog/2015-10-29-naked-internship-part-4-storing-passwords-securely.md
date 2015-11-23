---
description: null
slug: "naked-internship-part-4-storing-passwords-securely"
date: "2014-11-15"
tags: 
  - "null"
published: false
title: "Naked Internship Part 4: Storing Passwords Securely"
author: AndrewLow
header_image: ""
---



Part 4 of a series exposing what it's like to be an intern engineer at a tech consultancy. In this post I get into detail on how to use cryptography and store passwords securely.

When storing user account information in your database, never store the users password in plaintext. Use password hashing and salting! 

Hash functions are simply functions which takes input of an arbitrary length and has an output (hash value) of a fixed size. Any change in the input produces a different hash value. Cryptographic hash functions are designed such that the hash value of an input can be computed easily, but reversing the calculation is almost impossible (or rather extremely difficult). Examples of such hash functions are SHA-256 and MD5. A common application of these hash functions outside the context of passwords is verifying file integrety.

You can easily try out SHA-256/MD5 and see for yourself. Open up a terminal:

    $ echo -n 'Hash this please' | md5sum
    0d39d1c04e3de4c4d6b2fddfae134b5b  -
    $ echo -n 'Hsh this please' | md5sum
    ce4c5fc4e201d41ef96a1211a59c0ae3  -
    
    $ echo -n 'Hash this please' | sha256sum
    74475c5948959ced3237d07ebdb16cab047c1405da52ee4829f5411f5eca8c83  -
    $ echo -n 'Hsh this please' | sha256sum
    387c92fe8fab23d4928aea7da4c96668b3259cb52c240cffc9f8ccadc8e39271  -


The -n option in the echo command tells it "do not output the trailing newline". Here we are just piping the strings 'Hash this please' and 'Hsh this please' to md5sum and sha256sum (which are just programs that calculate hash values). In both examples, we see that removing one character from the input changes the output significantly.

So should we just hash the users passwords and simply store that in the database? No. This is still a bad idea. A problem with hashing passwords is that a hash function by definition *always* outputs the same hash value given the same input. A motivated attacker could employ a dictionary (or even brute force) attack. Dictionary attacks take a list of predetermined password guesses to try, calculates the hash for each guess and check if it matches the actual password hash. Given the frankly [poor choice of password many users use](http://splashdata.com/press/worstpasswords2013.htm), it is not unfeasible that an attacker could crack passwords given a database of vanilla hashed passwords. An even more effective method is reverse lookup (rainbow) tables, in which password lists have their hash values computed beforehand.

A common solution to this is to employ 'salts' in the hashing process. A salt is just an extra string concatenated with the password before hashing. This changes the hash value of the password rendering a lookup table attack ineffective, since the pre-calculated hash values do not take the extra salt string into account. An important thing to note is that the salt itself does not need to be kept secret, something we'll see soon. 

Luckily, we don't have to write our own salt and hashing methods since the Werkzeug library provides them. Let's have a play around to see salts in effect. Open your python interpreter:

    In [1]: from werkzeug import generate_password_hash, check_password_hash
    
    In [2]: generate_password_hash('mY$up3rawesome!password424242')
    Out[2]: 'pbkdf2:sha1:1000$6hiWY2xF$1cdbfe373e217cb8904f6c7077da61f910ad1d57'
    
    In [3]: generate_password_hash('mY$up3rawesome!password424242')
    Out[3]: 'pbkdf2:sha1:1000$aRVsnDmf$730380768bc332ac8cd5a7b4d9656b20fd8912a2'
    
    In [4]: check_password_hash('pbkdf2:sha1:1000$6hiWY2xF$1cdbfe373e217cb8904f6c7077da61f910ad1d57', 'mY$up3rawesome!password424242')
    Out[4]: True
    
    In [5]: check_password_hash('pbkdf2:sha1:1000$aRVsnDmf$730380768bc332ac8cd5a7b4d9656b20fd8912a2', 'mY$up3rawesome!password424242')
    Out[5]: True
    
    In [6]: check_password_hash('pbkdf2:sha1:1000$6hiWY2xF$1cdbfe373e217cb8904f6c7077da61f910ad1d57', 'myWrongPassword')
    Out[6]: False

In lines *2* and *3*, we're generating a password hash from '*mY$up3rawesome!password424242*' using the werkzeug provided method.
Notice that the two passwords given as input are identical, but the returned hash differs. Let's break down the output to see why. The outputed hash string can be seen as having three parts seperated by the '$' character.

	['pbkdf2:sha1:1000', '6hiWY2xF', '1cdbfe373e217cb8904f6c7077da61f910ad1d57']
	['pbkdf2:sha1:1000', 'aRVsnDmf', '730380768bc332ac8cd5a7b4d9656b20fd8912a2']

The first segment indicates the method used to hash the password (needed by the `check_password_hash` method). Here it's saying [PBKDF2](http://en.wikipedia.org/wiki/PBKDF2) (Password-Based Key Derivation Function 2) applied the SHA-1 hash function, 1000 times.
The second segment gives us the salt string used to hash the password (also needed by the `check_password_hash` method). Note the two hash strings have different salts, hence the difference in the hash value (the third segment).
In lines 4 and 5, we're using `check_password_hash` to check the password against the two password hashes returned by `generate_password_hash`.

Within the [`check_password_hash`](https://github.com/mitsuhiko/werkzeug/blob/master/werkzeug/security.py#L233-247) method, the password hash argument is split by the '$' character (giving the segments shown above) and assigned to variables.

`method, salt, hashval = pwhash.split('$', 2)`

The password argument is then hashed using the same method and salt, and compared with the given password hash value.

`return safe_str_cmp(_hash_internal(method, salt, password)[0], hashval)`

We can see that checking the password, '*mY$up3rawesome!password424242*', against the two different hash values returns True, exactly what is expected.

Line 6 shows a case of the `check_password_hash` given a wrong password, '*myWrongPassword*' and returning False.
