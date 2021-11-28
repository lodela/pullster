module.exports = mongoose => {
  const noteSchema = new mongoose.Schema(
    {
      by: String,
      date: String,
      note: String
    }
  );
  const wrongAnswerSchema = new mongoose.Schema(
    {
      key: String,
      value: String
    }
  );
  const schema = mongoose.Schema(
    {
      name: String,
      lastName: String,
      userId: { type: String, required: true },
      tags: Array,
      status: String,
      notes: [noteSchema],
      wrong: [wrongAnswerSchema],
      date: Number,
      surveyId: { type: String, required: true },
    },
    { timestamps: true }
  );
  schema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })
  const answer = mongoose.model('answer', schema);
  return answer;
}

/*
db.answers.insertMany([
  {
    name:"Norberto",
    lastName:"Lodela",
    tags:["health_and_safety","vaccines"],
    status:"Ok",
    notes:[],
    wrong:[{key:"Temperature: ",value:"36.9"},{key:"Any other symptoms?",value:"NO"}],
    date:20211113,
    surveyId:"618a8c90dc00369fb6079197"
  },
  {
    name: 'Naira',
    lastName: 'Almonte',
    tags: ['health_and_safety', 'vaccines'],
    status: 'ok',
    notes: [{by:'Norberto Lodela',date:'Today 8:32 am', note:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae blandit ipsum. Sed sollicitudin nibh nunc, ut mollis mi viverra in. Aliquam rhoncus felis eget molestie bibendum.'}],
    wrong:[{key:"Temperature: ",value:"36.2"},{key:"Any other symptoms?",value:"NO"}],
    date:20211113,
    surveyId:"618a8c90dc00369fb6079197"
  }
])


*/
