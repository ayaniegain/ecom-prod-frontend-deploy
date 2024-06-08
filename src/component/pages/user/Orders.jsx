import React,{ useState, useEffect }  from 'react'
import UserMenu from '../../layout/UserMenu'
import Layout from '../../layout/Layout'
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import moment from "moment";


function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`https://ecom-prod-backend-deploy.onrender.com/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="flex md:flex-row flex-col md:justify-start md:items-start justify-center items-center">

      <div className="mx-6 my-4">
        <UserMenu />
      </div>
          <section className="col-md-9 my-8">
            <h1 className="text-center text-3xl">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow my-8 " key={i}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                        <img
                    className="w-40 h-30 "
                    src={`https://ecom-prod-backend-deploy.onrender.com/api/v1/product/photo-product/${p._id}`}
                    alt="Product Image"
                  />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </div>
    </Layout>
  )
}

export default Orders