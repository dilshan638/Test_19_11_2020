import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function loginUser(userData) {
    return axios
        .post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            return res;
        });
};

export function getUserData(user_id) {
    const userId = user_id || getUserIdFromToken();
    return axios
        .get(`/user/${userId}`)
        .then((res) => {
            return res.data;
        });
};


export function signupCheckUser(newUserData) {
    return axios
        .get('/checkUser', {
            params: newUserData
        })
        .then((res) => {
            const { userExists } = res.data;
            return userExists;
        });
};

export function signupUser(newUserData) {
    return axios
        .post('/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
        });
};

export function logoutUser() {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
};

export function uploadImage(formData) {
    return axios
        .post('/user/image', formData);
};

export function editUserDetails(userDetails) {
    return axios
        .post('/user', userDetails);
};

export function getUserDataByHandle(userHandle){
    return axios
        .get(`/user/${userHandle}`);
};

export function getUserIdFromToken(){
    const token = localStorage.getItem('FBIdToken');
    const decodedToken = jwtDecode(token);
    return decodedToken.user_id;
}
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};
