// LinkCard.jsx
import PropTypes from 'prop-types';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>

      <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>From where: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Number of clicks on the link: <strong>{link.clicks}</strong></p>
      <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}

// вefine PropTypes to validate 'link' prop
LinkCard.propTypes = {
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    clicks: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
