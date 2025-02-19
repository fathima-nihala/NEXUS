import { FC, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { webLogin } from '../slices/authSlice';
import { useSnackbar } from 'notistack';


const Login: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(webLogin(formData)).unwrap();
            enqueueSnackbar('Login successful!', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
            navigate('/home');
        } catch (error: any) {
            const errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }
    };

    return (
        <div className="md:min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="hidden md:block">
                            <img
                                src="../../src/assets/nex-user.jpeg"
                                alt="Man working on laptop"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-8 bg-[#043864] text-white">
                            <div className="max-w-md mx-auto">
                                <h2 className="text-3xl font-bold mb-2">Login</h2>
                                <p className="text-gray-300 mb-8">Fill in your credentials and click on the Login button</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            User Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-2 rounded bg-white text-black"
                                            placeholder="Enter email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="w-full px-4 py-2 rounded bg-white text-black pr-10"
                                                placeholder="Enter password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        <a href="#" className="block text-sm text-right mt-2 text-gray-300 hover:text-white">
                                            Forgot Password?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-white text-[#043864] py-2 px-4 rounded font-medium hover:bg-gray-100 transition-colors"
                                    >
                                        Login
                                    </button>

                                    <p className="text-center text-sm">
                                        Don't have an account?{' '}
                                        <a href="/sign_up" className="text-white hover:underline">
                                            Sign Up
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;