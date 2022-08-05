import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {

    //get user ID from redux store
    const userSignin = useSelector(state => state.userSignin)
    // from userSign in get the user info
    const { userInfo } = userSignin

    //GET USER DETAILS FROM REDUX STORE
    const userDetails = useSelector(state => state.userDetails)
    // from userDetails in get the user Details
    const { loading, error, user } = userDetails

    const dispatch = useDispatch()

    const submitHandler = (e)=> {
        e.preventDefault();
        //dispatch update profile
    }

    // dispatch user details action
    useEffect(() => {
        dispatch(detailsUser(userInfo._id))
    }, [dispatch, userInfo._id])
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div><h1>User Profile</h1></div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant='danger'>{error}</MessageBox>
                            :
                            <>
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <input id='name' type='text' placeholder="Enter name" defaultValue={user.name}></input>
                                </div>
                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <input id='email' type='email' placeholder="Enter email" defaultValue={user.email}></input>
                                </div>
                                <div>
                                    <label htmlFor='password'>Password</label>
                                    <input id='password' type='password' placeholder="Enter password" ></input>
                                </div>
                                <div>
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                    <input id='confirmPassword' type='new-password' placeholder="Confirm password"></input>
                                </div>
                                <div>
                                    <label />
                                    <button className='primary' type="submit">Update</button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}
