import { FC } from 'react';
import { LiaFacebookSquare } from "react-icons/lia";
import { LiaLinkedin } from "react-icons/lia";
import { LiaInstagram } from "react-icons/lia";
import { LiaSkype } from "react-icons/lia";


const Footer: FC = () => {
    return (
        <footer className="bg-[#043864] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 text-center items-center md:text-left md:items-start">
                        <img
                            src="/src/assets/nex-logo.png"
                            alt="Nexus Ventures"
                            className="h-16 mb-4 "
                        />
                        <p className="text-sm text-[#FFFFFF] line-clamp-3 leading-7">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, eligendi, voluptatibus deleniti ipsum officia alias ex impedit.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold mb-4">Important Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-[#FFFFFF] hover:text-gray-400">Privacy Policy</a></li>
                            <li><a href="#" className="text-[#FFFFFF] hover:text-gray-400">Terms & Conditions</a></li>
                            <li><a href="#" className="text-[#FFFFFF] hover:text-gray-400">Contact Support</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-[#FFFFFF] hover:text-gray-400">
                                <LiaFacebookSquare className='h-[30px] w-[30px]' />
                            </a>
                            <a href="https://www.instagram.com/sha_ni_hala_/#" className="text-[#FFFFFF] hover:text-gray-400">
                            <LiaInstagram className='h-[30px] w-[30px]' />
                            </a>
                            <a href="https://www.linkedin.com/in/nihaaa/" className="text-[#FFFFFF] hover:text-gray-400">
                            <LiaLinkedin className='h-[30px] w-[30px]' />
                            </a>
                            <a href="https://www.linkedin.com/in/nihaaa/" className="text-[#FFFFFF] hover:text-gray-400">
                            <LiaSkype className='h-[30px] w-[30px]' />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#FFFFFF] text-center text-sm text-[#FFFFFF]">
                    <p>Copyright © 2025. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
