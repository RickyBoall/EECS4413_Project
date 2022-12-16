import { useEffect, useState } from "react";
import { BasePage } from "../components";
import { Button } from "@mui/material";


export default function LoginPage() {

    return (
        <div className="h-screen flex flex-col bg-gray-800">
            <BasePage notLoggedIn={true} />
            <div className="flex h-[50%] items-center justify-center">
                <div>
                    <div className="flex justify-center py-3">
                        <input placeholder="Username" />
                    </div>
                    <div className="flex justify-center py-3">
                        <input placeholder="Password" type="password" />
                    </div>
                    <div className="flex justify-center py-3">
                        <Button className="text-white" onClick={() => {localStorage.setItem('user', "placeholder"); window.location.reload();}}> Log In </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}