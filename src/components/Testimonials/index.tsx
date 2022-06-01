import React, {useState} from 'react';
import styles from "@site/src/components/Testimonials/index.module.css";
import chrisDixon from "@site/static/img/testimonials/chrisDixon.png"
import benPerszyk from "@site/static/img/testimonials/benPerszyk.png"
import janCamenisch from "@site/static/img/testimonials/janCamenisch.png"
import an3ekah from "@site/static/img/testimonials/An3ekah.jpeg"
import {useSwipeable} from "react-swipeable";
import config from "@generated/docusaurus.config";

const testimonials = [
    {
        testimonial: "When you look back on every decade in tech, there’s one thing that really dominated. I think [the Internet Computer] will be the one in this next decade... I think you should take a hard look at this space. Because we’re not only changing the platform on what you build, but we’re changing what you can build. It’s a new kind of platform.",
        name: "Chris Dixon",
        position: "General Partner at Andreessen Horowitz (a16z)",
        twitterHandle: "",
        portrait: chrisDixon
    },
    {
        testimonial: "maybe an unpopular opinion but i’m so long term bullish on the IC. one of the few L1s trying to be something more than “the most defi optimized chain”. still early days, but the IC could conceivably become an essential part of the web3 stack over the next few yrs",
        name: "Ben Perszyk",
        position: "Partner at Polychain",
        twitterHandle: "@BenPerszyk",
        portrait: benPerszyk
    },
    /*    {
            testimonial: "The #icp just created the subnet that will host then first service nervous systems (SNS) which are an essential ingredient to defi on the #icp",
            name: "Jan Camenisch",
            position: "CTO DFINITY Foundation, Cryptographer",
            twitterHandle: "@JanCamenisch",
            portrait: janCamenisch
        },*/
    {
        testimonial: "The IC is one of the main reasons I chose to launch my web 3.0 career. The community and technology are forward thinking, and the blockchain platform has all I need to expand my music career, including my fave — Canistore. Most importantly, I am able to participate in governance, which allows all to have a say in the future direction of platform. In my opinion, the IC is going to play a pivotal role in the evolution of blockchain technology.",
        name: "An3ekah",
        position: "Singer, Songwriter",
        twitterHandle: "@An3ekah",
        portrait: an3ekah
    }
]

function Testimonials() {

    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const nextTestimonial = () => {
        if (testimonialIndex + 1 < testimonials.length) {
            setTestimonialIndex(testimonialIndex + 1);
        } else setTestimonialIndex(0);

    }
    const prevTestimonial = () => {
        if (testimonialIndex - 1 >= 0) {
            setTestimonialIndex(testimonialIndex - 1);
        } else setTestimonialIndex(testimonials.length - 1);
    }
    const handlers = useSwipeable({
        onSwipedLeft: () => prevTestimonial(),
        onSwipedRight: () => nextTestimonial(),
        ...config,
    });
    return (
        <div className={styles.main}>
            <div {...handlers} style={{touchAction: 'pan-y'}} className={styles.container}>
                <a id="testimonials"/>
                <svg className={styles.BGShape1} viewBox="0 0 773 643" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.65046e-05 225.435C5.20259e-05 47.8928 273.206 0.0612357 450.748 0.0612512C628.291 0.0612667 772.218 143.988 772.218 321.531C772.218 499.073 628.291 643 450.748 643C273.206 643 2.09834e-05 402.978 3.65046e-05 225.435Z"
                        fill="#3C01BA"/>
                </svg>
                <svg className={styles.BGShape2} viewBox="0 0 1291 1058" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M37.4457 778.892C-113.369 526.863 233.828 226.888 485.857 76.0737C737.886 -74.7407 1064.46 7.31003 1215.27 259.339C1366.08 511.369 1284.03 837.938 1032 988.752C779.975 1139.57 188.26 1030.92 37.4457 778.892Z"
                        fill="white"/>
                </svg>

                <p className={styles.title}>Who's talking about the Internet Computer</p>
                <div className={styles.bodyContainer}>
                    <span className={styles.body}>
                        <span className={styles.quotes}>“</span>{testimonials[testimonialIndex].testimonial}
                        <span className={styles.quotes}>”</span></span>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.buttonsContainer}>
                        <div className={styles.prevButton} onClick={prevTestimonial}/>
                        <div className={styles.nextButton} onClick={nextTestimonial}/>
                    </div>
                    <img className={styles.portrait} src={testimonials[testimonialIndex].portrait} alt=""/>
                    <div className={styles.details}>
                        <p className={styles.name}>{testimonials[testimonialIndex].name}</p>
                        <p className={styles.position}>{testimonials[testimonialIndex].position}</p>
                        {testimonials[testimonialIndex].twitterHandle !== "" &&
                            <div className={styles.twitterHandle}>
                                <div className={styles.twitterIcon}/>
                                {testimonials[testimonialIndex].twitterHandle}
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.testimonialIndexIndicator}>{testimonials.map((_testimonial, index) => {
                    return (
                        index === testimonialIndex ?
                            <div className={styles.currentTestimonial}/> :
                            <div className={styles.notCurrentTestimonial}/>)
                })}</div>

            </div>
        </div>
    );
}

export default Testimonials;
