import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Todos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/todos',
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
    })

    function handleAddTodo(event) {
        event.preventDefault();
        const inputs = event.target.elements;

        axios.post('http://localhost:3001/api/v1/todos',
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

    return (
        <div className='flex flex-col items-center pb-10'>
            <h1 className='w-1/3 text-2xl text-center pb-2 mb-4 border-b-2 border-gray-300'>Todo List</h1>

            <div className='w-1/3 flex flex-col items-center '>
                <div className='w-full flex justify-center mb-2 border-b border-gray-200'>
                    <h1 className='w-1/2 text-center font-semibold'>Title</h1>
                    <h1 className='w-1/2 text-center font-semibold'>Description</h1>
                </div>

                {todos.map((todo, idx) => {
                    return (
                        <div key={idx} className='flex w-full justify-center items-center relative py-1 border-b border-gray-100'>
                            <div className='flex w-full'>
                                <span className='absolute left-0'>{idx + 1}</span>
                                <span className='w-1/2 text-center'>{todo.title}</span>
                                <p className='w-1/2 text-center'>{todo.description}</p>
                            </div>
                            <button className='ml-8 bg-gray-300 rounded-md px-1'>Edit</button>
                            <button className='ml-2 bg-red-400 rounded-md px-1'>Delete</button>
                        </div>
                    );
                })}

                <br />

                <form className='space-x-4' onSubmit={handleAddTodo}>
                    <input name='title' className='ml-2 border border-gray-500 rounded-md px-2' />
                    <input name='description' className='border border-gray-500 rounded-md px-2' />
                    <button className='px-2 bg-gray-300 border border-gray-600 rounded-lg'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Todos