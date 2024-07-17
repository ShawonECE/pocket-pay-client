import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from './AuthProvider';
import { useContext } from "react";
import swal from 'sweetalert';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const { signInUser, setUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        const credential = data.credential;
        if (credential.includes('@')) {
            data.email = credential;
        } else {
            data.phone = credential;
        }
        delete data.credential;
        signInUser(data)
        .then(res => {
            if (res.data._id) {
                reset();
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                axiosPublic.post('/jwt', { email: res.data.email })
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                });
                swal("Logged in successfully!", {
                    icon: "success",
                });
                navigate('/dashboard');

            } else {
                swal("Login Failed!", {
                    icon: "warning",
                });
            }
        })
        .catch(error => {
            console.error(error);
            swal("Login Failed!", {
                icon: "warning",
            });
        });
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Helmet>
                <title>PocketPay | Log In</title>
            </Helmet>
            <h2 className="text-orange-500 text-4xl font-bold mt-10 mb-2">Welcome to PocketPay</h2>
            <h3 className="text-white mb-5">The only digital payment solution you need</h3>
            <div className="card shrink-0 w-full max-w-lg bg-transparent border border-orange-500">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                    {
                        location.state?.from === '/register' &&
                        <h2 className="text-center text-lg font-semibold text-green-400">You are registered. Now please log in</h2>
                    }
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email/Phone No.</span>
                        </label>
                        <input type="text" placeholder="Email or Phone No." className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" {...register("credential", { 
                                required: 'Email or Phone no. is required'
                            })} />
                        <p className="text-red-500 mt-2">{errors.credential?.message}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Pin</span>
                        </label>
                        <input type="text" placeholder="Your 5 digit pin" className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" {...register("pin", { 
                                required: 'Pin is required'
                            })} />
                        <p className="text-red-500 mt-2">{errors.pin?.message}</p>
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