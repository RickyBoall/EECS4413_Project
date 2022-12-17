import { useEffect, useState } from "react";
import { BasePage } from "../components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const login = async (e) => {
        e.preventDefault();
        var a = "initial";
        await fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/users')
            .then(res => res.json())
            .then(data => {
            a = data;
            })
            
        const userList = a._embedded.userList;
        console.log(userList)
        let error = true;
        // user and pwd are the inputs
        for (let i = 0; i < userList.length; i++) {
            if (username === userList[i].username && password === userList[i].password) {
                // save the ids in local storage
                // login
                localStorage.setItem('user', JSON.stringify(userList[i]));
                // console.log(userList[i])
                error = false;
                window.location.reload();
            }
        }
        if (error === true) {
            alert("Error: Current username and password combination does not exist");
        }
    }

    return (
        <div className="h-screen flex flex-col bg-gray-800">
            <BasePage notLoggedIn={true} />
            <div className="flex h-[50%] items-center justify-center">
                <form onSubmit={(e) => login(e)}>
                    <div className="flex justify-center py-3">
                        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex justify-center py-3">
                        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
                    </div>
                    <div className="flex justify-center py-3">
                        <Button type="submit" className="text-white"> Log In </Button>
                    </div>
                    <div className="flex justify-center py-3">
                        <Link to="/signup" ><Button type="button" className="text-white"> Sign Up </Button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}