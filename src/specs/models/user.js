// Food is a base class
class User {
  constructor(phoneNumber, name, address, latitude, longitude, schoolAddress) {
    this.phoneNumber = phoneNumber
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
