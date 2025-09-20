import styles from './Contact.module.css';
import medal from '../../../public/images/medal.png';
import QA from '../QA/QA';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
function Contact() {
  return (
    <>
      <Header />
      <div className={styles.paddingGlobal}>
        <div className={styles.dayProduct}>
          <img src={medal} alt="" className={styles.medalImg} />
          <p>#1 Product of the Day</p>
        </div>
        <h1 className={styles.maxHeading}>
          Get in touch, let us know
          <br /> how we can help
        </h1>
        <div className={styles.contactUs}>
          <div className={styles.formRow}>
            <form className={styles.formWrapper}>
              <label className="formLabel">Your name</label>
              <input className={styles.formInput} placeholder="Your full name" required />
            </form>
            <form className={styles.formWrapper}>
              <label className="formLabel">Your last name</label>
              <input className={styles.formInput} placeholder="Your last name" required />
            </form>
          </div>
          <form className={styles.formWrapper}>
            <label className="formLabel">Your email</label>
            <input className={styles.formInput} placeholder="Your email" required />
          </form>
          <form className={styles.formWrapper}>
            <label className="formLabel">Phone number</label>
            <input className={styles.formInput} placeholder="Your phone numba" required />
          </form>
          <form className={styles.formWrapper}>
            <label className="formLabel">Message</label>
            <textarea
              className={`${styles.formInput} ${styles.messageInput}`}
              placeholder="Write something!"
              required
            />
          </form>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.infoWrapper}>
            <div className={styles.circle}>
              <img src="https://cdn.prod.website-files.com/689e106364c67d5b5a78fbf4/689fd6a41335dc081b12081c_icon-sms.svg" />
            </div>
            <div>
              <p>Email address</p>
              <p>adult@gmail.com</p>
            </div>
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.circle}>
              <img src="https://cdn.prod.website-files.com/689e106364c67d5b5a78fbf4/68ade2e2e7f470a842bf1af2_PhoneIcon.svg" />
            </div>
            <div>
              <p>Phone number</p>
              <p>8-800-555-35-35</p>
            </div>
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.circle}>
              <img src="https://cdn.prod.website-files.com/689e106364c67d5b5a78fbf4/68ade2e2cd1cce8916d0104b_LocationIcon.svg" />
            </div>
            <div>
              <p>Our location</p>
              <p>Astana, Kazakhstan</p>
            </div>
          </div>
        </div>
        <QA
          question="How Can I Access The Lumora Team Management Dashboard?"
          answer="You can add team members by inviting them via email or adding their details manually."
        ></QA>
        <QA
          question="Where Can I Find Help Using The Lumora Team Management Dashboard?"
          answer="You can add team members by inviting them via email or adding their details manually."
        ></QA>
        <QA
          question="How Do I Add Team Members To The Lumora Team Management Dashboard?"
          answer="You can add team members by inviting them via email or adding their details manually."
        ></QA>
        <QA question="What year did Jason Statham beat Godzilla?" answer="2020"></QA>
        <QA
          question="How Can I Upgrade To A Higher Plan?"
          answer="You can add team members by inviting them via email or adding their details manually."
        ></QA>
        <QA
          question="How Can I Contact The Lumora Support Team?"
          answer="You can add team members by inviting them via email or adding their details manually."
        ></QA>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
