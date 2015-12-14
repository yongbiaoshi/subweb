function User(name, age){
  this.name = name;
  this.age = age;
  User.prototype.getInfo = function(){
    return {name: this.name, age: this.age};
  };
  User.prototype.getAttribute = function(attr){
    return this[attr];
  };
}
module.exports = User;