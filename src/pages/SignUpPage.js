import { useEffect, useState } from "react";
import { BasePage } from "../components";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";


export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const signup = async (values) => {
        // e.preventDefault();
        var a = "initial";
        // alert('kllasdkadka')
        console.log(values)
        await fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/users', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Successfully created account!");
                navigate("/");
            })
            
    }

    return (
        <div className="h-screen flex flex-col bg-gray-800">
            <BasePage notLoggedIn={true} />
            <div className="flex h-[50%] items-center justify-center my-10">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={signup}
                    onFinishFailed={() => alert('Please complete the sign up form!')}
                    autoComplete="off"
                    >
                    <Form.Item
                        label={<p className="text-white"> First Name: </p>}
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-white"> Last Name: </p>}
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-white"> Username: </p>}
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-white"> Email: </p>}
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-white"> Password: </p>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}