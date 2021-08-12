import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore, createSlice} from '@reduxjs/toolkit'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore } from 'redux-persist'

interface Answer { 
    questionNumber: number,
    isCorrect: boolean,
    question: string,
}

interface Settings{
    difficulty: string,
    amount: number,
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["questions"]
};

const answersInitialState: Array<Answer> = []
const settingsInitialState: Settings = {difficulty: "hard", amount: 1}

const answersSlice = createSlice({
    name: 'answers',
    initialState:  answersInitialState,
    reducers: {
        addAnswer(state, action) {
            state.push({
                ...action.payload
            });
        },
        removeAnswers(state) {
            return state = []
        }
    },
});


const settingSlice = createSlice({
    name: 'settings',
    initialState:  settingsInitialState,
    reducers: {
        addSetting(state, action) {
           return state = action.payload;
        },
    },
});

const questionApi = createApi({
    reducerPath: 'questions',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://opentdb.com/api.php',
    }),
    endpoints: (builder) => ({
        getQuestions: builder.query<any, { difficulty: string; amount: number }>({
            query: (args) => {
                const {difficulty, amount} = args;
                return {
                    url: "/",
                    params: {difficulty, amount, type: "boolean"}
                    
                }
            },
        }),
    }),
});

export const { useGetQuestionsQuery } = questionApi;
export const { addAnswer, removeAnswers } = answersSlice.actions
export const { addSetting } = settingSlice.actions;

const reducers = combineReducers({
    [questionApi.reducerPath]: questionApi.reducer,
    answers: answersSlice.reducer,
    settings: settingSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },}).concat(questionApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
