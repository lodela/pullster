module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      ID: { type: String, required: true, unique: true },
      name: String,
      lastName: String,
      location: String,
      admin: Boolean
    },
    { timestamps: true }
  );
  schema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })
  const user = mongoose.model('user', schema);
  return user;
}
