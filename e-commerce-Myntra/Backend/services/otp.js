const otpGenerator = require('otp-generator')

module.exports.generateOtp = async () => {
    const otpConfig = {
        digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false
    }
    const otp = otpGenerator.generate(4, otpConfig);
    return otp;
}
