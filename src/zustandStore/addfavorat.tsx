import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
    // persist(
    set => ({
        data: [],
        addData: (newData: any) => set((state: any) => ({ data: [...state.data, newData] })),
        removeData: (item: any, index: any) => {
            set((state: any) => ({
                data: state.data.filter((dataItem: any, index: any) => dataItem.id !== item.id),
            }));
        },
    }),
    //     {
    //         name: 'my-persisted-store', // name for the storage key
    //         getStorage: () => AsyncStorage, // AsyncStorage for React Native
    //     },
    // ),
);

export default useStore;