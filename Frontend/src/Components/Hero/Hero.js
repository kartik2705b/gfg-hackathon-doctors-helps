import React from "react";
import doctor from "../../assets/doctor.png";
import flower from "../../assets/Flower.png";

const Hero = () => {
  const handleClick = () => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if(token && role){
      if(role === 'patient'){
        window.location.href = "patientdashboard"
      }else if(role === 'doctor'){
        window.location.href = "doctordashboard"
      }else{
        window.location.href = "login"
      }
    }else{
      window.location.href = "login"
    }
  }
  return (
    <section class="bg-[#F2F4EA] h-auto">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto md:gap-8 xl:gap-0 md:py-16 md:grid-cols-12">
        <div class="mr-auto place-self-center md:col-span-7">
          <h1 className="text-4xl md:text-8xl font-serif font-semibold">
            Healthcare <br />
            When All else{" "}
            <p className="flex item-center mb-0">
              Fails{" "}
              <img
                src={flower}
                alt="mockup"
                className="w-8 h-8 md:w-16 md:h-16"
              />
            </p>
          </h1>
          <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-justify">
            Introducing our innovative video call service, bringing healthcare
            to your fingertips. Connect with qualified doctors from the comfort
            of your home, ensuring convenient and timely medical consultations.
            Experience personalized care, discuss symptoms, and receive
            professional advice seamlessly. Your well-being is our priority, now
            just a click away.
          </p>
          <button
          onClick={() => handleClick()}
            class="inline-flex items-center mr-4 justify-center px-5 py-3  font-medium text-center  border border-gray-300 rounded-lg text-white bg-green-900 hover:text-white"
          >
            Find Your Doctor
          </button>
          <button
          onClick={() => window.location.href = "/symptomchecker"}
            class="inline-flex items-center mr-4 justify-center px-5 py-3  font-medium text-center  border border-gray-300 rounded-lg text-white bg-green-900 hover:text-white"
          >
            Diagnose Your Symptoms Now
          </button>
          <button
          onClick={() => window.location.href = "/store"}
            class="inline-flex items-center justify-center px-5 py-3  font-medium text-center  border border-gray-300 rounded-lg text-white bg-green-900 hover:text-white"
          >
            Find Your Medicine
          </button>
          <button
          onClick={() => handleClick()}
            class="inline-flex items-center mt-2 ml-0 justify-center px-5 py-3  font-medium text-center  border border-gray-300 rounded-lg text-white bg-green-900 hover:text-white"
          >
            Book an Appoinment
          </button>
        </div>
        <div class=" mt-6 md:mt-0 lg:col-span-5 lg:flex">
          <img src={doctor} alt="mockup" className="rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
