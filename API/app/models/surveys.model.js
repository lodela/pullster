module.exports = mongoose => {
  const optionsSchema = new mongoose.Schema(
    {
      ID: { type: String, required: true },
      questionID: Number,
      orderPosition: Number,
      OptionText: String,
      OptionColor: String,
      hasRemarks: Boolean,
      expectedResponse: Boolean
    }
  );
  const questionSchema = new mongoose.Schema(
    {
      ID: { type: String, required: true },
      Type: String,
      Text: String,
      Options: [optionsSchema],
      Required: Boolean,
      Remaks: String,
      hasRemarks: Boolean,
      expectedResponse: Number
    }
  );
  const responsesSchema = new mongoose.Schema(
    {
      key: String,
      value: String
    }
  );
  const schema = mongoose.Schema(
    {
      type: String,
      title: String,
      isDeleted: Boolean,
      isAnonymous: Boolean,
      questions: [questionSchema],
      responses: [responsesSchema],
      subTitle: String,
      intro: String,
      buttonText: { type: String, default: 'Take Survey' },
      extraButton: Boolean,
      extraButtonText: String | null,
      recipients: Array
    },
    { timestamps: true }
  );
  schema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })
  const survey = mongoose.model('survey', schema);
  return survey;
}


/*
db.surveys.insertMany(
  [
    {
      type:'General Inquiry',
      title: 'Test 3',
      isDeleted: false,
      isAnonymous: false,
      questions: [
        {
          ID: 0,
          Type: 'Single choice',
          Text: '¿De que color es el cielo?',
          Options: [{
            ID: 1,
            OptionText: 'Verde',
            OptionColor: '',
            hasRemarks: false
          }, {
            ID: 2,
            OptionText: 'Rosa',
            OptionColor: '',
            hasRemarks: false
          }, {
            ID: 3,
            OptionText: 'Azul',
            OptionColor: '',
            hasRemarks: false
          }, {
            ID: 4,
            OptionText: 'Que cielo?',
            OptionColor: '',
            hasRemarks: false
          }],
          Required: false,
          Remarks: '',
          hasRemarks: false,
          expectedResponse: 3,
        },
        {
          ID: 0,
          Type: 'Multi choice',
          Text: '¿A que huelen las nubes?',
          Options: [{
            ID: 1,
            OptionText: 'a nada',
            OptionColor: '',
            hasRemarks: false
          }, {
            ID: 2,
            OptionText: 'contaminacion',
            OptionColor: '',
            hasRemarks: false
          }, {
            ID: 3,
            OptionText: 'Achis las nubes tienen olor?',
            OptionColor: '',
            hasRemarks: false
          }, {
            ID: 4,
            OptionText: 'No se',
            OptionColor: '',
            hasRemarks: false
          }],
          Required: false,
          Remarks: '',
          hasRemarks: false,
          expectedResponse: null,
        },
        {
          ID: 0,
          Type: 'Single choice',
          Text: 'Si el Hombre-Araña, la mujer... ¿rasguña?',
          Options: [{
            ID: 1,
            OptionText: 'jajajajaja',
            OptionColor: '',
            hasRemarks: false,
            expectedResponse: true,
          }, {
            ID: 2,
            OptionText: '¿que pregunta es esta?',
            OptionColor: '',
            hasRemarks: false
          }],
          Required: false,
          Remarks: '',
          hasRemarks: false,
          expectedResponse: 1,
        }
      ],
      responses: [],
      subTitle: 'Three Questions, 1 minute...',
      intro: 'Por favor lee con cuidado las preguntas y contesta de acuerdo a tu consideración.',
      extraButton: true,
      extraButtonText: 'I Feel OK',
    },
    {
      type: 'Health Screening',
      title: 'Test 5',
      isDeleted: false,
      isAnonymous: false,
      questions: [
        {
          ID: 1,
          Type: 'Multi choice',
          Text: 'Are you experiencing any or the combination of the following symptoms?',
          Options: [
            {
              ID: 1,
              OptionText: 'Fever',
              OptionColor: '',
              hasRemarks: false
            }, {
              ID: 2,
              OptionText: 'Muscle Aches',
              OptionColor: '',
              hasRemarks: false
            }, {
              ID: 3,
              OptionText: 'Fatigue',
              OptionColor: '',
              hasRemarks: false
            }, {
              ID: 4,
              OptionText: 'Headache',
              OptionColor: '',
              hasRemarks: false
            }, {
              ID: 5,
              OptionText: 'Sore throat',
              OptionColor: '',
              hasRemarks: false
            }, {
              ID: 6,
              OptionText: 'Runny nose',
              OptionColor: '',
              hasRemarks: false
            }, {
              ID: 7,
              OptionText: 'Other Symptoms',
              OptionColor: '',
              hasRemarks: true,
              expectedResponse: false,
            },
            {
              ID: 8,
              OptionText: 'None of them',
              OptionColor: 'green',
              hasRemarks: false,
              expectedResponse: true
            }
          ],
          Required: true,
          Remarks: '',
          hasRemarks: true,
          expectedResponse: 8,
        }, {
          ID: 2,
          Type: 'Single choice',
          Text: 'Are you in close contact with a person who is sick with any respiratory symptoms or who recently travelled outside of Mexico? Have you been in a large group of people, public or private event, setting',
          Options: [
            {
              ID: 1,
              OptionText: 'Yes',
              OptionColor: '',
              hasRemarks: false
            }, {
              ID: 2,
              OptionText: 'No',
              OptionColor: '',
              hasRemarks: false,
              expectedResponse: true,
            }
          ],
          Required: false,
          Remarks: '',
          hasRemarks: false,
          expectedResponse: 2,
        }, {
          ID: 3,
          Type: 'Text',
          Text: 'What is your today\'s temperature?',
          Options: [],
          Required: true,
          Remarks: '',
          hasRemarks: false,
          expectedResponse: null,
        }, {
          ID: 4,
          Type: 'Single choice',
          Text: 'Anyone how present symptoms, including: cough, runny nose, fever, or sore throat, should immediately report to RH via email or phone.',
          Options: [
            {
              ID: 1,
              OptionText: 'Ok I Agree',
              OptionColor: '',
              hasRemarks: false,
              expectedResponse: true,
            }, {
              ID: 2,
              OptionText: 'No, I will not contact HR.',
              OptionColor: '',
              hasRemarks: false
            }
          ],
          Required: true,
          Remarks: '',
          hasRemarks: true,
          expectedResponse: 1
        },
        {
          ID: 5,
          Type: 'Text',
          Text: 'Any other symptoms?',
          Options: [],
          Required: true,
          Remarks: '',
          hasRemarks: true,
          expectedResponse: null,
        }
      ],
      responses: [],
      subTitle : 'How do you feel today?',
      intro : 'Por favor lee con cuidado las preguntas y contesta de acuerdo a tu consideración.',
      extraButton : true,
      extraButtonText : 'I Feel OK',
    }
  ])
  */
