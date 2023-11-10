import React from 'react';
import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus/index';
import { InputTask } from '../components/InputTask';
import styles from './index.module.scss';

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore((state) => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>📋💅Your bibmo todo list💅📋</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                        if (title) {
                            createTask(title)
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>
                        List is empty🗿
                    </p>
                )}

                {tasks.map((task) => (
                    <InputTask 
                        key={task.id}
                        title={task.title}
                        id={task.id}
                        onDone={removeTask}
                        onEdited={updateTask}
                        onRemove={removeTask}
                    />
                ) )}
                

                
            </section>
        </article>
    )
};