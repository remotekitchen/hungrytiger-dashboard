import React, { useState } from "react";

export default () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail(""); // Clear the email field
    }
  };

  return (
    <div className="mx-auto max-w-[1500px]">
      <section className="flex flex-col items-center p-20 bg-sky-100 rounded-lg">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-3xl text-gray-800 font-bold text-center mb-6">
            Get Timely Updates and Fresh ideas delivered to your inbox
          </h3>

          {/* Mailchimp form */}
          <div id="mc_embed_signup" className="mt-6 w-full max-w-md">
            <form
              action="https://chatchefs.us10.list-manage.com/subscribe/post?u=abdc1ce4a2930ec88721980f7&amp;id=c79a42c9e4&amp;f_id=00acd5e5f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate flex items-center"
              target="_blank"
            >
              <input
                type="email"
                name="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="required email flex-grow px-3 py-2 mr-2 text-gray-700 border rounded-lg focus:outline-none"
                id="mce-EMAIL"
                placeholder="Enter your email"
                required
              />
              <input
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button hover:bg-sky-500  text-black bg-yellow-400  font-bold py-2 px-4 rounded"
                value="Subscribe"
              />
              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input type="text" name="b_abdc1ce4a2930ec88721980f7_c79a42c9e4" tabIndex="-1" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
