/*
todo:
    isPrime uses a lookup table
    extended euclidean
    prime factorization
        for totient function
    msg to num
    num to msg
* */

const determine_a_b = (x, y) =>{
    return {
        a: Math.max(x,y),
        b: Math.min(x,y)
    }
}

const euclidean = (a,b) => { // assumes a and b are already ordered
    let c;
    while (true) { // uses the euclidean algorithm
        c = a % b
        if (c === 0) {
            return b
        }
        //console.log(`a: ${a}, b: ${b}\nc: ${c}`)
        a = b
        b = c
    }
}

const isPrime = (p) => {
    /*
    checks if a num is prime
    todo:
        only check for primes
        keep a lookup table of primes?
     */
    if (p === 2 || p === 1) return true;
    if (p<=0 || p % 2 ===0) return false;

    for (prime=3; prime <=parseInt(Math.sqrt(p)); prime+=2) {
        if (p % prime === 0) return false;
    }
    return true;
}

const egcd = (a, m) => {
    if (a===0){
        return [m, 0, 1]
    }
    else {
        let list = egcd(m %a, a)
        console.log(list)
        return [list[0], list[2] - (m / a) * list[1], list[1]]
    }
}

const modinv = (a,m) => { // todo: make this work.  https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm

    console.log("modinv shortcut", a * (m-1) % m)
    return a * (m-1) % m
    let list = egcd(a, m)
    if (list[0]!==1){
        return
    }
    else {
        return list[2] % m
    }
}

module.exports = {
    gcd: (x, y) => { // orders a and b and then performs the euclidean algorithm
        let {a,b} = determine_a_b(x,y);
        return euclidean(a,b)
    },
    gen_RSA: (p,q) => { // takes 2 primes and generates a private n public key
        // todo: implement

        // determines n, the product of p and q
        const n = p * q
        tot_n = (p-1) * (q-1) // totient(n) = (p-1)(q-1) since n is composite and the product of both

        // e is a prime number less than tot_n
        const e = 13 // just use a tiny ass number

        // determine d. it is the modular inverse of e and tot_n
        let d = modinv(e, tot_n)

        return {
            public: {n:n, e:e},
            private: {n:n, d:d}
        }
    },
    encrypt: (msg, pubKey) => { // this is generated and usable by everyone
        const n = pubKey['n']
        const e = pubKey['e']

        return Math.pow(msg, e) % n
    },
    decrypt: (crypt, privKey) => { // only the client can have this. how?
        const n = privKey['n']
        const d = privKey['d']

        return Math.pow(crypt, d) % n // handle big nums
    },
    msgToNum: (msg) => {},
    NumTomsg: (crypted) => {},
    modinv,
    egcd
}