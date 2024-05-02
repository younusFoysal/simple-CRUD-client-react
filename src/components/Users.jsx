
import {Link, useLoaderData} from "react-router-dom";
import {useState} from "react";

const Users = () => {

    const loadedusers = useLoaderData();
    const [users, setUsers] = useState(loadedusers)

    const handleDelete = _id => {
        console.log('Delete id:', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0){
                    alert('Deleted successfully')
                    const remaining = users.filter(user => user._id !== _id );
                    setUsers(remaining)
                }
            })


    }

    return (
        <div>
            <h2>Users: {users.length}</h2>
            {
                users.map(user => <p key={user._id}>
                    {user.name}, {user.email}, {user._id}

                    <Link to={`/update/${user._id}`}>
                        <button>Update</button>
                    </Link>

                    

                    <button
                    onClick={() => handleDelete(user._id)}
                    > X </button>

                </p>)
            }
        </div>
    );
};

export default Users;