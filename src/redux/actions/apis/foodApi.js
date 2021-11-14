import axiosClient from './axiosClient';

const foodApi = {
  getFoodByRes(resId) {
    const url = `/food/restaurant/${resId}`;
    return axiosClient.get(url);
  },
  getFoodByMenu(menuId) {
    const url = `/food/${menuId}`;
    return axiosClient.get(url);
  },
};

export default foodApi;
