import Gallery from 'react-grid-gallery';
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../actions/auth';
import NoteForm from "./NoteForm";
import { useStyles } from './utils'

function UserLibrary({ auth: { user }, loadUser }) {
    const [imagesList, setImageList] = useState([])
    const [newNotes, setNewNotes] = useState('')
    const [imgId, setImgId] = useState(0)
    const [modal, setModal] = useState(false)
    const [imgNotes, setImgNotes] = useState([])
    const [editId, setEditId] = useState('');

    // get user info
    let email = localStorage.getItem('email')
    if (user) {
        email = user.email
        localStorage.setItem('email', user.email);
    }

    // set gallary attribute
    function setData(data) {
        var tempList = [];
        data.forEach(function (entry) {
            var singObj = {}
            singObj['src'] = entry.img_src
            singObj['thumbnail'] = entry.img_src
            singObj['thumbnailWidth'] = 320
            singObj['thumbnailHeight'] = 320
            singObj['id'] = entry.id
            tempList.push(singObj)
        });
        setImageList(tempList)
    }

    // handle image's isSelected state
    function onSelectImage(index, image) {
        var images = this.state.images.slice();
        var img = images[index];
        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            images: images
        });
    }

    // handle delete image
    const handleDeleteImage = (event) => {
        event.preventDefault();
        let seletimageList = []
        imagesList.forEach(function (entry) {
            if (entry.hasOwnProperty("isSelected")) {
                var singObj = {}
                singObj['image_id'] = entry.id
                seletimageList.push(singObj)
            }
        });
        const imageDeleteList = { 'image': seletimageList }
        fetchPhoto();
        async function fetchPhoto() {
            const res = await fetch(
                `/api/library/${email}/images`, {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(imageDeleteList),
            });
            const data = await res.json();
            console.log(data)
        }
        window.location.reload();
    };

    // refresh the notes of the image
    const refreshNotes = (data) => {
        let curNotes = []
        if (data['notes'] !== undefined) {
            data['notes'].forEach(function(entry) {
                const content = {
                    'note': entry['note'],
                    'id': entry['_id'],
                }
                curNotes.push(content)
            })
            console.log(curNotes)
            setImgNotes(curNotes)
        }
    }

    // get notes of a image
    const getNotes = (id) => {
        fetchNotes();
        async function fetchNotes() {
            const res = await fetch(
                `/api/notes/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            refreshNotes(data)
        }
    }

    // handle delete note for image
    const handleDeleteNote = (id) => {
        fetchNotes();
        async function fetchNotes() {
            const res = await fetch(
                `/api/notes/${imgId}/edit/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            refreshNotes(data)
        }
    }

    // add notes for image
    const addNotes = (id) => {
        let curNotes = []
        if (imgNotes !== undefined) {
            imgNotes.forEach(function(note) {
                curNotes.push({"note" : note['note']})
            })
        }
        curNotes.push({"note" : newNotes})
        const content = {"id": id, "notes": curNotes}
        fetchNotes();
        async function fetchNotes() {
            const res = await fetch(
                `/api/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            const data = await res.json();
            refreshNotes(data)
        }
    }
    
    // handle input change
    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        setNewNotes(value)
    }
    
    // handle Add button
    const handleAdd = () => {
        setNewNotes(newNotes)
        addNotes(imgId)
        setImgId(0)
        setNewNotes('')
    }
    
    // open popup window
    const modalOpen = (id) => {
        const curId = imagesList[id].id
        setImgId(curId)
        const notes = getNotes(curId)
        setImgNotes(notes)
        setModal(true)
    }
    
    // open popup window
    const modalClose = () => {
        setNewNotes('')
        setImgNotes([])
        setModal(false)
    }

    // handle notes edit for image
    const editNotes = () => {
        console.log(newNotes)
        const content = {
            note: newNotes
        }
        fetchNotes();
        async function fetchNotes() {
            const res = await fetch(
                `/api/notes/${imgId}/edit/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            const data = await res.json();
            refreshNotes(data)
        }
        setNewNotes('')
    }
    
    // update edit note id
    const handleEditId = (id) => {
        setEditId(id)
        console.log(id)
    }

    const classes = useStyles();

    useEffect(() => {
        fetchPhoto();
        async function fetchPhoto() {
            const res = await fetch(
                `/api/library/${email} `
            );
            const data = await res.json();
            if (data[['image']]) {
                setData(data[['image']])
            } else {
                const postData = {
                    'email': email,
                    'image': []
                }
                postLibrary();
                async function postLibrary() {
                    const res = await fetch(
                        '/api/library', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(postData),
                    });
                }
            }
        }
    }, []);

    return (
        <div style={{ 
            backgroundImage: "url(https://www.nasa.gov/sites/default/files/thumbnails/image/21226354458_b0fbe5e680_o.jpeg)", 
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh',
          }}>
            <div style={{
                paddingTop: 50,
                paddingLeft: 200,
                paddingRight: 200,
                display: "block",
                overflow: "auto",
                minHeight: "1px",
                width: "100%",
            }}>
                {/* display images as a gallery */}
                <Gallery images={imagesList} onClickThumbnail={(e) => modalOpen(e)} onSelectImage={onSelectImage} />
            </div>

            {/* popup note form  */}
            <NoteForm show={modal} handleClose={modalClose} inputMsg={newNotes} 
                handleChange={handleChange} handleAdd={handleAdd} 
                notesContent={imgNotes} handleDeleteNote={handleDeleteNote}
                handleEdit={editNotes} handleEditId={handleEditId} />

            {/* delete seleted images  */}
            <button className={classes.button} onClick={handleDeleteImage}> Delete Image </button>
        </div>
    )
}
UserLibrary.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(UserLibrary);