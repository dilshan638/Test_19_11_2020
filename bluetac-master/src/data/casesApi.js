import axios from 'axios';

export function getCases() {
    return axios
        .get('/cases');
};

export function getCase(caseId) {
    return axios
        .get(`/case/${caseId}`);
};


export function postCase(newCase) {
    return axios
        .post('/case', newCase);
};

export function deleteCase(caseId) {
    return axios
        .delete(`/case/${caseId}`);
};


