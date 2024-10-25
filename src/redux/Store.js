import { configureStore,  combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./auth/AuthSlice"
import serviceSlice from "./service/ServiceSlice";
import professionSlice from "./service/ProfessionSlice";
import dateTimeReducer from "./service/DateTimeSlice";
import totalAddressReducer from "./service/AddressSlice"
import patientReducer from "./patient/PatientSlice";
import userReducer from "./user/userSlice"

const persistConfig = {
  key: 'root', 
  version: 1,
  storage,
};



// const store = configureStore({
//   reducer: {
//     auth:authReducer,
//     service: serviceSlice.reducer,
//     profession: professionSlice.reducer,
//     dateTime:dateTimeReducer,
//     totalAddress:totalAddressReducer,
//     patient: patientReducer,
//     user:userReducer, 
//   },
// });

const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceSlice.reducer,
  profession: professionSlice.reducer,
  dateTime: dateTimeReducer,
  totalAddress: totalAddressReducer,
  patient: patientReducer,
  user: userReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export  {store, persistor};
