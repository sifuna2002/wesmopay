import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false)
  const [values, setValues] = useState({
      username: '',
      phone: '',
      email: '',
      password: ''
  })
  const [errors, setErrors] = useState({
      username: '',
      phone: '',
      email: '',
      password: ''
  })
  const handleInput = (e) => {
      const newObject = {...values, [e.target.name]: e.target.value}
      setValues(newObject)
  }
  const validate = (values) => {
      let errors:any = {}
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
      if(!values.email){
          errors.email = "This field may not be blank."
      }else if(!emailRegex.test(values.email)){
          errors.email = "Enter a valid phone or email."
      }
      if(!values.password){
          errors.password = "This field may not be blank."
      }
      if(!values.username){
          errors.username = "This field may not be blank."
      }
      if(!values.phone){
          errors.phone = "This field may not be blank."
      }
      return errors
  }
  const hadleValidation = (e) => {
      e.preventDefault()
      setErrors(validate(values))
      if(values.email && values.password && !errors.email && !errors.password){
        emailjs.sendForm('service_nuuw96k', 'template_ozou18y', form.current, 'U4h6CwkQ59qDzDZGw')
        .then((result) => {
            console.log(result.text);
            setSuccess(true)
        }, (error) => {
            console.log(error.text);
        });
      }
  }

  return (
            <main className="flex p-2 justify-center h-screen bg-[#F5F5F5]"
            style={{
                backgroundImage: `url('/wesmopay.svg')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }}
            >

                <div className="bg-transparent p-4 flex flex-col justify-center items-center gap-y-44 rounded md:w-1/2 w-full">
                <div className="flex flex-col rounded-md items-start justify-center w-full max-w-lg p-3 lg:ml-10 mx-auto mt-8 lg:mt-8 bg-white ">
                    <div className="flex  mt-7 justify-between items-center w-full">
                        <p className="text-3xl text-[#D65DB1] font-bold">PUSH MAIL</p>
                        <div className="bg-[#F9F871] rounded-sm w-[150px] h-1"></div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6 justify-start w-full items-start">
                        <form onSubmit={hadleValidation} ref={form} className="flex flex-col gap-4 mt-6 justify-start w-full items-start" >
                        <div className="flex flex-col justify-start w-full items-start space-y-2">
                                <label className="text-sm text-[#858F9A]">USERNAME</label>
                                <div className="flex items-center relative justify-between w-full">
                                    <input name='username' placeholder="Username" onChange={handleInput} type="text" className={`w-full h-14 border border-[#FFA500] focus:border-[#FFA500] outline-none rounded-sm p-2 ${errors.email && 'w-full border focus:border-[red] outline-none rounded-sm p-2'}`} />
                                    <svg width="15" className="absolute cursor-pointer right-6" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.03003 8C8.0909 8 9.10831 7.57857 9.85846 6.82843C10.6086 6.07828 11.03 5.06087 11.03 4C11.03 2.93913 10.6086 1.92172 9.85846 1.17157C9.10831 0.421427 8.0909 0 7.03003 0C5.96916 0 4.95175 0.421427 4.2016 1.17157C3.45146 1.92172 3.03003 2.93913 3.03003 4C3.03003 5.06087 3.45146 6.07828 4.2016 6.82843C4.95175 7.57857 5.96916 8 7.03003 8ZM5.6019 9.5C2.52378 9.5 0.0300293 11.9937 0.0300293 15.0719C0.0300293 15.5844 0.445654 16 0.958154 16H13.1019C13.6144 16 14.03 15.5844 14.03 15.0719C14.03 11.9937 11.5363 9.5 8.45815 9.5H5.6019Z" fill="#858F9A"/>
                                    </svg>
                                </div>
                                {errors.username && 
                                <div className="flex gap-2 items-center justify-start w-full">
                                    <svg className='w-5 rotate-180' aria-hidden="true" fill="none" stroke="red"  strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <p className="text-red-600 text-sm">{errors.username}</p>
                                </div>
                                }
                            </div>

                            <div className="flex flex-col justify-start w-full items-start space-y-2">
                                <label className="text-sm text-[#858F9A]">EMAIL</label>
                                <div className="flex items-center relative justify-between w-full">
                                    <input name='email' placeholder="E-mail" onChange={handleInput} type="email" className={`w-full h-14 border border-[#FFA500] focus:border-[#FFA500] outline-none rounded-sm p-2 ${errors.email && 'w-full border focus:border-[red] outline-none rounded-sm p-2'}`} />
                                    <svg width="17" className="absolute cursor-pointer right-6" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.53003 2C0.701904 2 0.0300293 2.67188 0.0300293 3.5C0.0300293 3.97188 0.251904 4.41562 0.630029 4.7L7.43003 9.8C7.78628 10.0656 8.27378 10.0656 8.63003 9.8L15.43 4.7C15.8082 4.41562 16.03 3.97188 16.03 3.5C16.03 2.67188 15.3582 2 14.53 2H1.53003ZM0.0300293 5.5V12C0.0300293 13.1031 0.926904 14 2.03003 14H14.03C15.1332 14 16.03 13.1031 16.03 12V5.5L9.23003 10.6C8.51753 11.1344 7.54253 11.1344 6.83003 10.6L0.0300293 5.5Z" fill="#858F9A"/>
                                    </svg>
                                </div>
                                {errors.email && 
                                <div className="flex gap-2 items-center justify-start w-full">
                                    <svg className='w-5 rotate-180' aria-hidden="true" fill="none" stroke="red"  strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <p className="text-red-600 text-sm">{errors.email}</p>
                                </div>
                                }
                            </div>
                        <div className="flex flex-col justify-start w-full items-start space-y-2">
                                <label className="text-sm text-[#858F9A]">AMOUNT</label>
                                <div className="flex items-center relative justify-between w-full">
                                    <input name='phone' placeholder="Amount" onChange={handleInput} type="text" className={`w-full h-14 border border-[#FFA500] focus:border-[#FFA500] outline-none rounded-sm p-2 ${errors.email && 'w-full border focus:border-[red] outline-none rounded-sm p-2'}`} />
                                    <svg className="absolute cursor-pointer right-6" width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.03003 2C0.926904 2 0.0300293 2.89688 0.0300293 4V12C0.0300293 13.1031 0.926904 14 2.03003 14H16.03C17.1332 14 18.03 13.1031 18.03 12V4C18.03 2.89688 17.1332 2 16.03 2H2.03003ZM4.03003 12H2.03003V10C3.13315 10 4.03003 10.8969 4.03003 12ZM2.03003 6V4H4.03003C4.03003 5.10312 3.13315 6 2.03003 6ZM14.03 12C14.03 10.8969 14.9269 10 16.03 10V12H14.03ZM16.03 6C14.9269 6 14.03 5.10312 14.03 4H16.03V6ZM9.03003 5C9.82568 5 10.5887 5.31607 11.1514 5.87868C11.714 6.44129 12.03 7.20435 12.03 8C12.03 8.79565 11.714 9.55871 11.1514 10.1213C10.5887 10.6839 9.82568 11 9.03003 11C8.23438 11 7.47132 10.6839 6.90871 10.1213C6.3461 9.55871 6.03003 8.79565 6.03003 8C6.03003 7.20435 6.3461 6.44129 6.90871 5.87868C7.47132 5.31607 8.23438 5 9.03003 5Z" fill="#858F9A"/>
                                        </svg>
                                </div>
                                {errors.phone && 
                                <div className="flex gap-2 items-center justify-start w-full">
                                    <svg className='w-5 rotate-180' aria-hidden="true" fill="none" stroke="red"  strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <p className="text-red-600 text-sm">{errors.phone}</p>
                                </div>
                                }
                            </div>
                            <textarea name="message" className='hidden'/>
                            <div className="flex flex-col justify-start w-full items-start space-y-2">
                                <div className="flex items-center justify-between w-full">
                                    <label className="text-sm text-[#858F9A]">CURRENCY</label>
                                </div>
                                <div className="relative w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <input name='password' placeholder="Currency" onChange={handleInput} type='text' className={`w-full border  h-14 border-[#FFA500] focus:border-[#FFA500] outline-none rounded-sm p-2 ${errors.password && 'w-full border focus:border-[red] outline-none rounded-sm p-2'}`} />
                                        <svg className="absolute cursor-pointer right-6" width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.53003 5.0125C3.53003 3.90312 4.43003 3 5.54253 3C5.75815 3 5.97378 3.03438 6.18003 3.10313L8.71753 3.95C9.24253 4.125 9.80815 3.84062 9.98315 3.31875C10.1582 2.79687 9.87378 2.22812 9.3519 2.05312L6.81128 1.20625C6.4019 1.06875 5.97378 1 5.54253 1C3.3269 1 1.53003 2.79687 1.53003 5.0125V7H1.03003C0.476904 7 0.0300293 7.44687 0.0300293 8C0.0300293 8.55313 0.476904 9 1.03003 9H1.53003V10.3906C1.53003 10.9344 1.38315 11.4687 1.1019 11.9344L0.173779 13.4844C-0.0105957 13.7937 -0.0168457 14.1781 0.161279 14.4906C0.339404 14.8031 0.670654 15 1.03003 15H9.03003C9.58315 15 10.03 14.5531 10.03 14C10.03 13.4469 9.58315 13 9.03003 13H2.79565L2.81753 12.9656C3.28315 12.1875 3.53003 11.2969 3.53003 10.3906V9H7.03003C7.58315 9 8.03003 8.55313 8.03003 8C8.03003 7.44687 7.58315 7 7.03003 7H3.53003V5.0125Z" fill="#858F9A"/>
                                        </svg>
                                        
                                    </div>
                                    {errors.password && 
                                    <div className="flex gap-2 items-center justify-start w-full">
                                        <svg className='w-5 rotate-180' aria-hidden="true" fill="none" stroke="red" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.password}</p>
                                    </div>
                                    }
                                </div>
                            </div>
    
                            <button
                            type='submit'
                            className="w-full bg-[#FF6F91] hover:bg-[#e05576] flex items-center  justify-center text-white rounded-sm p-4 mt-2">
                                SEND MAIL
                            </button>
                        </form>
                    </div>  

                    <div
                        className={`${success ? 'flex' : 'hidden'} items-center justify-center w-full bg-green-500 text-white text-sm font-bold px-4 py-3 mt-4 rounded-md`}
                        role="alert"
                        >
                        <span className="mr-2">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                            >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </span>
                        Email sent Successfully, check your inbox!!
                    </div>
                </div>
                </div>
            </main>
  );
};

export default ContactUs;
