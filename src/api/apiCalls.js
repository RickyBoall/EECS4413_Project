const backend =
  "http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com";

// const backend = "http://localhost:8080/demo";

// export const orderPage = async () => {
//   return 5;
// };

export const testItemCall = async () => {
  let data = {};
  fetch(backend + "/items", {
    method: "GET",
    headers: { "Content-Type": "application/json" }, //,
    // body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      // a = data;
      // console.log(data);
      // const itemList = data;
      // console.log(data);
      // setItems([...itemList]);
      // setLoading(false);
      console.log(data);
      // console.log(itemList);
    });
  // const itemList = a._embedded.itemList;
  // console.log(a);
};

export const createOrder = async (data, userID) => {
  let responseData;
  data.date = new Date().toLocaleString();
  //   console.log(new Date().toLocaleString()); //e.x out 12/16/2022, 2:53:00 PM
  return fetch(backend + "/orders/" + userID, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      responseData = data;
      return data;
    });
};

// export const getOrders = async (userID)

export const getEvents = async () => {
  return fetch(backend + "/events", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
