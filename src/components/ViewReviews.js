import { useEffect, useState } from "react";
import { Rate, Button, Form, Input, List, Card } from "antd";
import { setRating } from "../api/apiCalls";

const { TextArea } = Input;

export default function ViewReviews({item}) {

    const submit = async(values) => {
        await setRating(item.id, values)
        // console.log(values)
        alert("Rating submitted!");
        window.location.reload();
    }

    return (
        <div className="flex bg-gray-400/95 items-center justify-center w-[70vw] h-[90vh] max-h-[90vh] mx-auto my-12 grid grid-cols-1">
            <p> Reviews: </p>
            {item.reviews.length === 0 ?
            <p> No Reviews</p>
            :
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-scroll overflow-x-hidden"> 
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={item.reviews}
                        renderItem={(review, index) => {
                            // console.log(item) 
                            return (
                                <List.Item>
                                    <Card style={{ minHeight: '175px', maxHeight: '175px' }} title={<p className="font-bold -mb-1"> {review.title}   <Rate className="absolute right-0 mr-2 -mt-1" disabled value={review.rating} /></p>}>
                                    <div className="flex flex-1 overflow-hidden max-h-20">
                                        <div className="flex-1 overflow-y-scroll overflow-x-hidden scrollbar-hide"> 
                                        <p> {review.comment} </p>
                                        <p> {review.comment} </p>
                                        <p> {review.comment} </p>
                                        </div>
                                    </div>
                                    </Card>
                                </List.Item>
                                
                            )}}
                        />
                </div>
            </div>
            }
            <p> Leave a review: </p>
            <Form
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 6 }}
                    initialValues={{ remember: true }}
                    onFinish={submit}
                    onFinishFailed={() => alert('Please complete the form!')}
                    autoComplete="off"
                    >
                    <Form.Item
                        label={<p className="text-white"> Title: </p>}
                        name="title"
                        rules={[{ required: true, message: 'Please leave a title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-white"> Comment: </p>}
                        name="comment"
                        // rules={[{  }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-white"> Rating: </p>}
                        name="rating"
                        rules={[{ required: true, message: 'Please leave a rating!' }]}
                    >
                        <Rate />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}