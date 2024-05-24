// User model
class User {
  constructor(username, email, password, role, vehicleType = "") {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.vehicleType = vehicleType;
  }
}
export default User;
