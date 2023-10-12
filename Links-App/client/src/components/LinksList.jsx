// LinksList.jsx
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links yet</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Original</th>
        <th>Shortened</th>
        <th>Open</th>
      </tr>
      </thead>

      <tbody>
      { links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}

// define PropTypes for 'links' prop
LinksList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, 
      from: PropTypes.string.isRequired, 
      to: PropTypes.string.isRequired, 
    })
  ).isRequired,
};
