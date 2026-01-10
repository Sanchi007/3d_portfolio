import React, { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Fox from "../models/Fox";
import Loader from "../components/Loader";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => {
    setCurrentAnimation("walk");
  };
  const handleBlur = () => {
    setCurrentAnimation("idle");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");
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
        showAlert({
          show: true,
          text: "Message sent successfully",
          type: "success",
        });
        setTimeout(() => {
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
          hideAlert();
        }, [2000]);
      })
      .catch((error) => {
        setIsLoading(false);
        setCurrentAnimation("idle");
        console.log(error);
        showAlert({
          show: true,
          text: "I didn't receive your message",
          type: "danger",
        });
      });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
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
      <div className="lg:w-1/2 w-full lg:h-auto md:h-125 h-87.5">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />} />
          <Fox
            position={[0.5, 0.35, 0]}
            rotation={[12.6, -0.5, 0]}
            scale={[0.5, 0.5, 0.5]}
            currentAnimation={currentAnimation}
          />
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
