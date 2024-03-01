import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const withHocBase = (Component) => (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return <Component {...props} navigate={navigate} dispatch={dispatch}></Component>;
};

export default withHocBase;