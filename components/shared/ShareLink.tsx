"use client";

import { IEvent } from "@/lib/database/models/event.model";
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon
  } from "react-share";

const ShareLink = ({event} : {event : IEvent}) => {
 
   
  const currentPageURL = window.location.href

  return (
    <div className="sm:flex  sm:gap-3 mt-[6px] ">
        <div className="flex sm:gap-3 gap-14">
            {/* Email Button */}
            <EmailShareButton url={currentPageURL} 
                className="hover:scale-125"
                subject={`Join Me at ${event.eventTitle}!`}
                body=
                {`Hi All,

                I hope you're all doing well! I wanted to let you all know that I'll be attending ${event.eventTitle} and I'd love for you to join me. It's going to be an amazing event with lots of exciting activities, and it wouldn't be the same without you!
                
                Let's make some fantastic memories together. Looking forward to seeing you there!


                Get your tickets here: `}
            >
                <EmailIcon round={true} size={48} bgStyle={{fill: "#3EE7A1"}} />
            </EmailShareButton>

            {/* Twitter Button */}
            <TwitterShareButton url={`${'\n'} ${'\n'} ${currentPageURL} ${'\n'} ${'\n'}`} 
                className="hover:scale-125" 
                hashtags={['ExcitingEvent',"JoinMe", "DontMissOut", "EventHub"]}
                title={`🎉 Excited to attend ${event.eventTitle}! Join me and let's have an amazing time together! Don't miss out, get your tickets now! ${' '}`}
            >
                <TwitterIcon round={true} size={46}  />
            </TwitterShareButton>

            {/* Telegram Button */}
            <TelegramShareButton url={currentPageURL} 
                className="hover:scale-125"
                title={`Guess what? I'm attending ${event.eventTitle} and I think you should too! 🎉 It's going to be an epic event with lots of fun and excitement. Grab your tickets with this link. Let's enjoy it together!`}
            >
                <TelegramIcon round={true} size={46}  />
            </TelegramShareButton>
        </div>


        <div className="flex sm:gap-3 gap-14 mt-4 sm:mt-0">
            {/* Facebook Button */}
            <FacebookShareButton url={currentPageURL}
                className="hover:scale-125"
            >
                <FacebookIcon round={true} size={46}  />
            </FacebookShareButton>

            {/* Linked In Button */}
            <LinkedinShareButton url={currentPageURL} className="hover:scale-125">
                <LinkedinIcon round={true} size={46}  />
            </LinkedinShareButton>

            {/* WhatsApp Button */}
            <WhatsappShareButton url={currentPageURL}
                className="hover:scale-125"
                title={`Hey! I'm going to ${event.eventTitle} and I'd love for you to come along! It's going to be a blast! 🎉 Can't wait to see you there! 🥳 ${'\n\n'}Grab your tickets here:${'\n'}`}
            >
                <WhatsappIcon round={true} size={46}  />
            </WhatsappShareButton>
        </div>
    </div>
  )
}

export default ShareLink
