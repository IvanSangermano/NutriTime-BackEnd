const validationStringBetweenTwoHours = (hourActStart, hourActFinal, hourInitial, hourFinal) => {
  
  if((hourActStart < hourInitial) && (hourActFinal < hourInitial)){
    return true;
  }
  if((hourActStart > hourFinal) && (hourActFinal > hourFinal)){
    return true;
  }
  return false;
};

module.exports = validationStringBetweenTwoHours;