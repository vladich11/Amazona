import React, { useState } from 'react'
import{ Link} from 'react-router-dom';



export default function SigninScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sumbitHandler = (e) => {
        // When user click on sign in button this form woill not refresh(use ajc req instead)
        e.preventDefualt();
        //TODO : sign in action
    }
    return (
        <div>
            <form className='form' onSubmit={sumbitHandler}>
                <div>
                    <h1>Signin</h1>
                </div>
                <div>
                    <label htmlFor='email'>Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter email'
                        required
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='password'>Email address</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter password'
                        required
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? {' '}
                        <Link to='/register'>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
