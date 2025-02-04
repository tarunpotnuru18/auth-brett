//error is an array
export default function zoderror(error) {
   
  let response = {};
  error.forEach((element) => {
    response[element.path[0]] = element.message;
  });
  
  return response
}
