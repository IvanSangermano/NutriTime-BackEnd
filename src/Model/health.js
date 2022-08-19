const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');

const HealthSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  age: {
    type: String,
  },
  sex: {
    type: String,
  },
  day: {
    type: Date,
  },
  macroCheck: {
    type: Boolean
  },
  stage: {
    type: String,
  },
  activity: {
    type: Number,
  }
},);
HealthSchema.virtual('imc').get(function() {
  const imc = Number(this.weight) / (Number(this.height)^2)
  return imc
  }); 
  
HealthSchema.virtual('macros').get(function() {
  if(this.macroCheck){ 
    let macros = {}
    let tmbWhitoutActivity = null
    if(this.sex === 'male'){
      tmbWhitoutActivity = (10*this.weight + 6.25*this.weight + 5*this.age + 5)

      //MACROS HOMBRE VOLUMEN
      if (this.stage === 'volume'){
        macros = {
          tmb: (tmbWhitoutActivity*this.activity),
          carbohydrates: (((tmbWhitoutActivity*this.activity)*0.55)/4),
          protein: (((tmbWhitoutActivity*this.activity)*0.25)/4),
          fats: (((tmbWhitoutActivity*this.activity)*0.20)/9),
        }
      }
      //MACROS HOMBRE DEFINICION
      if (this.stage === 'definition'){
        macros = {
          tmb: (tmbWhitoutActivity*this.activity),
          carbohydrates: (((tmbWhitoutActivity*this.activity)*0.40)/4),
          protein: (((tmbWhitoutActivity*this.activity)*0.35)/4),
          fats: (((tmbWhitoutActivity*this.activity)*0.25)/9),
       }
      }
    }
    if(this.sex === 'female'){
      tmbWhitoutActivity = (20*this.weight + 6.25*this.weight + 5*this.age - 161)

      //MACROS MUJER VOLUMEN
      if (this.stage === 'volume'){
        macros = {
          tmb: (tmbWhitoutActivity*this.activity),
          carbohydrates: (((tmbWhitoutActivity*this.activity)*0.55)/4),
          protein: (((tmbWhitoutActivity*this.activity)*0.25)/4),
          fats: (((tmbWhitoutActivity*this.activity)*0.20)/9),
        }
      }
      //MACROS MUJER DEFINICION
      if (this.stage === 'definition'){
        macros = {
          tmb: (tmbWhitoutActivity*this.activity),
          carbohydrates: (((tmbWhitoutActivity*this.activity)*0.40)/4),
          protein: (((tmbWhitoutActivity*this.activity)*0.35)/4),
          fats: (((tmbWhitoutActivity*this.activity)*0.25)/9),
       }
      }
    }
  return macros
  }
}); 
HealthSchema.set('toJSON', { virtuals: true });
module.exports = model('Health', HealthSchema);

