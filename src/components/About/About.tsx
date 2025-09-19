import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Target,
  Lightbulb,
  Book,
  Settings,
  Link,
  Shield,
  Plus,
  Minus,
  Lightbulb as BulbIcon,
  Zap,
  Cog,
  Globe,
} from 'lucide-react';
import styles from './About.module.css';

const About: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [visibleTimeline, setVisibleTimeline] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const faqData = [
    {
      question: 'How Can I Access The Lumora Team Management Dashboard?',
      answer:
        'You can add team members by inviting them via email or adding their details manually.',
    },
    {
      question: 'Where Can I Find Help Using The Lumora Team Management Dashboard?',
      answer:
        'You can add team members by inviting them via email or adding their details manually.',
    },
    {
      question: 'How Do I Add Team Members To The Lumora Team Management Dashboard?',
      answer:
        'You can add team members by inviting them via email or adding their details manually.',
    },
    {
      question: 'How Can I Upgrade To A Higher Plan?',
      answer:
        'You can add team members by inviting them via email or adding their details manually.',
    },
    {
      question: 'How Can I Contact The Lumora Support Team?',
      answer:
        'You can add team members by inviting them via email or adding their details manually.',
    },
  ];

  const timelineData = [
    {
      year: '2018',
      month: 'December',
      title: 'The Spark of Innovation',
      description:
        'Lumora was envisioned as a solution to redefine team management and bridge gaps in workflow coordination. A bold idea was born to empower businesses with smarter tools',
      icon: BulbIcon,
      active: true,
    },
    {
      year: '2019',
      month: 'October',
      title: 'Beta Launch',
      description:
        'Lumora was envisioned as a solution to redefine team management and bridge gaps in workflow coordination. A bold idea was born to empower businesses with smarter tools',
      icon: Zap,
      active: true,
    },
    {
      year: '2020',
      month: 'September',
      title: 'Revolutionizing with Automation',
      description:
        'Lumora was envisioned as a solution to redefine team management and bridge gaps in workflow coordination. A bold idea was born to empower businesses with smarter tools',
      icon: Cog,
      active: false,
    },
    {
      year: '2022',
      month: 'December',
      title: 'The Spark of Innovation',
      description:
        'Lumora was envisioned as a solution to redefine team management and bridge gaps in workflow coordination. A bold idea was born to empower businesses with smarter tools',
      icon: Globe,
      active: false,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineItems = timelineRef.current.querySelectorAll(`.${styles.timelineItem}`);
      const newVisible: number[] = [];

      timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;

        if (isVisible) {
          newVisible.push(index);
        }
      });

      setVisibleTimeline(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <section className={styles.about}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutMainContent}>
            <div className={styles.aboutBadge}>
              <span className={styles.badgeIcon}>🏠</span>
              <span className={styles.badgeText}>About Us</span>
            </div>

            <h1 className={styles.aboutHeading}>Empowering Teams, One Task at a Time, Every Day</h1>

            <p className={styles.aboutDescription}>
              Lumora was created to meet the need for a fast, intuitive, and flexible task
              management platform that helps teams achieve maximum productivity.
            </p>

            <div className={styles.aboutActions}>
              <button className={styles.primaryBtn}>
                Start Now For Free
                <ArrowRight size={20} />
              </button>

              <button className={styles.secondaryBtn}>Talk to sales</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.aboutContainer}>
          <div className={styles.storyContent}>
            <div className={styles.storyLeft}>
              <p className={styles.storyTagline}>Effortless Task Automation</p>
              <h2 className={styles.storyHeading}>
                Unlock Productivity with Smart Automation Tools
              </h2>
              <div className={styles.storyDescription}>
                <p>
                  As we automated processes, built workflows, and expanded our community beyond what
                  we imagined, Mondai work as naturally came to life through that journey.
                </p>
                <p>
                  On February 8th, 2021, Mondai marked a new chapter by going public on Nasdaq,
                  today, we keep growing as a multi-product company.
                </p>
              </div>

              <div className={styles.storySubsection}>
                <p className={styles.substoryTagline}>Our story</p>
                <h3 className={styles.substoryHeading}>From Concept to Global Impact</h3>
              </div>
            </div>

            <div className={styles.storyRight}>
              <div className={styles.timeline} ref={timelineRef}>
                {timelineData.map((item, index) => {
                  const IconComponent = item.icon;
                  const isVisible = visibleTimeline.includes(index);

                  return (
                    <div
                      key={index}
                      className={`${styles.timelineItem} ${
                        isVisible ? styles.timelineItemVisible : ''
                      }`}
                    >
                      <div className={styles.timelineDate}>
                        <span className={styles.timelineYear}>{item.year}</span>
                        <span className={styles.timelineMonth}>{item.month}</span>
                      </div>

                      <div className={styles.timelineContent}>
                        <h4 className={styles.timelineTitle}>{item.title}</h4>
                        <p className={styles.timelineDescription}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.valuesHeader}>
            <p className={styles.valuesTagline}>Our principles and values</p>
            <h2 className={styles.valuesHeading}>Guiding Values for Exceptional Service</h2>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Target size={24} />
              </div>
              <h3 className={styles.valueTitle}>Customer-Centricity</h3>
              <p className={styles.valueDescription}>
                Centralize all your marketing activities and projects in one powerful platform.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Lightbulb size={24} />
              </div>
              <h3 className={styles.valueTitle}>Trailblazing Innovation</h3>
              <p className={styles.valueDescription}>
                Drive forward with innovation to remain competitive in a fast-paced market.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Book size={24} />
              </div>
              <h3 className={styles.valueTitle}>Open Book</h3>
              <p className={styles.valueDescription}>
                Encourage transparency at every level to build lasting trust with clients and teams.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Settings size={24} />
              </div>
              <h3 className={styles.valueTitle}>Effortless Efficiency</h3>
              <p className={styles.valueDescription}>
                Simplify and streamline processes for smoother and more efficient work flows.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Link size={24} />
              </div>
              <h3 className={styles.valueTitle}>Seamless Connection</h3>
              <p className={styles.valueDescription}>
                Easily integrate systems to connect all facets of your business operations.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Shield size={24} />
              </div>
              <h3 className={styles.valueTitle}>Rock-Solid Reliability</h3>
              <p className={styles.valueDescription}>
                Provide consistent and dependable service that your clients can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.faqHeader}>
            <p className={styles.faqTagline}>Frequently Answer Questions</p>
            <h2 className={styles.faqHeading}>Getting Started Your Essential Questions Answered</h2>
          </div>

          <div className={styles.faqContainer}>
            {faqData.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <div className={styles.faqIcon}>
                    {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <div
                  className={`${styles.faqAnswer} ${openFaq === index ? styles.faqAnswerOpen : ''}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
