"use client";

import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon
  } from "react-share";

const ShareLink = () => {

   const currentPageURL = window.location.href

  return (
    <div className="flex gap-3 mt-1">
        {/* Email Button */}
        <EmailShareButton url="www.google.com" className="hover:scale-125">
            <EmailIcon round={true} size={46} bgStyle={{marginRight: 2}} />
        </EmailShareButton>

        {/* Facebook Button */}
        <FacebookShareButton url="www.google.com" className="hover:scale-125">
            <FacebookIcon round={true} size={46} />
        </FacebookShareButton>

        {/* Linked In Button */}
        <LinkedinShareButton url="www.google.com" className="hover:scale-125">
            <LinkedinIcon round={true} size={46} />
        </LinkedinShareButton>

        {/* Telegram Button */}
        <TelegramShareButton url="www.google.com" className="hover:scale-125">
            <TelegramIcon round={true} size={46} />
        </TelegramShareButton>

        {/* Twitter Button */}
        <TwitterShareButton url="www.google.com" className="hover:scale-125">
            <TwitterIcon round={true} size={46} />
        </TwitterShareButton>

        {/* Twitter Button */}
        <WhatsappShareButton url="www.google.com" className="hover:scale-125">
            <WhatsappIcon round={true} size={46} />
        </WhatsappShareButton>
    </div>
  )
}

export default ShareLink
