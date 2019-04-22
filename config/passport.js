const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Admin = mongoose.model('Admin')
const Lawyer = mongoose.model('Lawyer')
const Reviewer = mongoose.model('Reviewer')
const Investor = mongoose.model('Investor')

const tokenKey = require('./keys')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = tokenKey.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    const currentAdmin = await Admin.findById(jwtPayload.id)
    const currentLawyer = await Lawyer.findById(jwtPayload.id)
    const currentReviewer = await Reviewer.findById(jwtPayload.id)
    const currentInvestor = await Investor.findById(jwtPayload.id)
    if (currentAdmin) {
      return done(null, currentAdmin)
    } else if ((currentLawyer)) {
      return done(null, currentLawyer)
    } else if (currentReviewer) {
      return done(null, currentReviewer)
    } else if (currentInvestor) {
      return done(null, currentInvestor)
    } else {
      return done(null, false)
    }
  }))
}
