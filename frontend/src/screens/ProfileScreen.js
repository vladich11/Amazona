import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // get user updated info from redux store
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    // Rename error to errorUpdate, rename loading to loadingUpdate
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile

    // Get user ID from redux store
    const userSignin = useSelector(state => state.userSignin)

    // from userSign in get the user info
    const { userInfo } = userSignin

    // Get user details from redux store
    const userDetails = useSelector(state => state.userDetails)
    // From userDetails in get the user details
    const { loading, error, user } = userDetails

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch update profile
        if (password !== confirmPassword) {
            alert('password and Confirm Password do not Match!')
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
        }
    }

    // Dispatch user details action
    // Reset succesUpdate when we open the screen for the second time
    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))
        } else {
            // Fill variables with data from BE
            setName(user.name)
            setEmail(user.email)
        }

    }, [dispatch, userInfo._id, user])
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
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                                {successUpdate && <MessageBox variant='success'>Profile Updated Successfully</MessageBox>}
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <input id='name' type='text' placeholder="Enter name" defaultValue={name} onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <input id='email' type='email' placeholder="Enter email" defaultValue={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div>
                                    <label htmlFor='password'>Password</label>
                                    <input id='password' type='password' placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div>
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                    <input id='confirmPassword' type='password' placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
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
