import React, { useState } from 'react';
import styles from './index.module.scss';

interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemove: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    onDone,
    onEdited,
    onRemove,
}) => {

    const [checked, setChecked] = useState(false);
    const [IsEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);

    return (
        <div className={styles.inputTask}>
            <label>
                {IsEditMode ?  (
                    <input
                        className={styles.inputTaskEditingInput}
                        type='text'
                        autoFocus={true}
                        value={value}
                        onChange={(event)=> {
                            setValue(event.target.value)
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                onEdited(id, value);
                                setIsEditMode(false)
                            }
                        }}
                        />
                ) : (
                    <>
                        <input
                            type='checkbox'
                            disabled={IsEditMode}
                            checked={checked}
                            className={styles.inputTaskCheckbox}
                            onChange={(event) => {
                                setChecked(event.target.checked);
                                if (event.target.checked) {
                                    setTimeout(() => {
                                        onDone(id);
                                    }, 500);
                                }
                            }}
                        />
                        <h3 className={styles.inputTaskTitle}>{title}</h3>
                    </>
                )}
            </label>

            { IsEditMode ? (
                <button
                    aria-label='Save'
                    className={styles.inputTaskButton}
                    onClick={() => {
                        onEdited(id, value);
                        setIsEditMode(false)
                    }}
                >✅</button>
            ) : (
                <button
                    aria-label='Edit'
                    className={styles.inputTaskButton}
                    onClick={() => {
                        setIsEditMode(true)
                    }}
                >✏️</button> 
            )}
            <button
                aria-label='Remove'
                className={styles.inputTaskButton}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemove(id);
                    }
                }}
            >🗑️</button>
        </div>
    )
}