import axiosClient from './axiosClient';

const listChooseApi = {
  getListChooseAll() {
    const url = `/listChoose`;
    return axiosClient.get(url);
  },
  getListChooseById(id) {
    const url = `/listChoose/${id}`;
    return axiosClient.get(url);
  },
};

export default listChooseApi;
