import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, PersistConfig, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import rootReducer, { PersistConfigProps } from '../reducer/combineReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig: PersistConfig<PersistConfigProps> = {
    key: 'root',
    storage,
    whitelist: ['auth', 'chatBot'],
};
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
