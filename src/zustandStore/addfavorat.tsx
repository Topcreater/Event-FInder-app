// zustandStore/addfavorat.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
    persist(
        set => ({
            data: [],
            addData: (newData: any) => set((state: any) => ({ data: [...state.data, newData] })),
            removeData: (itemId: string) => {
                set((state: any) => ({
                    data: state.data.filter((dataItem: any) => dataItem.id !== itemId),
                }));
            },
        }),
        {
            name: 'my-persisted-store',
            getStorage: () => AsyncStorage,
        },
    ),
);

export default useStore;
