import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  content: String,
  title: String,
  class: String,
});

class UserModel {
  user = mongoose.model('user', userSchema);

  public saveUser(posts: any, callback: any) {
    this.user.create(posts, callback);
  }

  public fetchUser(id: any, callback: any) {
    this.user.findById(id, callback);
  }
}

export default UserModel;
