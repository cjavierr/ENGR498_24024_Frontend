import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css"; // Import the CSS file
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Cascader,
  Steps,
  theme,
  Typography,
  Card,
  message
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useHistory } from "react-router";

const { Option } = Select;
const { TextArea } = Input;


const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(()=>{
        const username = localStorage.getItem("loggedInUser");
        const fetchUser= async ()=>{
            const response = await axios.post("http://localhost:3001/api/getUser", {
                username: username, // Send username in request body
            });
            if(!response.data.isAdmin){

            }else{
                setIsAdmin(true);
            }
        }
        fetchUser();
    },[]);

    return(
        <>
        {
            isAdmin ?(
                <p>Welcome admin</p>
             ):(
                <p>Access Denied</p>
              )
        }
        </>
    );
};

export default Admin;