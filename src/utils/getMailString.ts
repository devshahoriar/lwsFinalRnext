const getMailString = ({
  order,
  user,
  products,
  totalPrice,
}: {
  order: {
    status: string
    _id: string
    city: string
    state: string
  }
  user: {
    fName: String
    lName: String
    email: String
    phone: String
  }
  products: []
  totalPrice: number
}) => {
  const stringEmail = `
  <html>

<body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
    <table
      style="
        margin: 50px auto 10px;
        background-color: #fff;
        padding: 50px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(0, 0, 0, 0.24);
        -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(0, 0, 0, 0.24);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        border-top: solid 10px green;
      "
    >
      <thead>
        <tr>
          <th style="text-align: left">
            <img
              style="width: 50px;height: 50px"
              src="https://lws-final-rnext.vercel.app/og-image.png"
              alt="bachana tours"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="height: 35px"></td>
        </tr>
        <tr>
          <td colspan="2" style="border: solid 1px #ddd; padding: 10px 20px">
            <p style="font-size: 14px; margin: 0 0 6px 0">
              <span
                style="
                  font-weight: bold;
                  display: inline-block;
                  min-width: 150px;
                "
                >Order status</span
              ><b style="color: green; font-weight: normal; margin: 0"
                >${order.status}</b
              >
            </p>
            <p style="font-size: 14px; margin: 0 0 6px 0">
              <span
                style="
                  font-weight: bold;
                  display: inline-block;
                  min-width: 146px;
                "
                >Transaction ID</span
              >
              ${String(order._id)}
            </p>
            <p style="font-size: 14px; margin: 0 0 0 0">
              <span
                style="
                  font-weight: bold;
                  display: inline-block;
                  min-width: 146px;
                "
                >Order amount</span
              >
              TK. ${totalPrice}
            </p>
          </td>
        </tr>
        <tr>
          <td style="height: 35px"></td>
        </tr>
        <tr>
          <td style="width: 50%; padding: 20px; vertical-align: top">
            <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
              <span style="display: block; font-weight: bold; font-size: 13px"
                >Name</span
              >
              ${user?.fName ? user.fName : ''} ${user?.lName ? user.lName : ''}
            </p>
            <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
              <span style="display: block; font-weight: bold; font-size: 13px"
                >Email</span
              >
              ${user?.email ? user.email : 'Not provided'}
            </p>
            <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
              <span style="display: block; font-weight: bold; font-size: 13px"
                >Phone</span
              >
              ${user?.phone ? user.phone : 'Not provided'}
            </p>
            
          </td>
          <td style="width: 50%; padding: 20px; vertical-align: top">
            <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
              <span style="display: block; font-weight: bold; font-size: 13px"
                >Address</span
              >
              ${order?.state ? order.state : ''}, ${
    order?.city ? order?.city : ''
  }
            </p>
            
          </td>
        </tr>
        <tr>
          <td colspan="2" style="font-size: 20px; padding: 30px 15px 0 15px">
            Items
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 15px">

          ${products
            .map(
              (product: any) => `
            <p
              style="
                font-size: 14px;
                margin: 0;
                padding: 10px;
                border: solid 1px #ddd;
                font-weight: bold;
              "
            >
              <span style="display: block; font-size: 13px; font-weight: normal"
                >${product?.product?.title}</span
              >
              Rs. ${product?.product?.price}
              <b style="font-size: 12px; font-weight: 300"> size:${product?.product?.size} | quantity ${product?.quantity}</b>
            </p>
            `
            )
            .join('')
            .toString()}            
          </td>
        </tr>
      </tbody>
      <tfooter>
        <tr>
          <td colspan="2" style="font-size: 14px; padding: 50px 15px 0 15px">
            <strong style="display: block; margin: 0 0 10px 0">LWS Shop
          </td>
        </tr>
      </tfooter>
    </table>
    </body>

</html>
`
  return stringEmail
}

export default getMailString
