import React, { useState } from 'react';
import { Button, Rate } from 'antd';
import './OrderListPage.scss';

const OrderListPage = () => {
    //列表数据加在这
    const [orders, setOrders] = useState([
        { id: 1, name:'百香果（冷饮）1扎', type:"院落创意菜", price:"19.9", hasBeenReviewed: false, review: "", rating: 0, imgUrl: 'https://imgpp.ztupic.com/bup/so/20210625/4ee89cdcdac93a24e97362eff402fdac-1.jpg' },
        { id: 2, name:'肥牛石锅拌饭+鸡蛋羹1份', type:"正一味", price:"29", hasBeenReviewed: false, review: "", rating: 0, imgUrl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.niDsyrP7xRV2vPbYD1cxTwHaHa?w=196&h=197&c=7&r=0&o=5&pid=1.7' },
        { id: 3, name:'冻酸奶（小杯）1杯', type:"Salud冻酸奶", price:"20", hasBeenReviewed: false, review: "", rating: 0, imgUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.7RvXhsuCcISBZuATOKYBIAAAAA?w=180&h=180&c=7&r=0&o=5&pid=1.7' },
        { id: 4, name:'吉汁烧鱼+中杯汽水/紫菜蛋...', type:"吉野家", price:"14", hasBeenReviewed: false, review: "", rating: 0, imgUrl: 'https://n.sinaimg.cn/sinakd10115/279/w640h439/20200731/02d0-ixeeiry8574182.jpg' },
        // 更多订单...
    ]);

    const [orderBeingReviewed, setOrderBeingReviewed] = useState(null);

    const handleReviewClick = (orderId) => {
        if (orderBeingReviewed === orderId) {
            setOrderBeingReviewed(null);
        } else {
            setOrderBeingReviewed(orderId);
        }
    };
    const handleReviewedClick = (orderId) => {
        setOrderBeingReviewed(orderId);
    };

    const handleReviewChange = (event, orderId) => {
        setOrders(orders.map((order) => {
            if (order.id === orderId) {
                return { ...order, review: event.target.value };
            } else {
                return order;
            }
        }));
    };

    const handleRatingChange = (newRating, orderId) => {
        setOrders(orders.map((order) => {
            if (order.id === orderId) {
                return { ...order, rating: newRating };
            } else {
                return order;
            }
        }));
    };

    const handleReviewSubmit = (orderId) => {
        setOrders(orders.map((order) => {
            if (order.id === orderId) {
                return { ...order, hasBeenReviewed: true };
            } else {
                return order;
            }
        }));

        setOrderBeingReviewed(null);
    };

    return (
        <div>
            <div className="top-bar">
                <h1 className="title">我的订单</h1>
            </div>

            {orders.map((order) => (
                <div key={order.id}>
                    <div className="order">
                        <div className="orderLeft">
                            <div className="orderImg">
                                <img src={order.imgUrl} alt=""/>
                            </div>
                            <div className="orderDetail">
                                <h2>{order.name}</h2>
                                <p>{order.type}</p>
                                <p className="price">￥{order.price}</p>
                            </div>
                        </div>
                        <div className="orderRight">
                            {order.hasBeenReviewed ? (
                                <Button className="disable-button" type="primary" onClick={() => handleReviewClick(order.id)}>已评价</Button>
                            ) : (
                                <Button className="activity-button" type="primary" onClick={() => handleReviewClick(order.id)}>评价</Button>
                            )}
                        </div>
                    </div>


                    {order.id === orderBeingReviewed && (
                        <div >
                            {order.hasBeenReviewed ? (
                                <div className="appraise">
                                    <textarea value={order.review} rows="4" readOnly className="disable-textarea" onFocus={(e) => e.target.blur()}></textarea>
                                    <Rate disabled value={order.rating} />
                                </div>
                            ) : (
                                <div className="appraise">
                                    <textarea placeholder=" " rows="4" onChange={(e) => handleReviewChange(e, order.id)}
                                    ></textarea>
                                    <Rate onChange={(newRating) => handleRatingChange(newRating, order.id)} />
                                    <div className="buttons">
                                        <Button className="activity-button" type="primary" onClick={() => handleReviewSubmit(order.id)}>提交</Button>
                                        <Button className="disable-button" type="primary" onClick={() => handleReviewClick(order.id)}>取消</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
};

export default OrderListPage;
