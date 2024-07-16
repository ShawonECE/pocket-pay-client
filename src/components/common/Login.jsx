import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h2 className="text-orange-500 text-4xl font-bold mt-10 mb-2">Welcome to PocketPay</h2>
            <h3 className="text-white mb-5">The only digital payment solution you need</h3>
            <div className="card shrink-0 w-full max-w-lg bg-transparent border border-orange-500">
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email/Phone No.</span>
                        </label>
                        <input type="text" placeholder="Email or Phone No." name='name' className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Pin</span>
                        </label>
                        <input type="text" placeholder="Your 5 digit pin" name='phone' className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn bg-transparent hover:bg-orange-500 text-white border-orange-500 hover:border-0">Login</button>
                    </div>
                </form>
                <p onClick={() => navigate('/register')} className="text-orange-500 text-center -mt-2 mb-4 underline cursor-pointer">Not registered yet? Register now</p>
            </div>
        </div>
    );
};

export default Login;