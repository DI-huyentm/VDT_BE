exports.queryFilterObject = (queryStringObject, Op) => {
  // console.log(queryStringObject);
  const filterObject = {};

  for (let prop in queryStringObject) {
    switch (prop) {
      case "name":
        filterObject[prop] = {
          [Op.like]: `%${queryStringObject[prop]}%`,
        };
        break;
      case "address":
        filterObject[prop] = { [Op.like]: `%${queryStringObject[prop]}%` };
        break;
      case "air_conditioner":
        filterObject[prop] = { [Op.eq]: 1 };
        break;
      case "is_crowded":
        filterObject[prop] = { [Op.eq]: 1 };
        break;
      case "current_hour":
        filterObject["open_hour"] = { [Op.lte]: queryStringObject[prop] };
        filterObject["close_hour"] = { [Op.gte]: queryStringObject[prop] };
        break;
    }
  }
  // console.log(filterObject);
  return filterObject;
};
