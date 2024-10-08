import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Todos() {
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);

    useEffect(() => {
        getTodos();
    }, [])

    function getTodos() {
        axios.get('/todos',
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access-token")
                }
            })
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleAddTodo(event) {
        event.preventDefault();
        const inputs = event.target.elements;

        axios.post('/todos',
            {
                title: inputs.title.value,
                description: inputs.description.value
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access-token")
                }
            })
            .then((response) => {
                setTodos([...todos, response.data]);
                event.target.reset()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleDeleteTodo(id) {
        axios.delete(`/todos/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access-token")
                }
            })
            .then((response) => {
                getTodos();

            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleEditTodo(event, id) {
        event.preventDefault();
        const inputs = event.target.elements;

        axios.patch(`/todos/${id}`,
            {
                title: inputs.title.value,
                description: inputs.description.value
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access-token")
                }
            })
            .then((response) => {
                setEditTodo(null);
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='flex flex-col items-center pb-10'>
            <h1 className='w-1/3 text-2xl text-center pb-2 mb-4 border-b-2 border-gray-300'>Todo List</h1>

            <div className='flex flex-col items-center '>
                <div className='w-full flex justify-center mb-2 border-b border-gray-200'>
                    <h1 className='w-2/5 text-center font-semibold'>Title</h1>
                    <h1 className='w-2/5 text-center font-semibold'>Description</h1>
                    <h1 className='w-1/5 text-center font-semibold'>Modify</h1>
                </div>

                {todos.map((todo, idx) => {
                    if (todo.id == editTodo) {
                        return (
                            <form key={idx} className='flex w-full space-x-4 relative' onSubmit={(event) => handleEditTodo(event, todo.id)}>
                                <span className='absolute left-0'>{idx + 1}</span>

                                <input name='title' defaultValue={todo.title} className='ml-2 border text-center border-gray-500 rounded-md px-2' />
                                <input name='description' defaultValue={todo.description} className='text-center border border-gray-500 rounded-md px-2' />
                                <button className='px-2 bg-gray-300 hover:bg-gray-200 border border-gray-600 rounded-lg'>
                                    Confirm
                                </button>
                            </form>
                        )
                    }
                    return (
                        <div key={idx} className='flex w-full justify-center items-center relative py-1 border-b border-gray-100'>
                            <div className='flex w-full justify-between'>
                                <span className='absolute -left-10'>{idx + 1}</span>
                                <span className=' w-44 text-center break-words'>{todo.title}</span>
                                <p className='ml-4 min-w-44 max-w-64 text-center break-words'>{todo.description}</p>
                                <div className=''>
                                    <button
                                        className='ml-4 bg-gray-300 rounded-md px-1'
                                        onClick={() => setEditTodo(todo.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='ml-1 bg-red-400 hover:bg-red-300 rounded-md px-1'
                                        onClick={() => { handleDeleteTodo(todo.id) }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <br />

                <form className='space-x-2' onSubmit={handleAddTodo}>
                    <input name='title' className='w-2/5 border border-gray-500 rounded-md px-2' />
                    <input name='description' className='w-2/5 border border-gray-500 rounded-md px-2' />
                    <button className=' px-2 bg-gray-300 hover:bg-gray-200 border border-gray-600 rounded-lg'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Todos