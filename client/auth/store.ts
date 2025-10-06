//TODO: Most abba hagyom mert új dolog ez a Redux, ezt elolvasni majd holnap: https://medium.com/@faisalqayyum.se/understanding-redux-and-implementing-it-with-redux-toolkit-in-react-native-adad4a14a881


import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authReducer";

const store = configureStore({
    reducer: reducer
})