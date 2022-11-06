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
        console.log(`a: ${a}, b: ${b}\nc: ${c}`)
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
        let g, y, x = egcd(m %a, a)
        return [g, x - (m / a) * y, y]
    }
}

const modinv = (a,m) => { // todo: make this work.  https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm
    let g, x, y = egcd(a, m)
    if (g!==1){
        return
    }
    else {
        return x % m
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

        return Math.pow(msg, d) % n
    },
    msgToNum: (msg) => {},
    NumTomsg: (crypted) => {}
}