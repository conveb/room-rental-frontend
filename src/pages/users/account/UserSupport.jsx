import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { MdSupportAgent } from "react-icons/md";
import { useSupport } from "../../../hooks/users/useSupport";

export default function UserSupport() {
  const { submitSupportRequest, loading } = useSupport();

  // Form State - issue_type defaults to "payment" as per backend choices
  const [formData, setFormData] = useState({
    issue_type: "payment",
    subject: "",
    message: ""
  });

  const handleSubmit = async () => {
    // Validation
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert("Please enter a subject and a message.");
      return;
    }

    // Payload construction based on backend OPTIONS metadata
    // Merging subject into message since backend doesn't have a 'subject' field
    const payload = {
      issue_type: formData.issue_type,
      message: `SUBJECT: ${formData.subject.toUpperCase()}\n\nCONTENT: ${formData.message}`
    };

    const result = await submitSupportRequest(payload);

    if (result.success) {
      alert("Your support ticket has been created successfully.");
      // Reset form
      setFormData({
        issue_type: "payment",
        subject: "",
        message: ""
      });
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="space-y-6 px-5 md:p-6 mt-20 md:mt-0 md:mx-auto md:container">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support & Help</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Open a ticket for payment, booking, or account-related inquiries.
        </p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: "/auth/user/complaints", label: "Complaints", color: "bg-orange-200", desc: "Payment or refund issues." },
          { to: "/auth/user/report_property", label: "Report Property", color: "bg-emerald-200", desc: "Fake or policy violations." },
          { to: "/auth/user/report_landowner", label: "Report Owner", color: "bg-blue-200", desc: "Behavior or guideline issues." }
        ].map((item, idx) => (
          <Link key={idx} to={item.to}>
            <div className="flex justify-between items-center gap-3 bg-white rounded-2xl shadow-sm p-4 border hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="flex gap-3">
                <p className={`${item.color} rounded-xl flex items-center justify-center p-4`}>
                  <TfiWrite size={22} />
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-[11px] md:text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
              <FaArrowRight size={16} className="text-gray-300" />
            </div>
          </Link>
        ))}
      </div>

      {/* Ticket Creation Form */}
      <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 space-y-6 border border-gray-100">
        <h2 className="flex items-center gap-4 text-xl font-bold text-gray-900">
          <MdSupportAgent size={50} className="p-2 bg-teal-100 text-teal-700 rounded-2xl"/>
          Create Support Ticket
        </h2>

        <div className="space-y-5">
          {/* Category Selector - Values match backend choices */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Category</label>
            <select
              value={formData.issue_type}
              onChange={(e) => setFormData({ ...formData, issue_type: e.target.value })}
              className="w-full border-gray-200 border-2 rounded-2xl px-4 py-3 text-sm focus:border-black outline-none transition appearance-none bg-white cursor-pointer"
            >
              <option value="payment">Payment Issue</option>
              <option value="booking">Booking Issue</option>
              <option value="account">Account Settings</option>
              <option value="other">Other Inquiry</option>
            </select>
          </div>

          {/* Subject Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Subject</label>
            <input
              type="text"
              placeholder="Brief summary..."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full border-gray-200 border-2 rounded-2xl px-4 py-3 text-sm focus:border-black outline-none transition"
            />
          </div>

          {/* Message Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Message</label>
            <textarea
              rows={6}
              placeholder="Describe your problem in detail..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border-gray-200 border-2 rounded-2xl px-4 py-3 text-sm focus:border-black outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full md:w-auto px-12 py-4 rounded-2xl bg-black text-white font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 disabled:bg-neutral-300"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Processing...
              </>
            ) : (
              "Submit Ticket"
            )}
          </button>
        </div>
      </div>

      {/* Support Info Footer */}
      <div className="bg-gray-100 p-5 rounded-2xl border border-dashed border-gray-300">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Our support team typically responds within 24-48 business hours. 
          <br className="hidden md:block" /> 
          You can track the status of this ticket in your dashboard.
        </p>
      </div>
    </div>
  );
}