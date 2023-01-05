import axios from "axios";

// http://192.168.0.124:8080/user/login/ 

const API_URL = "http://43.206.230.159:8080/user";

const login = (username, password) => {
    console.log("LOGINISHAPPENING")
    return axios
    .post(API_URL + "/login/", {
        username,
        password,
    })
    .then((response) => {
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    login,
    logout,
    getCurrentUser,
};

export default authService;