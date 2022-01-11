import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';

import { deleteNote } from '../../../data-processing/deleteNote';

import { Note } from '../../../typedefs/Note';

interface Props {
  isOpen: boolean,
  changeModalRenderStatus: (par: boolean) => void,
  noteForDeleteId?: number,
  listRerenderQuery?: (par: Note[] | null) => void,
  buttonName: string,
  functionOnConfirmation: (par?: any, par2?: any, par3?: any) => void,
}

export const ConfirmationModal: React.FC<Props> = ({
  isOpen,
  changeModalRenderStatus,
  noteForDeleteId = -1,
  listRerenderQuery,
  buttonName,
  functionOnConfirmation,
}) => {
  const history = useHistory();

  const handleClickOnYesButton = () => {
    switch (buttonName) {
      case 'delete': {
        deleteNote(
          noteForDeleteId,
          changeModalRenderStatus,
          listRerenderQuery,
        );
        break;
      }

      case 'save': {
        if (functionOnConfirmation) {
          functionOnConfirmation();
        }

        break;
      }

      default:
        break;
    }

    history.push('/');
  };

  const titleSelect = (name: string): string => {
    const titleStart = 'Are you sure want to';

    switch (name) {
      case 'delete':
        return `${titleStart} delete this note?`;

      case 'save':
        return `${titleStart} save this note?`;

      case 'cancel':
        return `${titleStart} cancel editing?`;

      default:
        return '';
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      shouldCloseOnEsc
      onRequestClose={() => {
        changeModalRenderStatus(false);
      }}
    >
      <h2>{titleSelect(buttonName)}</h2>
      <button
        type="button"
        onClick={handleClickOnYesButton}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => changeModalRenderStatus(false)}
      >
        No
      </button>
    </ReactModal>
  );
};