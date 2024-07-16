import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import swal from 'sweetalert';

const Register = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            role: "",
        }
    });
    const onSubmit = (data) => {
        signInUser(data)
        .then(res => {
            if (res.data.insertedId) {
                swal("Registered successfully!", {
                    icon: "success",
                });
                navigate('/', {state: {from: '/register', to: location.state ? location.state : null}});
            } else {
                swal("Registration Failed!", {
                    icon: "warning",
                });
            }
        })
        .catch(error => {
            console.error(error);
            swal("Registration Failed!", {
                icon: "warning",
            });
        });
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Helmet>
                <title>Register | PocketPay</title>
            </Helmet>
            <h2 className="text-orange-500 text-4xl font-bold mt-10 mb-2">Register to PocketPay</h2>
            <h3 className="text-white mb-5">Be a part of the most elegant payment solution</h3>
            <div className="card shrink-0 w-full max-w-lg bg-transparent border border-orange-500">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Register as</span>
                        </label>
                        <select className="select select-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" {...register("role", { required: 'Role is required' })} >
                            <option>User</option>
                            <option>Agent</option>
                        </select>
                        <p className="text-red-500 mt-2">{errors.role?.message}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Name</span>
                        </label>
                        <input type="text" placeholder="Your name" className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" {...register("name", { 
                                required: 'Name is required',
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: "Name can't contain digits or special characters"
                                } })} />
                        <p className="text-red-500 mt-2">{errors.name?.message}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email</span>
                        </label>
                        <input type="email" placeholder="Your email" className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" {...register("email", { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address'
                                } })} />
                        <p className="text-red-500 mt-2">{errors.email?.message}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Phone No.</span>
                        </label>
                        <input type="text" placeholder="Your phone No." className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" {...register("phone", { 
                                required: 'Phone no. is required',
                                pattern: {
                                    value: /^\d{11}$/,
                                    message: 'Please enter a valid phone no.'
                                } })} />
                        <p className="text-red-500 mt-2">{errors.phone?.message}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Pin</span>
                        </label>
                        <input type="text" placeholder="Your 5 digit pin" name='pin' className="input input-bordered bg-transparent border-orange-500 focus:bg-orange-200 text-white focus:text-black" {...register("pin", { 
                                required: 'Pin is required',
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: 'Please enter a pin of 5 digits'
                                } })} />
                        <p className="text-red-500 mt-2">{errors.pin?.message}</p>
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn bg-transparent hover:bg-orange-500 text-white border-orange-500 hover:border-0">Register</button>
                    </div>
                </form>
                <p onClick={() => navigate('/')} className="text-orange-500 text-center -mt-2 mb-4 underline cursor-pointer">Already registered? Login now</p>
            </div>
        </div>
    );
};

export default Register;