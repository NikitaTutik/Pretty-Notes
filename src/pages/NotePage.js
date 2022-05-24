import React, {useState, useEffect} from 'react'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].toString().replace(/^([\s]*)|([\s]*)$/g, ""); 
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let csrftoken = getCookie('csrftoken');

const NotePage = ({ match, history}) => {

    let noteId  = match.params.id;
    let [note, setNote] = useState(null)
    let userdata = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async ()=>{
        if (noteId === 'new') return  
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)

    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body:JSON.stringify(note)
        })

    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body:JSON.stringify(note)
        })
        history.push('/')

    }

    let createNote = async (getState) => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body:JSON.stringify(note),

        })
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === ''){
            deleteNote()
        }else if(noteId !== 'new'){
            updateNote()
        }else if(noteId === 'new' && note !== null){
            createNote()
        }
        history.push('/')
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                <ArrowLeft onClick={handleSubmit}/>
                </h3>
                { noteId !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
                ):(
                <button onClick={handleSubmit}> Done </button>
                )}
                            <h2>Author: {note?.author_name}</h2>
                
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}>
            </textarea>

        </div>
        
        
    )
}

export default NotePage;