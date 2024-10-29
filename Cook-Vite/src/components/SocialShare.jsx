import React from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import PropTypes from 'prop-types';

const SocialShare = ({ recipe }) => {
  const shareUrl = `${window.location.origin}/recipe/${recipe.id}`;
  const title = `Check out this recipe: ${recipe.title}`;

  return (
    <div className="social-share">
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
};

SocialShare.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SocialShare;