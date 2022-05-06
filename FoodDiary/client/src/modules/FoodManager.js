import FoodSchedule from "../components/FoodScheduleForm";
import { getToken } from "./authManager";
const apiUrl = "/api/Food";
const apiFoodSchedule = "/api/FoodSchedule";

export const getAllFood = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetAll`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get food.");
      }
    });
  });
};

export const getFoodbyDate = (date) => {
  return getToken().then((token) => {
    return fetch(`${apiFoodSchedule}/Date/${date}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get food.");
      }
    });
  });
};

export const addFood = (food) => {
  return getToken().then((token) =>
    fetch(`${apiUrl}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    }).then((resp) => resp.json())
  );
};

export const addSchedule = (FoodSchedule) => {
  return getToken().then((token) =>
    fetch(`${apiFoodSchedule}/Schedule`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FoodSchedule),
    }).then((resp) => resp.json())
  );
};

export const GetFoodById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get food.");
      }
    });
  });
};

export const EditFoodById = (food) => {
  console.log(food.id);
  return getToken().then((token) => {
    return fetch(`${apiUrl}/Edit/${food.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error(
          "An unknown error occurred while trying to get edit food."
        );
      }
    });
  });
};

export const getFoodScheduleById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiFoodSchedule}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get food schedule id."
        );
      }
    });
  });
};

export const deleteFoodSchedule = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiFoodSchedule}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.ok;
      } else {
        throw new Error("An error occurred deleting favorite");
      }
    });
  });
};
