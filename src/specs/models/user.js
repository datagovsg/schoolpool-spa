// Class construction. Reference: https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes
class User {
  constructor(name, address, latitude, longitude) {
    this.name = name
    this.address = address
    this.latitude = latitude
    this.longitude = longitude
  }

  print() {
    console.log(this.toString())
  }
}

export default User
