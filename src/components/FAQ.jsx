import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import './FAQ.css';

const faqData = [
    {
        question: "What grades does Merryland School offer?",
        answer: "Merryland School offers education from Nursery to Grade 10, providing a comprehensive learning environment for students aged 3 to 16 years."
    },
    {
        question: "What is the admission process?",
        answer: "The admission process involves filling out an online application form, submitting required documents, attending an interview, and completing an entrance assessment. Click the 'Apply Now' button to start your application."
    },
    {
        question: "What are the school hours?",
        answer: "Our school operates from 8:00 AM to 3:30 PM from Sunday to Friday. We also offer extended day programs for working parents."
    },
    {
        question: "What curriculum does the school follow?",
        answer: "Merryland School follows the national curriculum prescribed by the Government of Nepal, integrated with modern teaching methodologies and international best practices."
    },
    {
        question: "Do you provide transportation services?",
        answer: "Yes, we provide safe and reliable bus transportation covering major areas of Kathmandu Valley. Our buses are equipped with GPS tracking and trained staff."
    },
    {
        question: "What extracurricular activities are available?",
        answer: "We offer a wide range of activities including sports (football, basketball, cricket), arts (music, dance, painting), technology clubs, debate teams, and community service programs."
    },
    {
        question: "What are the class sizes?",
        answer: "We maintain a student-teacher ratio of 1:20 to ensure personalized attention and effective learning for every student."
    },
    {
        question: "Are there scholarships available?",
        answer: "Yes, we offer merit-based and need-based scholarships to deserving students. Please contact our admissions office for detailed information on scholarship opportunities."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="container">
                <AnimatedSection className="section-header text-center">
                    <span className="section-badge">FAQ</span>
                    <h2>Frequently Asked Questions</h2>
                    <p>Find answers to common questions about Merryland School</p>
                </AnimatedSection>

                <div className="faq-container">
                    {faqData.map((faq, index) => (
                        <AnimatedSection
                            key={index}
                            delay={index * 50}
                            className="faq-item"
                        >
                            <button
                                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFAQ(index)}
                                itemProp="name"
                            >
                                <span>{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FiChevronDown />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="faq-answer-wrapper"
                                    >
                                        <div className="faq-answer" itemProp="text">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </AnimatedSection>
                    ))}
                </div>

                <div className="faq-cta">
                    <p>Still have questions?</p>
                    <a href="/contact" className="btn btn-primary">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}
