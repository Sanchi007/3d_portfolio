import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => {};
  const handleBlur = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(form);
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Sanchita",
          from_email: form.email,
          to_email: "me.sanchi007s@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        console.log("Email sent");
        setIsLoading(false);
        // TODO: show success message
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        // TODO: Show error message
      });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form
          className="w-full flex flex-col gap-3 mt-8"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className="text-black-500 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="John"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <label className="text-black-500 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="John@gmail.com"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <label className="text-black-500 font-semibold">Your message</label>
          <textarea
            name="message"
            className="textarea"
            rows={4}
            placeholder="Let me know how I can help you"
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
