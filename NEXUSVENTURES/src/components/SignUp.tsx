import { FC, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlinePerson2 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { webRegister } from '../slices/authSlice';
import { useSnackbar } from 'notistack';

interface FormData {
    firstName: string;
    lastName: string;
    contactNo: string;
    whatsappNo: string;
    email: string;
    state: string;
    referralCode: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

const SignUp: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        contactNo: '',
        whatsappNo: '',
        email: '',
        state: '',
        referralCode: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            enqueueSnackbar('Passwords do not match!', { variant: 'error' });
            return;
        }

        if (!formData.agreeToTerms) {
            enqueueSnackbar('Please agree to the terms and conditions.', { variant: 'error' });
            return;
        }

        try {
            await dispatch(webRegister(formData)).unwrap();
            enqueueSnackbar('Registration successful!', { variant: 'success' });
            navigate('/');
        } catch (error: any) {
            enqueueSnackbar(error.message || 'Registration failed. Please try again.', { variant: 'error' });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="hidden md:block">
                            <img
                                src="../../src/assets/signup.jpeg"
                                alt="signup"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-8 bg-[#043864] text-white">
                            <div className="max-w-md mx-auto">
                                <h2 className="text-3xl font-bold mb-2">Sign up</h2>
                                <p className="text-gray-300 mb-8">Fill in your information below to login for the degree course</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    className="w-full px-4 py-2 rounded bg-white text-black"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                />
                                                <MdOutlinePerson2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    className="w-full px-4 py-2 rounded bg-white text-black"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                />
                                                <MdOutlinePerson2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="contactNo"
                                                placeholder="Contact No."
                                                className="w-full px-4 py-2 rounded bg-white text-black"
                                                value={formData.contactNo}
                                                onChange={handleInputChange}
                                            />
                                            <IoCallOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="whatsappNo"
                                                placeholder="WhatsApp No."
                                                className="w-full px-4 py-2 rounded bg-white text-black"
                                                value={formData.whatsappNo}
                                                onChange={handleInputChange}
                                            />
                                            <FaWhatsapp className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email address"
                                                className="w-full px-4 py-2 rounded bg-white text-black"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            <CiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            className="w-full px-4 py-2 rounded bg-white text-black"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div >
                                        <input
                                            type="text"
                                            name="referralCode"
                                            placeholder="Referral Code"
                                            className="w-full px-4 py-2 rounded bg-white text-black"
                                            value={formData.referralCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Password Fields */}
                                    <div className="relative">
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Password (6 characters)"
                                                className="w-full px-4 py-2 rounded bg-white text-black pr-10"
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
                                    </div>

                                    <div className="relative">
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                className="w-full px-4 py-2 rounded bg-white text-black pr-10"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className="text-sm">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleInputChange}
                                                className="rounded"
                                            />
                                            <span>
                                                I agree to the{' '}
                                                <a href="#" className="text-white hover:underline">Terms and Conditions</a>
                                                {' '}and{' '}
                                                <a href="#" className="text-white hover:underline">Privacy Policy</a>
                                            </span>
                                        </label>
                                    </div>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-black text-white py-2 px-4 rounded font-medium hover:bg-gray-900 transition-colors"
                                        >
                                            Register
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/')}
                                            className="w-full bg-white text-[#043864] py-2 px-4 rounded font-medium hover:bg-gray-100 transition-colors"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default SignUp;