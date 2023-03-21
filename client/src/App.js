import { useEffect, useState } from 'react';

import * as userService from './services/userService';

import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { UserList } from './components/UserList';

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
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        console.log(data)
        const createdUser = await userService.create(data);

        setUsers(state => [...state, createdUser]);
    };

    const onUserUpdateSubmit = async (e, userId) => {	
        e.preventDefault();	
        const formData = new FormData(e.currentTarget);	
        const data = Object.fromEntries(formData);	
        const updatedUser = await userService.update(userId, data);	
        setUsers(state => state.map(x => x._id === userId ? updatedUser : x));
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
                    />
                    
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;
