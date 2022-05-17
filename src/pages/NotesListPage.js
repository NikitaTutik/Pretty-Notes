import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';


const NotesListPage = (props) => {

    NotesListPage.propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
      };

    let { isAuthenticated, user } = props.auth;

    let [notes, setNotes] = useState([])

    useEffect(()=> {
        getNotes()
    }, [])
    
    let getNotes = async (getState) => {
        let response = await fetch('/api/notes/')
        let data = await response.json()
        setNotes(data.results)
    }

    const authLinks = (
        
        <div className='auth' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <strong>{user ? `${user.username}` : ''}</strong>
        <div style={{ marginLeft: '.5rem', marginRight: '.5rem' }}></div>
        <button className='buttonlogout' onClick={props.logout} >
            Logout
        </button>
        </div> 
      );
  
      const guestLinks = (
        <div className='auth' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Link to="/register">Register</Link>
            <div style={{ marginLeft: '.5rem', marginRight: '.5rem' }}>or</div>
            <Link to="/login">Login</Link>
         </div> 

      );

  return (

      <div className='notes'>
        {isAuthenticated ? authLinks : guestLinks}
        <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes </h2>
            <p className='notes-title'>{notes.length}</p>
           
        </div>
        <div className="notes-list">
            {notes.map((note, index) => (
                <ListItem key={index} note={note}  />
            ))}
        </div>
        <AddButton />
      </div>
  )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps, { logout })(NotesListPage);