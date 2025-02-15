import React, { useState } from 'react';
import { Plus, Minus, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// AuthButtons Component
const AuthButtons = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };
  

  

  return (
    <div className="space-x-4">
      <button
        onClick={handleLoginClick}
        className="px-4 py-2 hover:bg-gray-100 rounded-md"
      >
        Login
      </button>
      <button
        onClick={handleSignupClick}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        Sign Up
      </button>
    </div>
  );
};

// CustomAccordion Component
const CustomAccordion = ({ items }) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-4 py-4 flex justify-between items-center text-left font-medium"
          >
            {item.question}
            {openItem === index ? (
              <Minus className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {openItem === index && (
            <div className="px-4 pb-4 text-gray-600">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

// RoleRow Component with Marquee Animation
const RoleRow = ({ roles, speed = 20 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-block animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {roles.map((role) => (
          <span
            key={role}
            className="inline-block px-4 py-2 mx-2 bg-gray-100 rounded-full text-sm"
          >
            {role}
          </span>
        ))}
        {roles.map((role) => (
          <span
            key={`${role}-duplicate`}
            className="inline-block px-4 py-2 mx-2 bg-gray-100 rounded-full text-sm"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
};

// LandingPage Component
const LandingPage = () => {
  const roles = [
    [
      'Full Stack Developer',
      'Frontend Developer',
      'Backend Developer',
      'Full-Stack Engineer',
      'Software Architect',
      'QA Engineer',
      'Machine Learning Engineer',
    ],
    [
      'AI Engineer',
      'UX/UI Designer',
      'User Researcher',
      'Visual Designer',
      'Creative Director',
      'Design Director',
      'Design Manager',
      'Graphic Designer',
    ],
    [
      'HR',
      'Office Manager',
      'Recruiter',
      'Customer Service',
      'Operations Manager',
      'Chief of Staff',
      'Business Development',
      'Sales Development Representative',
    ],
    [
      'Growth Hacker',
      'Marketing Manager',
      'Product Marketing Manager',
      'Copywriter',
      'Social Media Manager',
      'Community Manager',
      'Business Analyst',
    ],
  ];

  const faqs = [
    {
      question: 'What is this platform?',
      answer:
        'Our platform connects founders with partners, offering opportunities to collaborate on innovative projects with the option of equity or compensation.',
    },
    {
      question: 'How does the partnership process work?',
      answer:
        'The partnership process involves creating your profile, connecting with potential collaborators, and finalizing agreements.',
    },
    {
      question: 'What types of projects can I list or join?',
      answer: 'You can list or join various technology and business-related projects.',
    },
    {
      question: 'How is equity or compensation determined?',
      answer: 'Equity and compensation are determined through mutual agreement between partners.',
    },
    {
      question: 'How are contracts handled on the platform?',
      answer: 'We provide standard contract templates that can be customized to your needs.',
    },
    {
      question: 'What if I have a dispute with my partner?',
      answer: 'We offer mediation services to help resolve any partnership disputes.',
    },
    {
      question: 'How do I ensure my project idea remains confidential?',
      answer: 'All users sign NDAs and we have strict confidentiality measures in place.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Idea',
      description:
        'Describe your startup idea, set terms, and detail what you are looking for in a partner.',
    },
    {
      number: '02',
      title: 'Connect with Pals',
      description:
        'Review applications, chat with potential partners, and find the perfect match for your project.',
    },
    {
      number: '03',
      title: 'Secure the Partnership',
      description:
        'Draft and sign a contract, then start collaborating to bring your vision to life.',
    },
  ];

  return (
    <div className="h-screen w-screen bg-white px-4 md:px-20">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4">
        <div className="text-purple-600 font-bold text-xl">foundingpals</div>
        <AuthButtons />
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 h-full relative">
        {/* Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.png"
            alt="Teamwork"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Overlay */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-40 text-black">
            Find the startup partner<br /> you have been searching<br /> for
          </h1>
          <p className="text-gray-600 mb-8">
            Join forces with founders or partners, offering equity or compensation to bring startup
            ideas to life.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-2">How it works</h2>
        <p className="text-center text-gray-600 mb-12">
          Founders create projects, teams apply, and collaborate with equity or compensation.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-purple-600 font-semibold mb-2">{step.number}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Who is this for?</h2>
        <p className="text-center text-gray-600 mb-12">
          For all ambitious entrepreneurs and talented professionals seeking impactful collaborations.
        </p>
        <div className="space-y-8">
          {roles.map((row, idx) => (
            <RoleRow key={idx} roles={row} speed={25 + idx * 5} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className=" mr-40 ml-40 py-16 px-40 ">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
        <CustomAccordion items={faqs} />
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-600">© 2024 foundingpals</div>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-600">
            <Twitter size={16} /> Follow for updates
          </a>
        </div>
      </footer>

      {/* Marquee Animation Styles */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;