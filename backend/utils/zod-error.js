//error is an array
export default function zoderror(error) {
  let response = {};
  let responeString = [];
  console.log(error);
  error.forEach((element) => {
    response[element.path[0]] = element.message;

    responeString.push(element.path[0]);
  });

  // return response;
  return responeString.join(" , ") + " are in invalid format";
}
