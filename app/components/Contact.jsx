"use client"
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useToast } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react";


const Contact = () => {

  //le useref est utilisé pour enregistré ce que l'utilisateur a taper dans le formulaire
  const formRef = useRef();
  const toast = useToast()

  //les messages d'eereurs du formulaire
  const [messageError, setMessageError] = useState("")
  //ici ce sont les données du formulaire qui vont etre envoyées avec emailjs
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendData = (formulaire) => {
    try {
      fetch("./api/email", {
        method: "POST",
        body: JSON.stringify(formulaire),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    } catch (error) {
      console.log("erreur lors du fetch", error)
    }
  }
  
  const [loading, setLoading] = useState(false);

  //fonction qui va mettre à jour en temps réel les données du formulaire
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  //la fonction qui va envoyé les données du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendData(form)
      setLoading(false)
      setForm({
        name: '',
        email: '',
        message: ""
      })
      toast({
        title: 'Message sent',
        status: "success",
        position: "top",
        duration: 2000
      })
    } catch (error) {
      setLoading(false)
      console.log(error)
      alert("something went wrong, please try again")
    }
  }

  return (
    <ChakraProvider>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            method="post"
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Name</span>
              <input
                required="required"
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>
            <small className="p-0 m-0 bg-red-600 text-center rounded-sm">{messageError}</small>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your email</span>
              <input
                required="required"
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>
            <small className="p-0 m-0 bg-red-600 text-center rounded-sm">{messageError}</small>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Message</span>
              <textarea
                required="required"
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>
            <small className="p-0 m-0 bg-red-600 text-center rounded-sm">{messageError}</small>

            <button
              disabled={!form.message || !form.message || !form.email}
              type='submit'
              className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
            // onClick={notify}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </ChakraProvider>
  );
};

export default SectionWrapper(Contact, "contact");
