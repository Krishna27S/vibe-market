import React,{useState} from 'react';

const Login =() =>{
    const [email ,setEmail]=useState('');
    const [password ,setPassword]=useState('');
    const [error, setError]=useState('');


    const handleLogin =async(loginType) => {
        try{
            const response =await fetch ('http://localhost:5000/api/login',{
                method :'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email,
                    password,
                    loginType
                }),
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error Occured');
            }
            const data = await response.json();
            const { token , user } = data;


            // we are storing the token in localstorage to avoid relogin while refreshing
            localStorage.setItem('token',token);

            //Redirect based on the user type (admin or user)

            if(user.isAdmin){
                console.log('Redirect to admin dashboard');
            }
            else{
                // redirecting to user dashboard
                console.log('Redirect to user dashboard');
            }
        }catch(error){
            setError(error.message ||'an error occurred');
        }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Vibe Market 
              🤙
            </h2>
           
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
    
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
    
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
    
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                onClick={() => handleLogin('user')}
              >
                Sign in as User
              </button>
              <button
                type="button"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                onClick={() => handleLogin('admin')}
              >
                Sign in as Admin
              </button>
            </div>
          </form>
          
        </div>
      </div>
    );}

export default Login;