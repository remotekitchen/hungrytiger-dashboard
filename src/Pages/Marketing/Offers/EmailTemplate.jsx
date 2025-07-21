import React from "react";

const EmailTemplate = () => {
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Template</title>
    </head>
    <body style="
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      text-align: center;
    ">
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          background-color: #f4f4f4;
          padding: 20px;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        "
      >
        <tbody>
          <tr>
            <td align="center">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  text-align: center;
                  width: 100%;
                "
              >
                <tr>
                  <td style="padding: 10px 0; text-align: center;">
                    <a
                      href="#"
                      style="
                        font-size: 18px;
                        text-decoration: underline;
                        color: #000;
                        margin-bottom: 20px;
                        display: inline-block;
                      "
                    >
                      Grow Your Sales Today
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="text-align: center;">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Chat Chef Logo"
                      style="
                        width: 100px;
                        height: 100px;
                        margin-top: 10px;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 100%;
                      "
                    />
                  </td>
                </tr>

                <tr>
                  <td style="padding: 20px 0; text-align: center;">
                    <h1
                      style="
                        font-size: 24px;
                        font-weight: bold;
                        color: #000;
                        margin: 0;
                        line-height: 1.2;
                      "
                    >
                      The Only Thing You Need to Know for Digital Marketing as a
                      Restaurant Owner
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      color: #555;
                      font-size: 16px;
                      line-height: 1.5;
                      text-align: center;
                    "
                  >
                    <p style="margin: 0 0 10px;">
                      In today’s digital age, simply offering great food isn’t
                      enough for your restaurant to thrive. Research shows that
                      nearly <strong>79% of potential customers</strong> will
                      review your website before placing an order.
                    </p>
                    <p style="margin: 0 0 10px;">
                      If you rely solely on offline business, the foot traffic
                      you receive is limited and dependent on your location. In
                      contrast, digital marketing is designed to bring in a
                      wider audience. Your website should be optimized for
                      search engines (SEO) to ensure that when customers search
                      for a restaurant like yours within a
                      <strong>10-kilometer radius</strong>, your business ranks
                      high on Google.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 20px 0; text-align: center;">
                    <a
                      href="#"
                      style="
                        background-color: #000;
                        color: #fff;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 16px;
                        display: inline-block;
                        max-width: 100%;
                      "
                    >
                      Read Full Article
                    </a>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 20px 0;
                      text-align: center;
                      border-top: 1px solid #ddd;
                    "
                  >
                    <div style="padding: 10px; text-align: center;">
                      <a
                        href="#"
                        style="
                          margin: 0 10px;
                          display: inline-block;
                          max-width: 100%;
                        "
                      >
                        <img
                          src="https://via.placeholder.com/30"
                          alt="Facebook Icon"
                          style="
                            width: 30px;
                            height: 30px;
                            max-width: 100%;
                          "
                        />
                      </a>
                      <a
                        href="#"
                        style="
                          margin: 0 10px;
                          display: inline-block;
                          max-width: 100%;
                        "
                      >
                        <img
                          src="https://via.placeholder.com/30"
                          alt="Instagram Icon"
                          style="
                            width: 30px;
                            height: 30px;
                            max-width: 100%;
                          "
                        />
                      </a>
                    </div>
                    <div style="text-align: center;">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Chat Chef Logo"
                        style="
                          width: 80px;
                          height: 80px;
                          margin-top: 20px;
                          display: block;
                          margin-left: auto;
                          margin-right: auto;
                          max-width: 100%;
                        "
                      />
                    </div>
                    <p
                      style="
                        font-size: 12px;
                        color: #555;
                        margin-top: 20px;
                        text-align: center;
                      "
                    >
                      &copy; 2024 Chat Chef, All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: emailHTML }} />
    </div>
  );
};

export default EmailTemplate;
