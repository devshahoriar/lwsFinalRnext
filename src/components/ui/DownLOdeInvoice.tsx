'use client'
import { jsPDF } from "jspdf";

const html = `<html>
<head></head>
<body
  style="
    background-color: #e2e1e0;
    font-family: Open Sans, sans-serif;
    font-size: 100%;
    font-weight: 400;
    line-height: 1.4;
    color: #000;
  "
>
  <tfooter> </tfooter>
  <table
    style="
      width: 100%;
      height: 100%;
      /* margin: 50px auto 10px; */
      background-color: #fff;
      padding: 50px;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      border-top: solid 10px green;
    "
  >
    <thead>
      <tr>
        <th style="text-align: left">
          <img
            style="width: 50px; height: 50px"
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
              >delivered</b
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
            664f4e1cef6743680bf764fa
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
            TK. 11589
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
            Shuvo Ahmed
          </p>
          <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
            <span style="display: block; font-weight: bold; font-size: 13px"
              >Email</span
            >
            shuvo1556@gmail.com
          </p>
          <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
            <span style="display: block; font-weight: bold; font-size: 13px"
              >Phone</span
            >
            01777596338
          </p>
        </td>
        <td style="width: 50%; padding: 20px; vertical-align: top">
          <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
            <span style="display: block; font-weight: bold; font-size: 13px"
              >Address</span
            >
            Bagha, Chandipur
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
              >iPhone 9</span
            >
            Rs. 549
            <b style="font-size: 12px; font-weight: 300">
              size:m | quantity 3</b
            >
          </p>
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
              >iPhone X</span
            >
            Rs. 899
            <b style="font-size: 12px; font-weight: 300">
              size:xl | quantity 3</b
            >
          </p>
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
              >Samsung Universe 9</span
            >
            Rs. 1249
            <b style="font-size: 12px; font-weight: 300">
              size:xl | quantity 3</b
            >
          </p>
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
              >MacBook Pro</span
            >
            Rs. 1749
            <b style="font-size: 12px; font-weight: 300">
              size:s | quantity 2</b
            >
          </p>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td colspan="2" style="font-size: 14px; padding: 50px 15px 0 15px">
          <strong style="display: block; margin: 0 0 10px 0"
            >LWS Shop
          </strong>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`

const DownLOdeInvoice = () => {
  const hendelClick = () =>{
    const doc = new jsPDF({unit:"pt"});
    doc.html(html, {
      callback: function (doc) {
        doc.save();
      },
      
   });
  }
  return (
    <button onClick={hendelClick} className="">DownLOdeInvoice</button>
  )
}

export default DownLOdeInvoice