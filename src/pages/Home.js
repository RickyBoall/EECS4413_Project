import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div style={{
            'height': '100vh',
            // 'backgroundColor': 'grey'
        }}>
            <p> Home Page </p>
            <Link to="/page1"> Page 1 </Link>
            <br/>
            <Link to="/page1"> Page 2 </Link>
        </div>
    )
}