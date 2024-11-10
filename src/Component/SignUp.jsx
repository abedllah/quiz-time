import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.text();
    alert(data);
    navigate('/login')
};


  return (
    <section className="h-screen text-white">
      <div className="container h-full px-0 py-24">
        <div className="flex h-full items-center justify-center lg:justify-between">
          
          {/* Left column container with background */}
          <div className=" lg:w-1/2">
            <img
              src={`./img1.jpeg`}
              className="w-full h-full object-cover"
              alt="Background"
            />
          </div>

          {/* Right column container with form */}
          <div className="w-full px-6 lg:px-12 lg:w-1/2">
            <img className=' w-80 relative right-10 bottom-5' src={'logo.png'} alt="logo" />
    
            <form onSubmit={handleSubmit}>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-username">
                    Username
                  </label>
                  <input value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  class="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="abc123" />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-email">
                    Email
                  </label>
                  <input value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  class="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@abc" />
                </div>
              </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-password">
                    Password
                  </label>
                  <input value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                </div>
              </div>
            
              <TERipple rippleColor="light" className="w-full">
                <button
                  type="submit"
                  style={{ backgroundColor: "#078C10" }}
                  className="inline-block bg-green-700 w-full rounded-full px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Sign in
                </button >
              </TERipple>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
