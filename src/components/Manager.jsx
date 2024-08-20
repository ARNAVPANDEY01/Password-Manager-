import React, { useEffect, useRef } from "react";
import { useState } from "react";
// import React from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();

  const passwordRef = useRef();


  const showPassword = () => {
    // alert("Showing Password");
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const copyText = (text) => {
    toast('Copy to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  }

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords)
    setpasswordArray(passwords);
  }

  useEffect(() => {
    getPasswords();
  
  }, []);

  const savePassword = async() => {
    await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
    // console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" })

    toast('Password Saved', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
  };

  const editPassword = (id) => {
    console.log("Edit Password ID", id);
    setform({...passwordArray.filter((item) => item.id === id)[0], id:id});

    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = async(id) => {
    console.log("Deleting Password ID", id);
    let confirmDelete = window.confirm("Are you sure you want to delete this password?");
    if (confirmDelete) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id})})
      // console.log([...passwordArray, form]);
      toast('Password Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
// User Interface Starts
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div>
        <div>
          <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
          </div>
        </div>
      </div>

      <div className="p-0 md:p-0 md:mycontainer">
        <h1 className="text-4xl text font-bold text-center ">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="icons/eye.png"
                  alt="eye"
                  className="p-1"
                  width={26}
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-4 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border-1 border-green-900 font-bold"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Password to show</div>}
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center py-2 border border-white ">
                      {" "}
                      <div className="flex justify-center items-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              'width': "25px",
                              'height': "25px",
                              "paddingTop": "3px",
                              "paddingLeft": "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center py-2 border border-white">
                      <div className="flex justify-center items-center">
                        <span>{item.username}</span>
                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              'width': "25px",
                              'height': "25px",
                              "paddingTop": "3px",
                              "paddingLeft": "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center py-2 border border-white">
                      <div className="flex justify-center items-center">
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className=" lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              'width': "25px",
                              'height': "25px",
                              "paddingTop": "3px",
                              "paddingLeft": "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center py-2 border border-white">
                      <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/ogkflacg.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
