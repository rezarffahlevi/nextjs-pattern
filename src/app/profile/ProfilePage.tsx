"use client";

import { useRouter } from "next/navigation";
import { initialState, useAppContext } from "../provider";
import { useEffect, useState } from "react";
import { useGetCurrentUser } from "@/services/useUserService";
import { useGetOrderHistory } from "@/services/useOrderService";

const ProfilePage = () => {
    const router = useRouter();
    const { state, dispatch } = useAppContext();
    const [tab, setTab] = useState('dashboard');

    const { fetchCurrentUser, currentUser, currentUserLoading, currentUserError, currentUserIsError } = useGetCurrentUser();
    const { fetchOrderHistory, orderHistory, orderHistoryLoading, orderHistoryError, orderHistoryIsError } = useGetOrderHistory();

    let init = true;

    useEffect(() => {
        if (init && state?.user) {
            init = false;
            fetchCurrentUser({ queryParams: { id: state?.user?._id } });
            fetchOrderHistory({
                queryParams: {
                    id: state?.user?._id,
                }
            });
        }
    }, [state?.user]);
    const onLogout = () => {
        dispatch({ token: null, user: null });
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <main className="main account-page">
            <div className="page-header" style={{ backgroundColor: '#f9f8f4' }}>
                <h1 className="page-title">My Account</h1>
            </div>
            <nav className="breadcrumb-nav has-border">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li>My account</li>
                    </ul>
                </div>
            </nav>
            <div className="page-content mt-4 mb-10 pb-6">
                <div className="container">
                    <div className="tab tab-vertical gutter-lg">
                        <ul className="nav nav-tabs mb-8 col-lg-3 col-md-4">
                            <li className="nav-item" onClick={() => setTab('dashboard')}>
                                <a className={"nav-link" + (tab == 'dashboard' ? ' active' : '')}>Dashboard</a>
                            </li>
                            <li className="nav-item" onClick={() => setTab('orders')}>
                                <a className={"nav-link" + (tab == 'orders' ? ' active' : '')}>Orders</a>
                            </li>
                            <li className="nav-item" onClick={() => setTab('account')}>
                                <a className={"nav-link" + (tab == 'account' ? ' active' : '')}>Account details</a>
                            </li>
                            <li className="nav-item" onClick={onLogout}>
                                <a className="nav-link no-tab-item">Logout</a>
                            </li>
                        </ul>
                        <div className="tab-content col-lg-9 col-md-8">
                            <div className={`tab-pane ${tab == 'dashboard' ? ' active' : ''}`} id="dashboard">
                                <p className="mb-0">
                                    Hello <span className="font-weight-bold text-secondary">{state?.user?.name}</span>
                                </p>
                                <p className="">
                                    From your account dashboard you can view your
                                    <a href="#orders" className="link-to-tab text-primary"> recent orders</a>, <a href="#account" className="link-to-tab text-primary">edit your
                                        password and account details</a>.
                                </p>
                                <div className="row cols-lg-3 cols-xs-2 cols-1 nav">
                                    <div className="ib-wrapper mb-4" onClick={() => setTab('orders')}>
                                        <div className="icon-box text-center ib-border"><a href="#orders">
                                            <span className="icon-box-icon">
                                                <i className="p-icon-orders"></i>
                                            </span>
                                            <div className="icon-box-content">
                                                <p>ORDERS</p>
                                            </div>
                                        </a>
                                        </div>
                                    </div>
                                    <div className="ib-wrapper mb-4" onClick={() => setTab('account')}>
                                        <div className="icon-box text-center ib-border"><a href="#account">
                                            <span className="icon-box-icon">
                                                <i className="p-icon-user-solid"></i>
                                            </span>
                                            <div className="icon-box-content">
                                                <p>ACCOUNT DETAILS</p>
                                            </div>
                                        </a>
                                        </div>
                                    </div>
                                    <div className="ib-wrapper mb-4" onClick={onLogout} >
                                        <div className="icon-box text-center ib-border">
                                            <a className="no-tab-item">
                                                <span className="icon-box-icon">
                                                    <i className="p-icon-logout"></i>
                                                </span>
                                                <div className="icon-box-content">
                                                    <p>LOGOUT</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`tab-pane ${tab == 'orders' ? ' active' : ''}`} id="orders">
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th>Order</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="order-number"><a href="#">#3596</a></td>
                                            <td className="order-date"><span>September 23, 2021</span></td>
                                            <td className="order-status"><span>On hold</span></td>
                                            <td className="order-total"><span>$147.00 for 4 items</span></td>
                                            <td className="order-action"><a onClick={() => setTab('orders-view')} className="btn btn-secondary btn-outline btn-block btn-rounded btn-sm">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="order-number"><a href="#">#3593</a></td>
                                            <td className="order-date"><span>February 21, 2021</span></td>
                                            <td className="order-status"><span>On hold</span></td>
                                            <td className="order-total"><span>$290.00 for 2 items</span></td>
                                            <td className="order-action"><a onClick={() => setTab('orders-view')} className="btn btn-secondary btn-outline btn-block btn-rounded btn-sm">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="order-number"><a href="#">#2547</a></td>
                                            <td className="order-date"><span>January 4, 2021</span></td>
                                            <td className="order-status"><span>On hold</span></td>
                                            <td className="order-total"><span>$480.00 for 8 items</span></td>
                                            <td className="order-action"><a onClick={() => setTab('orders-view')} className="btn btn-secondary btn-outline btn-block btn-rounded btn-sm">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="order-number"><a href="#">#2549</a></td>
                                            <td className="order-date"><span>January 19, 2021</span></td>
                                            <td className="order-status"><span>On hold</span></td>
                                            <td className="order-total"><span>$680.00 for 5 items</span></td>
                                            <td className="order-action"><a onClick={() => setTab('orders-view')} className="btn btn-secondary btn-outline btn-block btn-rounded btn-sm">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="order-number"><a href="#">#4523</a></td>
                                            <td className="order-date"><span>Jun 6, 2021</span></td>
                                            <td className="order-status"><span>On hold</span></td>
                                            <td className="order-total"><span>$564.00 for 3 items</span></td>
                                            <td className="order-action"><a onClick={() => setTab('orders-view')} className="btn btn-secondary btn-outline btn-block btn-rounded btn-sm">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="order-number"><a href="#">#4526</a></td>
                                            <td className="order-date"><span>Jun 19, 2021</span></td>
                                            <td className="order-status"><span>On hold</span></td>
                                            <td className="order-total"><span>$123.00 for 8 items</span></td>
                                            <td className="order-action"><a onClick={() => setTab('orders-view')} className="btn btn-secondary btn-outline btn-block btn-rounded btn-sm">View</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={`tab-pane order ${tab == 'orders-view' ? ' active' : ''}`} id="orders-view">
                                <h2 className="title text-left pb-1">Order Details</h2>
                                <div className="order-details">
                                    <table className="order-details-table">
                                        <thead>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h3 className="summary-subtitle">Your Order</h3>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="product-subtitle">Product</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="product-name">Juice <span><i className="p-icon-times"></i>
                                                    1</span></td>
                                                <td className="product-price">$129.99</td>
                                            </tr>
                                            <tr>
                                                <td className="product-name">Greenhouse Cherry <span><i className="p-icon-times"></i>
                                                    2</span></td>
                                                <td className="product-price">$98.00</td>
                                            </tr>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h4 className="summary-subtitle">Subtotal:</h4>
                                                </td>
                                                <td className="summary-value font-weight-normal">$325.99</td>
                                            </tr>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h4 className="summary-subtitle">Payment method:</h4>
                                                </td>
                                                <td className="summary-value">Cash on delivery</td>
                                            </tr>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h4 className="summary-subtitle">Total:</h4>
                                                </td>
                                                <td>
                                                    <p className="summary-total-price">$325.99</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row mt-9">
                                    <div className="col-sm-6">
                                        <div className="card card-address">
                                            <div className="card-body">
                                                <h5 className="card-title lh-2 mb-2">Billing Address</h5>
                                                <p>John Doe<br />
                                                    Panda Company<br />
                                                    Steven street<br />
                                                    El Carjon, CA 92020
                                                </p>
                                                <p>nicework125@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card card-address">
                                            <div className="card-body">
                                                <h5 className="card-title lh-2 mb-2">Shipping Address</h5>
                                                <p>You have not set up this type of address yet.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-0 mb-6" />
                                <a href="#orders" className="btn btn-dark btn-sm back-order"><i className="p-icon-arrow-long-left ml-0 mr-1"></i>Back to list</a>
                            </div>
                            <div className={`tab-pane order ${tab == 'account' ? ' active' : ''}`} id="account">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-sm-6 mb-4">
                                            <label>First Name *</label>
                                            <input type="text" name="first_name" placeholder="John" required />
                                        </div>
                                        <div className="col-sm-6 mb-4">
                                            <label>Last Name *</label>
                                            <input type="text" name="last_name" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <label>Display Name *</label>
                                    <input type="text" name="display_name" required placeholder="John Doe" className="mb-4" />
                                    <span>
                                        <small className="d-block mb-4">This will be how your name will be displayed
                                            in the account section and in reviews</small>
                                    </span>

                                    <label>Email Address *</label>
                                    <input type="email" name="email" required placeholder="nicework125@gmail.com" />
                                    <fieldset>
                                        <legend>Password Change</legend>
                                        <label>Current password (leave blank to leave unchanged)</label>
                                        <input type="password" name="current_password" />

                                        <label>New password (leave blank to leave unchanged)</label>
                                        <input type="password" name="new_password" />

                                        <label>Confirm new password</label>
                                        <input type="password" name="confirm_password" />
                                    </fieldset>

                                    <button type="submit" className="btn btn-primary">SAVE CHANGES</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default ProfilePage;