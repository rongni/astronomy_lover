import React from "react";
import { Card, List } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useStyles } from './utils'

function NoteForm ({ handleClose, show, inputMsg, 
  handleChange, handleAdd, notesContent, 
  handleDeleteNote, handleEdit,
  handleEditId }) {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
  const classes = useStyles();
  return (
    <>
    <div className={showHideClassName}>
      <div className="modal-container">
        <h2> Notes </h2>
        {/* display notes as a list  */}
        <List>
        {notesContent && notesContent.map(note => (
          <Card key={note['id']}>
              <CardContent>
                {note['note']}
                {/* edit button  */}
                <Button style={ {alignItems: 'flex-end'} } onClick={() => handleEditId(note['id'])} > O </Button>
                {/* delete button  */}
                <Button style={ {alignItems: 'flex-end'} } onClick={() => handleDeleteNote(note['id'])} > X </Button>
              </CardContent>
          </Card>
        ))}
        </List>

        {/* input text editor  */}
        <div className="form-group">
            <input
            type="text"
            value={inputMsg}
            name="modalInputName"
            onChange={handleChange}
            className="form-control"
            />
        </div>
        <button className={classes.button} onClick={handleAdd}> Add </button>
        <button className={classes.button} onClick={handleEdit}> Edit </button>
        <button className={classes.button} onClick={handleClose}> Close </button>
      </div>
    </div>
    </>
  );
};

export default NoteForm;
