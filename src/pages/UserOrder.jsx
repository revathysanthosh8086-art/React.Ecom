import { useEffect, useState } from 'react'

function UserOrders() {
    const [orders, setOrders] = useState([])

   const user = JSON.parse(localStorage.getItem('loggeduser'))
   useEffect(() => {
      const allOrders =
           JSON.parse(localStorage.getItem('Orders')) || []

      const myOrders = allOrders.filter(
          order => order.user === user?.email
        )

      setOrders(myOrders)
    }, [])

    return (
                 <div style={{
           padding: '30px',
          backgroundColor: '#f4f6f8',
             minHeight: '100vh'
         }}>
           <h2 style={{ textAlign: 'center' }}>
                My Orders
            </h2>

           {orders.length === 0 ? (
              <p style={{ textAlign: 'center' }}>
                 No Orders Found
                </p>
            ) : (
               orders.map((order, index) => (
                    <div key={index} style={{
                        background: '#fff',
                     padding: '20px',
                       margin: '20px auto',
                       width: '60%',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}>
                        <p><b>Date:</b> {order.date}</p>

                        {order.items.map((item, i) => (
                             <div key={i}>
                               <p>{item.name}</p>
                               <p>₹{item.price} × {item.quantity || 1}</p>
                           </div>
                       ))}

                        <h4>Total: ₹{order.total}</h4>
                    </div>
                                    ))
           )}
       </div>
    ) 
}

export default UserOrders