import React from "react";
import PrivacyPolicyImg from '../Assets/Images/privacypolicy.jpg'

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen  pb-16 p-5 px-6 ">
            <div className="relative w-full h-64">
                <img
                    src={PrivacyPolicyImg}
                    alt="privacy-policy"
                    className="w-full h-full rounded-xl object-cover"
                />

                {/* Centered heading */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className=" text-4xl md:text-5xl font-serif font-bold text-white text-center special-font">
                        Privacy Policy
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 max-w-6xl mx-auto">

                <div className="col-span-1 text-start md:text-end my-10 ">
                    <div className="sticky top-20 right-0 ">
                        <p className="text-xs md:text-lg ">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
                            consequuntur saepe neque tempore magni autem, provident sit iste
                            dolorem nulla voluptas distinctio excepturi aperiam itaque libero
                            ullam temporibus voluptate veritatis?
                        </p>
                    </div>
                </div>
                <div className="col-span-3  max-w-4xl mx-auto  backdrop-blur-lg  md:p-12 rounded-3xl text-xs md:text-lg">

                    <p className="text-gray-700 text-xs md:text-lg mb-6 leading-relaxed">
                        Welcome to <strong>Alive Paris</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information in accordance with French law, including CNIL regulations and GDPR.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-300 pb-2">
                        1. Information We Collect
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        We may collect the following information:
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
                        <li>Personal information such as name, email address, and phone number.</li>
                        <li>Account credentials if you register on our platform.</li>
                        <li>Rental preferences and search queries.</li>
                        <li>Usage data such as IP address, browser type, and pages visited.</li>
                    </ul>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-300 pb-2">
                        2. How We Use Your Information
                    </h2>
                    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
                        <li>Provide and improve our services.</li>
                        <li>Respond to inquiries and communicate important updates.</li>
                        <li>Send promotional materials if you opted in.</li>
                        <li>Ensure compliance with legal obligations in France.</li>
                    </ul>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-300 pb-2">
                        3. Sharing Your Information
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        We do not sell or rent your personal data to third parties. We may share your data with:
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
                        <li>Service providers who help us operate the website.</li>
                        <li>Authorities if required by French law.</li>
                    </ul>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-300 pb-2">
                        4. Data Retention
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We keep your personal data only as long as necessary to provide our services and comply with legal requirements.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-300 pb-2">
                        5. Your Rights
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Under French law, you have the right to:
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
                        <li>Access, correct, or delete your personal data.</li>
                        <li>Restrict or object to processing of your data.</li>
                        <li>Request data portability.</li>
                        <li>Withdraw consent where applicable.</li>
                    </ul>
                    <p className="text-gray-700 mb-6">
                        To exercise these rights, contact us at <a href="mailto:contact@studentrentals.fr" className="text-blue-700 underline">contact@studentrentals.fr</a>.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-300 pb-2">
                        6. Cookies
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We use cookies to enhance your experience. You can manage your cookie preferences in your browser settings.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-300 pb-2">
                        7. Updates to this Policy
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We may update this Privacy Policy periodically. Changes will be posted on this page with the date of the last update.
                    </p>

                    <p className="mt-10 text-gray-500 text-xs md:text-sm text-center">
                        Last updated: December 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
