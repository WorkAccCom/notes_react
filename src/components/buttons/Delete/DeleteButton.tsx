import React, { useState } from 'react';
import { DeleteNoteModal } from '../../modals/Delete';
import { Note } from '../../../typedefs/Note';

interface Props {
  id: number,
  listRerenderQuery: (par: Note[] | null) => void,
}

export const DeleteButton: React.FC<Props> = ({
  id,
  listRerenderQuery,
}) => {

  const [deleteNoteModalRendered, setDeleteNoteModalRendered] = useState(false);
  const [noteForDeleteId, setNoteForDeleteId] = useState(-1);

  const askForNoteDelete = (noteId: number) => {
    setDeleteNoteModalRendered(true);

    if (noteForDeleteId) {
      setNoteForDeleteId(noteId);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          askForNoteDelete(id);
        }}
        className="Notes__note-delete"
      >
        Delete
      </button>
      <DeleteNoteModal
        isOpen={deleteNoteModalRendered}
        changeModalRenderStatus={setDeleteNoteModalRendered}
        noteForDeleteId={noteForDeleteId}
        listRerenderQuery={listRerenderQuery}
      />
    </>
  );
};