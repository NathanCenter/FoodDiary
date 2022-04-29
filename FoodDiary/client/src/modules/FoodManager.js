import { getToken } from "./authManager";
const apiUrl = "/api/Food";

export const getAllFood = () => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/GetAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get food.");
        }
      });
    });
  };

  export const getFoodbyUserID=(date)=>
  {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/FoodSchedule/${date}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(resp => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("An unknown error occurred while trying to get food.");
          }
        });
      });

  }