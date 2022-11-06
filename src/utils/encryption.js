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
        c = b % a
        if (c === 0) {
            return a
        }
        console.log(c)
        b = a
        a = c
    }
}

const extendedEuclidean = (a,b) => {}

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

const primeFactorization = (p) => {
    if (!isPrime(p)) return;
    // find the prime factorization. tree??
}

const totient = (n) => { // recursion?
    if (isPrime(n)){
        return n-1
    }
    else { // prime factorize and take their totients

    }
}

module.exports = {
    gcd: (x, y) => { // orders a and b and then performs the euclidean algorithm
        let {a,b} = determine_a_b(x,y);
        return euclidean(a,b)
    },
    extended_euclidean: () => {},
    gen_RSA: (p,q) => { // takes 2 primes and generates a private n public key
        // todo: implement

        // determines n, the product of p and q
        const n = p * q

        tot_n = totient(n) // find totient(n)

        // 1<e<totient(n) -> gcd(e, totient(n)) === 1

        // determine d through extended euclidean algo

        return {
            public: {n:n, e:e},
            private: {n:n, d:d}
        }
    },
    encrypt: (msg, pubKey) => { // this is generated and usable by everyone
        const n = pubKey[n]
        const e = pubKey[e]

        return Math.pow(msg, e) % n
    },
    decrypt: (crypt, privKey) => { // only the client can have this. how?
        const n = privKey[n]
        const d = privKey[d]

        return Math.pow(msg, d) % n
    },
    msgToNum: (msg) => {},
    NumTomsg: (crypted) => {}
}