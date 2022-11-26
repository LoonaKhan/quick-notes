const {gcd, gen_RSA, encrypt, decrypt, mod, modinv, egcd} = require('../encryption')

console.log(gcd(124135, 6943))
console.log(egcd(124135,6943))
console.log()
const {public, private} = gen_RSA(17, 37)
console.log(public, private)
console.log(encrypt(16, public))
console.log(decrypt(encrypt(16, public), private))
