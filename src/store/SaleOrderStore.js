import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useSaleOrdersStore = create(
    persist(
        (set) => ({
            saleOrders: [],
            addSaleOrder: (order) => set((state) => ({saleOrders: [...state.saleOrders, order]})),

            clearSaleOrders: () => set({saleOrders: []}),
        }),
        {
            name: 'sale-orders-storage',

        }
    )
);

export default useSaleOrdersStore;
