import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './Slices/getEmployeeSlice';
import allEmployeesReducer from './Slices/getEmployeesSlice';
import teamsReducer from './Slices/getTeamsSlice';
import citiesReducer from './Slices/getCitiesSlice';
import rolesReducer from './Slices/getRolesSlice';
import employeesByTeamReducer from './Slices/getEmployeesByTeamSlice';
import loginReducer from './Slices/getLoginSlice';
import passwordResetReducer from './Slices/passwordResetSlice';
import updateEmployeeReducer from './Slices/updateEmployeeSlice';
import supervisorReducer from './Slices/supervisorSlice';
import employeePDFReducer from './Slices/getEmployeePDFSlice';
import historyReducer from './Slices/historySlice';
import createEmployeeReducer from './Slices/createEmployeeSlice';
import usersReducer from './Slices/getUsersSlice';
import deleteUserReducer from './Slices/deleteUserSlice';
import createUserReducer from "./Slices/createUserSlice"
import getUsersPDFReducer from "./Slices/getUsersPDFSlice"
import updateUserReducer from "./Slices/updateUserSlice"

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        allEmployees: allEmployeesReducer,
        teams: teamsReducer,
        cities: citiesReducer,
        history: historyReducer,
        roles: rolesReducer,
        employeesByTeam: employeesByTeamReducer,
        loginSlice: loginReducer,
        passwordReset: passwordResetReducer,
        updateEmployee: updateEmployeeReducer,
        createEmployee: createEmployeeReducer,
        supervisor: supervisorReducer,
        employeePDF: employeePDFReducer,
        users: usersReducer,
        deleteUser: deleteUserReducer,
        createUser: createUserReducer,
        usersPDF: getUsersPDFReducer,
        updateUser: updateUserReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
