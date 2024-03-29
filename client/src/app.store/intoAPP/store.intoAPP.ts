import axios from 'axios';
import create from 'zustand';

export const useStoreIntoAPP = create<any>((set, get) => ({
  getUser: {
    login: false,
    isLoading: true,
  },
  userInfo: {},

  requestAuthUser: async (): Promise<any> => {
    const session = await axios.get('/api/user/session');

    set((state) => {
      state.getUser = {
        login: session.data.result.login,
        isLoading: false,
      };
      state.userInfo = {
        ...state.userInfo,
        ...session.data.result.user,
      };
    });
  },
}));

export const useGetUser = () => {
  return useStoreIntoAPP((state) => state.getUser);
};

export const useUserInfo = () => {
  return useStoreIntoAPP((state) => state.userInfo);
};
