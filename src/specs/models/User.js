// Class construction. Reference: https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes
class User {
  constructor(name, address, latitude, longitude, schoolAddress) {
    this.name = name
    this.address = address
    this.latitude = latitude
    this.longitude = longitude
    this.schoolAddress = schoolAddress
  }

  print() {
    console.log(this.toString())
  }
}

export default User
