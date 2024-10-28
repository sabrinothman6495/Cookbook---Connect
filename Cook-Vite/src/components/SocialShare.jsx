import React from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';

const SocialShare = ({ recipe }) => {
  const shareUrl = `${window.location.href}/${recipe.id}`;
  const title = `Check out this recipe: ${recipe.title}`;

  return (
    <div className="social-share">
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
};

export default SocialShare;