import { useEffect, useState } from 'react';

import * as userService from './services/userService';

import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { UserList } from './components/UserList';
import { Pagination } from './components/Pagination';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll()
            .then(setUsers)
            .catch(error => {
                console.log("Error" + error);
            });
    }, []);

    const onUserCreateSubmit = async(e) => {
        //stop automatic submit
        e.preventDefault();
        //take form data from DOM tree
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        
        //send ajax request to server
        const createdUser = await userService.create(data);

        //add new user to the state
        setUsers(state => [...state, createdUser]);

    };

    const onUserUpdateSubmit = async (e, userId) => {	
        e.preventDefault();	
        const formData = new FormData(e.currentTarget);	
        const data = Object.fromEntries(formData);	
        const updatedUser = await userService.update(userId, data);	
        setUsers(state => state.map(x => x?._id === userId ? updatedUser : x));
    };

    const onUserDelete = async(userId) => {
        //delete from server
        await userService.deleteUser(userId);
        //delete from state
        setUsers(state => state.filter(x => x?._id !== userId));
    };

    return (
        <>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList 
                        users={users} 
                        onUserCreateSubmit={onUserCreateSubmit}
                        onUserUpdateSubmit={onUserUpdateSubmit}
                        onUserDelete={onUserDelete}
                    />
                    
                </section>
                 <Pagination /> 
            </main>
            <Footer />
        </>
    );
}

export default App;
