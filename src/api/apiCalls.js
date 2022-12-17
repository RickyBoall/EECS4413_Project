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
  data.creditCard = "";
  //   console.log(new Date().toLocaleString()); //e.x out 12/16/2022, 2:53:00 PM
  return fetch(backend + "/orders/" + userID, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      responseData = data;
      // console.log(data);
      // const itemList = data;
      // console.log(data);
      // setItems([...itemList]);
      // setLoading(false);
      updateUserLocal();
      return data;
    });
};

export const updateUserLocal = async () => {
  let userId = JSON.parse(window.localStorage.getItem("user")).id;
  fetch(
    "http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/users/" +
      userId
  )
    .then((res) => res.json())
    .then((user) => {
      // console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
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

export const setRating = async (itemId, data) => {
  // let userId = JSON.parse(window.localStorage.getItem('user')).id;
  fetch(
    "http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/reviews/" +
      itemId,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((user) => {
      // console.log(user);
      return;
    });
};
