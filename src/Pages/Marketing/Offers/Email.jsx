import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdLibraryAdd, MdRemoveCircleOutline } from "react-icons/md";
import { useSendEmailMutation } from "../../../redux/features/email/emailApi";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import ContactListUpload from "./ContactListUpload";
import EmailModal from "./EmailModal";

const Email = () => {
  const [restaurant, setRestaurant] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");
  const [open, setOpen] = useState([1]);
  const [copyright, setCopyright] = useState("Chat Chef");
  const [emails, setEmails] = useState([]);

  const [blocks, setBlocks] = useState([
    {
      id: 1,
      text: "In today’s digital age, simply offering great food isn't enough for your restaurant to thrive.",
    },
  ]);
  const [subject, setSubject] = useState(
    "We Miss You! Enjoy 30% Off Your Next Order"
  );
  const [title, setTitle] = useState("Grow Your Sales Today");
  const [titleRedirectLink, setTitleRedirectLink] = useState(
    "https://www.chatchefs.com/"
  );
  const [logoUrl, setLogoUrl] = useState(
    "https://dashboard.chatchefs.com/assets/Chatchef3dlogo-6e4c39b5.webp"
  );
  const [heading, setHeading] = useState(
    "The Only Thing You Need to Know for Digital Marketing as a Restaurant Owner"
  );
  const [block1, setBlock1] = useState(
    "In today’s digital age, simply offering great food isn't enough for your restaurant fo thrive. Research shows that nearly 79% of potential customers will review your website before placing an order"
  );
  const [block2, setBlock2] = useState(
    "If you solely on offline business, the foot traffic you receive is limited and dependent on your location. In contrast, digital marketing is designed to bring in a wider audience. Your website should be optimized for search engines (SEO) to ensure that when customers search for a restaurant like yours within a 10-kilometer radius, your business ranks high on Google"
  );

  // Function to add a new block
  const addBlock = () => {
    setBlocks([...blocks, { id: blocks.length + 1, text: "" }]);
  };

  // Function to remove a block
  const removeBlock = (index) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
  };

  // Function to update the text of a block
  const updateBlockText = (index, value) => {
    const updatedBlocks = blocks.map((block, i) =>
      i === index ? { ...block, text: value } : block
    );
    setBlocks(updatedBlocks);
  };

  const [buttonText, setButtonText] = useState("Read More");
  const [buttonUrl, setButtonUrl] = useState(
    "https://www.chatchefs.com/blogs/108"
  );
  const [facebookUrl, setFacebookUrl] = useState(
    "https://www.facebook.com/chatchefs/"
  );
  const [instagramUrl, setInstagramUrl] = useState(
    "https://www.instagram.com/chatchefs/"
  );
  const [websiteUrl, setWebsiteUrl] = useState("https://www.chatchefs.com/");
  const [footer, setFooter] = useState(
    "Hurry, this offer is only available for a limited time — don’t miss out! Looking forward to serving you soon!"
  );

  const [bodyText, setBodyText] = useState("");
  const [btnUrl, setBtnUrl] = useState("");
  // console.log("🚀 ~ Email ~ open:", open);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  useEffect(() => {
    if (emails.length > 0) {
      const emailString = [...new Set(emails)].join("; ");
      setValue("toEmail", emailString);
    }
  }, [emails, setValue]);

  // console.log(emails, "email_main_back");

  const toggle = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((item) => item !== index));
    } else {
      setOpen([...open, index]);
    }
  };

  const { data: restaurantList } = useGetRestaurentsQuery();

  // console.log("restaurantList", restaurantList);

  useEffect(() => {
    if (restaurantList?.results?.length) {
      setRestaurant(restaurantList.results[0].id);
      setRestaurantName(restaurantList.results[0].name);
    }
  }, [restaurantList, restaurant]);

  const [sendEmail] = useSendEmailMutation();

  const selectedOption = watch("defaultRadio");

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
                    href="${
                      titleRedirectLink
                        ? titleRedirectLink
                        : "https://www.chatchefs.com/"
                    }"
                    target="_blank"
                    style="
                      font-size: 18px;
                      text-decoration: underline;
                      color: #000;
                      margin-bottom: 20px;
                      display: inline-block;
                    "
                  >
                    ${title ? title : "Grow Your Sales Today"}
                  </a>
                </td>
              </tr>

              ${
                logoUrl
                  ? `
                <tr>
                  <td style="text-align: center;">
                    <img
                      src="${logoUrl}"
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
              `
                  : ""
              }
              

              <tr>
                <td style="padding: 20px 0; text-align: justify;">
                  <h1
                    style="
                      font-size: 24px;
                      font-weight: bold;
                      color: #000;
                      margin: 0;
                      line-height: 1.2;
                    "
                  >
                    ${
                      heading
                        ? heading
                        : "The Only Thing You Need to Know for Digital Marketing as a Restaurant Owner"
                    }
                  </h1>
                </td>
              </tr>

              ${blocks
                .map(
                  (block) => `
                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        color: #555;
                        font-size: 16px;
                        line-height: 1.5;
                        text-align: justify;
                      "
                    >
                      <p style="margin: 0 0 10px;">
                        ${block.text ? block.text : ""}
                      </p>
                    </td>
                  </tr>
                `
                )
                .join("")}

              <tr>
                <td style="padding: 20px 0; text-align: center;">
                  <a
                    href="${
                      buttonUrl
                        ? buttonUrl
                        : "https://www.chatchefs.com/blogs/108"
                    }"
                    target="_blank"
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
                    ${buttonText ? buttonText : "Read More"}
                  </a>
                </td>
              </tr>

              <tr>
                    <td
                      style="
                        padding: 10px 0;
                        color: #555;
                        font-size: 16px;
                        line-height: 1.5;
                        text-align: justify;
                      "
                    >
                      <p style="margin: 0 0 10px;">
                        ${footer ? footer : ""}
                      </p>
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
                  ${
                    facebookUrl
                      ? `
                    <a
                      href="${facebookUrl}"
                      target="_blank"
                      style="
                        margin: 0 10px;
                        display: inline-block;
                        max-width: 100%;
                      "
                    >
                      <img
                        src="https://z-m-static.xx.fbcdn.net/rsrc.php/v3/yD/r/5D8s-GsHJlJ.png"
                        alt="Facebook Icon"
                        style="
                          width: 30px;
                          height: 30px;
                          max-width: 100%;
                        "
                      />
                    </a>
                  `
                      : ""
                  }
                  
                    <a
                      href="${
                        instagramUrl
                          ? instagramUrl
                          : "https://www.instagram.com/chatchefs/"
                      }"
                      target="_blank"
                      style="
                        margin: 0 10px;
                        display: inline-block;
                        max-width: 100%;
                      "
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
                        alt="Instagram Icon"
                        style="
                          width: 30px;
                          height: 30px;
                          max-width: 100%;
                        "
                      />
                    </a>
                    <a
                      href="${
                        websiteUrl ? websiteUrl : "https://www.chatchefs.com/"
                      }"
                      target="_blank"
                      style="
                        margin: 0 10px;
                        display: inline-block;
                        max-width: 100%;
                      "
                    >
                      <img
                        src="https://www.freepnglogos.com/uploads/logo-internet-png/logo-internet-chemiphase-updated-website-goes-live-chemiphase-ltd-12.png"
                        alt="Instagram Icon"
                        style="
                          width: 30px;
                          height: 30px;
                          max-width: 100%;
                        "
                      />
                    </a>
                  </div>
                  
                  ${
                    logoUrl
                      ? `
                    <div style="text-align: center;">
                      <img
                        src="${logoUrl}"
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
                  `
                      : ""
                  }
                  
                  <p
                    style="
                      font-size: 12px;
                      color: #555;
                      margin-top: 20px;
                      text-align: center;
                    "
                  >
                    &copy; 2024 ${
                      copyright ? copyright : "Chat Chef"
                    }, All rights reserved.
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

  const onSubmit = async (data) => {
    // console.log(data);

    if (!restaurant) {
      alert("Please select a restaurant");
      return;
    }

    const inputBox = data.toEmail;
    const maillist =
      inputBox && typeof inputBox === "string"
        ? inputBox.split(";").map((value) => value.trim())
        : [];

    // console.log(maillist);
    let preferedTime = "";
    if (data.Date && data.Time) {
      // If both Date and Time are provided
      preferedTime = `${data.Date}T${data.Time}:00Z`;
    } else if (data.Date && !data.Time) {
      // If only Date is provided
      preferedTime = `${data.Date}T01:00:00Z`; // Adjust the time as needed
    } else {
      // If neither Date nor Time is provided
      preferedTime = null;
    }
    const formattedData = {
      Program: data.Program,
      audience: data.defaultRadio,
      subject: data.Subject,
      html_path: "email/test.html",
      context: {
        body: emailHTML,
        url: "",
      },
      to_emails: data.defaultRadio === "custom" ? maillist : [],
      restaurant: parseInt(restaurant),
      schedule_time: preferedTime,
    };

    // console.log(formattedData, "formattedData");

    try {
      const result = await sendEmail(formattedData);
      // toast.success("Send Email Successfully");
      toast.success("Email Sent Successfully!", {
        // icon: "",
        duration: 5000,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          padding: "20px 30px",
        },
        position: "top-center",
      });
      resetForm();
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
    }
    // // console.log(formattedData);
  };

  const handleTemplate1 = () => {
    setSubject(
      `Treat Yourself to 50% Off at ${restaurantName} with Code NICETEA50!`
    );
    setTitle("Next Order Discount Email:");
    setTitleRedirectLink("");
    setLogoUrl("");
    // setHeading(`Hi ${}`)
    setHeading(`Hi John Doe`);
    setBlocks([
      {
        id: 1,
        text: "We have an exciting offer just for you! As a valued customer of Lee’s House, we’re giving you a 50% discount on your next order.",
      },
      {
        id: 2,
        text: `Use Coupon Code: NICETEA50`,
      },
      {
        id: 3,
        text: "Whether you're craving your favorites or ready to try something new, this is the perfect opportunity to indulge at half the price! Simply apply the code at checkout and enjoy 50% off.",
      },
    ]);
    setButtonText("Order Now:");
    setButtonUrl("");

    setFooter(`Hurry, this offer is only available for a limited time — don’t miss out!
      Looking forward to serving you soon`);
  };

  const handleTemplate2 = () => {
    setSubject(
      `Buy One, Get One FREE! Your Favorites at ${restaurantName} Are Waiting`
    );
    setTitle("Promoting BOGO template:");
    setTitleRedirectLink("");
    setLogoUrl("");
    // setHeading(`Hi ${}`)
    setHeading(`Hi John Doe`);
    setBlocks([
      {
        id: 1,
        text: `We’ve got an exciting deal just for you! For a limited time, enjoy our Buy One, Get One FREE offer at ${restaurantName}. Whether you're in the mood to double up on your favorite dish or try something new, now’s the perfect time to indulge!`,
      },
      {
        id: 2,
        text: `How It Works:
          1.Order any item from our menu.
          2.Get another one FREE — no strings attached!
          This delicious offer won’t last long, so make sure to grab it before it’s gone!
`,
      },
    ]);
    setButtonText("Order Now:");
    setButtonUrl("");

    setFooter(`We can’t wait to serve you twice the flavor at half the price!`);
  };

  const handleTemplate3 = () => {
    setSubject(`Enjoy 10% Off All Pickup Orders at ${restaurantName}!`);
    setTitle("10% discount on all pickup orders:");
    setTitleRedirectLink("");
    setLogoUrl("");
    // setHeading(`Hi ${}`)
    setHeading(`Hi John Doe`);
    setBlocks([
      {
        id: 1,
        text: `We have exciting news for you! You can now enjoy a 10% discount on all pickup orders at ${restaurantName}, automatically applied at checkout. Simply place your order for pickup and savor your favorite dishes while saving money!`,
      },
    ]);
    setButtonText("Order Now:");
    setButtonUrl("");

    setFooter(
      `Don’t miss out on this delicious opportunity to enjoy great food at a great price. We can’t wait to serve you!`
    );
  };

  const handleTemplate4 = () => {
    setSubject(`BOGO Promotion for ${restaurantName}`);
    setTitle("BOGO Recap Sending Email Template");
    setTitleRedirectLink("");
    setLogoUrl("");

    setHeading(`Hi there`);

    setBlocks([
      {
        id: 1,
        text: `I hope this email finds you well.
        
  We are excited to announce the launch of the BOGO (Buy One Get One) promotional campaign for ${restaurantName}, which will run from July 16, 2024, to December 31, 2024. This campaign is designed to boost customer engagement and drive sales through a compelling offer on select menu items.`,
      },
      {
        id: 2,
        text: `BOGO Promotional Details
  
  Promotion Period:  
  July 16, 2024 - December 31, 2024
  
  Eligible Menu Items:  
  - Chicken Fried Rice (雞肉炒飯)  
  - House Special Fried Rice (招牌炒飯)  
  - Deep-Fried Tofu (炸豆腐)`,
      },
      {
        id: 3,
        text: `Offer Details:  
  Customers who purchase one of the eligible items will receive another of the same item at no additional cost.`,
      },
      {
        id: 4,
        text: `Price Adjustment  
  To maintain the quality of our offerings and cover rising costs, we will be implementing a 30% price increase specifically on the BOGO items listed above. This adjustment will be effective starting from the promotion period.`,
      },
      {
        id: 5,
        text: `Example of Price Adjustment:  
  Current Price of Chicken Fried Rice: $10.00  
  Price Increase (30%): $3.00  
  New Price: $13.00`,
      },
      {
        id: 6,
        text: `So, the new price for Chicken Fried Rice will be $13.00. Under the BOGO offer, customers will still receive one free item when they purchase one at this adjusted price.`,
      },
      {
        id: 7,
        text: `Campaign Benefits
  
  - **Attract New Customers**: The BOGO offer is an enticing incentive to draw new patrons.
  - **Encourage Repeat Business**: Existing customers will be encouraged to return and take advantage of the offer.
  - **Drive Sales**: The combination of the promotional offer and adjusted pricing is expected to increase overall sales and improve visibility.`,
      },
    ]);

    setFooter(
      `Please review the updated pricing for the BOGO items in the Direct Ordering menu page and the details of the campaign. If you have any questions or need further clarification, don’t hesitate to reach out. We are here to support you and ensure the success of this promotion.
      
  Thank you for your continued partnership. We look forward to the positive impact of this campaign.`
    );
  };

  const handleTemplate5 = () => {
    setSubject(
      `Marketing Strategy Implementation and Loyalty Program Details for ${restaurantName}`
    );
    setTitle(`Email - Marketing Strategy of ${restaurantName}`);
    setTitleRedirectLink("");
    setLogoUrl("");
    // setHeading(`Hi ${}`)
    setHeading(`Hi there,`);
    setBlocks([
      {
        id: 1,
        text: `I hope this email finds you well.
              I'm pleased to share that we've successfully implemented the marketing strategy for ${restaurantName}, including both the first order discount and the loyalty program campaign.
              First Order Discount
              Offer: 30% discount on the first order.
              Maximum Redemption: $50.`,
      },
      {
        id: 2,
        text: `This offer is designed to attract new customers and give them a great reason to try out ${restaurantName}.`,
      },
      {
        id: 3,
        text: `2.Loyalty Program Campaign
                To further build customer loyalty and encourage repeat orders, we’ve structured a tiered loyalty program with exciting rewards:
                Level
                Points Required
                Price
                Redemption Price (Base * 10)
                Reward Details`,
      },
      {
        id: 4,
        text: `Program Mechanics
          Points Accumulation: Customers earn 1 point for each order they place.
          Redemption: As customers accumulate points, they can redeem them for the rewards listed at their respective levels.
          Leveling Up: The more they order, the more points they earn, allowing them to access higher levels and more valuable rewards.`,
      },
    ]);
    setButtonText("Order Now:");
    setButtonUrl("");

    setFooter(`We believe this program will not only incentivize repeat orders but also create an engaging experience for your customers, driving loyalty and satisfaction.
Please let us know if you have any questions or need further adjustments. We're excited to see the positive impact these initiatives will have on your business.
Thank you for your continued partnership.`);
  };

  const handleTemplate6 = () => {
    setSubject(`Launch of Loyalty Promotional Campaign for ${restaurantName}`);
    setTitle(`Loyalty Program Recap Sending Email Template `);
    setTitleRedirectLink("");
    setLogoUrl("");
    // setHeading(`Hi ${}`)
    setHeading(`Hi there,`);
    setBlocks([
      {
        id: 1,
        text: `I hope this email finds you well.
          We are excited to inform you that the loyalty promotional campaign for ${restaurantName} has been successfully set up and is now live. This campaign is designed to enhance customer engagement and drive repeat business by offering valuable rewards through our loyalty program.`,
      },
      {
        id: 2,
        text: `Loyalty Program Overview
              1.Points Accumulation:
                Customers will earn 1 point for each order placed at Restaurant Name
              2.Campaign Levels and Rewards:
                The program is structured into the following levels, with each level offering exciting rewards:
                3.Redemption Process:
As customers accumulate points, they can redeem them for the rewards listed at each level. This encourages continuous ordering and engagement with your brand.
We believe this loyalty program will greatly contribute to increasing customer satisfaction and fostering long-term relationships with your patrons. Please review the campaign setup and let us know if you have any questions or require further adjustments. We are here to assist you and ensure the success of this promotional initiative.
`,
      },
    ]);
    // setButtonText("Order Now:");
    // setButtonUrl("");

    setFooter(
      `Thank you for your partnership. We look forward to seeing positive results from this campaign.`
    );
  };

  return (
    <div className="overflow-x-auto">
      <div>
        <div
          className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
          onClick={() => toggle(1)}
        >
          <div className="">Email</div>

          <div className="flex items-center gap-2">
            <div className="text-[30px]">
              {open.includes(1) ? (
                <FiChevronUp className="text-[#697077] " />
              ) : (
                <FiChevronDown className="text-[#697077] " />
              )}
            </div>
          </div>
        </div>
        <Collapse isOpened={open.includes(1)}>
          {/* email template will be below adnan */}
          <div className="flex gap-2">
            <button className="btn-primary">Email Template</button>
          </div>
          <div className="flex justify-end pr-5 mt-3">
            <button
              onClick={() => setModalOpen(!modalOpen)}
              className="p-1 rounded bg-gray-300 flex justify-center items-center pl-2 border border-[#16A34A]"
            >
              <FaRegEdit className="text-2xl" />
            </button>
          </div>

          <div className="flex gap-3 mb-3">
            <button
              className="bg-cyan-500 px-5 py-1 rounded"
              onClick={handleTemplate1}
            >
              Template-1
            </button>
            <button
              className="bg-cyan-500 px-5 py-1 rounded"
              onClick={handleTemplate2}
            >
              Template-2
            </button>
            <button
              className="bg-cyan-500 px-5 py-1 rounded"
              onClick={handleTemplate3}
            >
              Template-3
            </button>
            <button
              className="bg-cyan-500 px-5 py-1 rounded"
              onClick={handleTemplate4}
            >
              Template-4
            </button>
            <button
              className="bg-cyan-500 px-5 py-1 rounded"
              onClick={handleTemplate5}
            >
              Template-5
            </button>
            <button
              className="bg-cyan-500 px-5 py-1 rounded"
              onClick={handleTemplate6}
            >
              Template-6
            </button>
            <button className="bg-cyan-500 px-5 py-1 rounded">
              Coming Soon
            </button>
            {/* <button className="bg-cyan-500 px-5 py-1 rounded">
              Template-3
            </button> */}
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-bold my-2 pt-2">Subject</h1>
                <input
                  {...register("Subject")}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the name of the Subject"
                  required
                  // defaultValue={subject}
                  value={subject}
                />
                <h1 className="font-bold my-2">Title</h1>
                <input
                  {...register("Program")}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the name of the Program"
                  // defaultValue={title}
                  value={title}
                />
                <h1 className="font-bold my-2">Title URL</h1>
                <input
                  onChange={(e) => setTitleRedirectLink(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={titleRedirectLink}
                  value={titleRedirectLink}
                />
                <h1 className="font-bold my-2">Logo URL</h1>
                <input
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={logoUrl}
                  value={logoUrl}
                />
                <h1 className="font-bold my-2">Heading</h1>
                <input
                  onChange={(e) => setHeading(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={heading}
                  value={heading}
                />
                {/* <div>
                  <div className="flex justify-between items-center my-3">
                    <h1 className="font-bold my-2">Block-1</h1>
                    <span className="cursor-pointer">
                      <MdLibraryAdd className="text-3xl" />
                    </span>
                  </div>
                  <textarea
                    onChange={(e) => setBlock1(e.target.value)}
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                    placeholder="Enter the redirect URL"
                    defaultValue={block1}
                  />
                </div> */}

                <div>
                  {/* Render all blocks */}
                  {blocks.map((block, index) => (
                    <div key={block.id} className="my-3">
                      <div className="flex justify-between items-center">
                        <h1 className="font-bold">Block-{block.id}</h1>
                        {/* Show the remove icon (-) for each block */}
                        {index !== 0 && (
                          <span
                            className="cursor-pointer text-red-500"
                            onClick={() => removeBlock(index)}
                          >
                            <MdRemoveCircleOutline className="text-3xl" />
                          </span>
                        )}
                      </div>
                      <textarea
                        onChange={(e) => updateBlockText(index, e.target.value)}
                        className="border border-[#DDE1E6] rounded-lg w-full p-2"
                        placeholder={`Enter text for Block-${block.id}`}
                        value={block.text}
                      />
                    </div>
                  ))}

                  {/* Always show the + icon to add a new block */}
                  <div className="flex justify-end my-4">
                    <span
                      className="cursor-pointer text-blue-500"
                      onClick={addBlock}
                    >
                      <MdLibraryAdd className="text-3xl" />
                    </span>
                  </div>
                </div>

                {/* <h1 className="font-bold my-2">Block-2</h1>
                <textarea
                  onChange={(e) => setBlock2(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  defaultValue={block2}
                /> */}
                <h1 className="font-bold my-2">Button Text</h1>
                <input
                  onChange={(e) => setButtonText(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={buttonText}
                  value={buttonText}
                />
                <h1 className="font-bold my-2">Button URL</h1>
                <input
                  onChange={(e) => setButtonUrl(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={buttonUrl}
                  value={buttonUrl}
                />
                <h1 className="font-bold my-2">Facebook URL</h1>
                <input
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={facebookUrl}
                  value={facebookUrl}
                />
                <h1 className="font-bold my-2">Instagram URL</h1>
                <input
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={instagramUrl}
                  value={instagramUrl}
                />
                <h1 className="font-bold my-2">Website URL</h1>
                <input
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the redirect URL"
                  // defaultValue={websiteUrl}
                  value={websiteUrl}
                />
                <h1 className="font-bold my-2">Footer</h1>
                <input
                  onChange={(e) => setFooter(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the footer description"
                  // defaultValue={footer}
                  value={footer}
                />
                <h1 className="font-bold my-2">Copyright</h1>
                <input
                  onChange={(e) => setCopyright(e.target.value)}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the copyright owner"
                  // defaultValue={copyright}
                  value={copyright}
                />

                <h1 className="my-4 font-bold">Restaurant</h1>
                <select
                  {...register("restaurant")}
                  onChange={(e) => {
                    setRestaurant(e.target.value);
                  }}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  value={restaurant}
                >
                  <option value="Select Restaurant">Select Restaurant</option>
                  {restaurantList?.results?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <div>
                  <div>
                    <div>
                      {/* <h1 className="my-4 font-bold">Body text</h1>
                      <textarea
                        {...register("BodyText")}
                        onChange={(e) => setBodyText(e.target.value)}
                        className="border border-[#DDE1E6] rounded-lg w-full p-2"
                        placeholder="Body Text"
                        required
                      />

                      <h1 className="my-4 font-bold">URL</h1>
                      <input
                        {...register("URL")}
                        onChange={(e) => setBtnUrl(e.target.value)}
                        className="border border-[#DDE1E6] rounded-lg w-full p-2"
                        placeholder="Example URL"
                      /> */}

                      {/* <h1 className="my-4 font-bold">Distribution</h1>
                    <div className="flex">
                      <input
                        {...register("Date")}
                        type="date"
                        className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"

                      />
                      <input
                        {...register("Time")}
                        type="time"
                        className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"

                      />
                    </div> */}

                      <h1 className="mt-4 mb-2">
                        Select which customers will see your offer.
                      </h1>
                      <div className="flex items-center">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="all"
                          {...register("defaultRadio")}
                          className="w-4 h-4 text-[#42C2FF]"
                          required
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 font-medium"
                        >
                          All customers
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-2"
                          type="radio"
                          value="all"
                          {...register("defaultRadio")}
                          className="w-4 h-4 text-[#42C2FF]"
                          required
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 font-medium"
                        >
                          Members Only
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-3"
                          type="radio"
                          value="custom"
                          {...register("defaultRadio")}
                          className="w-4 h-4 text-[#42C2FF]"
                          required
                        />
                        <label
                          htmlFor="default-radio-3"
                          className="ml-2 font-medium"
                        >
                          Custom
                        </label>
                      </div>
                      {selectedOption === "custom" && (
                        <div>
                          <ContactListUpload
                            emails={emails}
                            setEmails={setEmails}
                          />
                          <div className="overflow-y-auto max-h-40">
                            {/* Adjust max height as needed */}
                            <p className="text-sm text-red-500 mt-2">
                              *Enter email addresses separated by semicolon ( ;
                              ).
                            </p>
                            <textarea
                              {...register("toEmail")}
                              className="border border-gray-300 rounded-lg w-full p-2"
                              placeholder="to email"
                              defaultValue={[...new Set(emails)].join("; ")}
                              required
                            />
                            <p className="text-sm-red text-gray-500 mt-2">
                              Enter email addresses separated by commas.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                  >
                    Save & Send
                  </button>
                </div>
              </form>
            </div>
            {/* left side content - email template */}
            <div>
              {/* <EmailTemplate
                title={title}
                btnUrl={btnUrl}
                bodyText={bodyText}
              /> */}
              <div dangerouslySetInnerHTML={{ __html: emailHTML }} />
            </div>
          </div>
        </Collapse>
      </div>
      {/* modal  */}
      <div className="">
        {modalOpen && (
          <EmailModal
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            restaurantList={restaurantList}
          />
        )}
      </div>
    </div>
  );
};

export default Email;
