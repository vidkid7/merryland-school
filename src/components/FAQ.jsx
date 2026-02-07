import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedSection from './AnimatedSection';
import './FAQ.css';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const { t } = useTranslation();

    const faqData = [
        {
            question: t('faq.questions.q1.question'),
            answer: t('faq.questions.q1.answer')
        },
        {
            question: t('faq.questions.q2.question'),
            answer: t('faq.questions.q2.answer')
        },
        {
            question: t('faq.questions.q3.question'),
            answer: t('faq.questions.q3.answer')
        },
        {
            question: t('faq.questions.q4.question'),
            answer: t('faq.questions.q4.answer')
        },
        {
            question: t('faq.questions.q5.question'),
            answer: t('faq.questions.q5.answer')
        },
        {
            question: t('faq.questions.q6.question'),
            answer: t('faq.questions.q6.answer')
        },
        {
            question: t('faq.questions.q7.question'),
            answer: t('faq.questions.q7.answer')
        },
        {
            question: t('faq.questions.q8.question'),
            answer: t('faq.questions.q8.answer')
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="container">
                <AnimatedSection className="section-header text-center">
                    <span className="section-badge">{t('faq.badge')}</span>
                    <h2>{t('faq.title')}</h2>
                    <p>{t('faq.description')}</p>
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
                    <p>{t('faq.stillHaveQuestions')}</p>
                    <a href="/contact" className="btn btn-primary">
                        {t('faq.contactUs')}
                    </a>
                </div>
            </div>
        </section>
    );
}
