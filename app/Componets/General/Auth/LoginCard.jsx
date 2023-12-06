'use client'

import { checkLoggedinUser, logIn, loginWith } from '@/app/myCodes/Auth';
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { MailCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineCloseCircle, AiOutlineFacebook, AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';
import RegisterCard from './RegisterCard';




function LoginCard({ toggleLogin }) {
  const [isVisible, setIsVisible] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleRegister = () => setOpenRegister(!openRegister)
  const [credentials, setCredentials] = useState({ password: '', email: '' })

  const signIn = async (provider) => {

    switch (provider) {
      case 'google':
        await loginWith('google').then(() => {
          toggleLogin()
          return
        })
        break;

      case 'facebook':
        await loginWith('facebook').then(() => {
          toggleLogin()
          return
        })
        break;

      default:
        await logIn(credentials.email, credentials.password).then(() => {
          checkLoggedinUser()
          toggleLogin()

        })
        break;
    }
  }





  return (
    <div className='fixed z-[99999]  top-20  md:scale-100 scale-110 m-auto'>
      <Card className='w-64 border h-auto p-4 fadeInUp' variant="bordered">
        <div className='gap-1 mb-4 w-full center'>
          <Button onClick={() => {
            signIn("google")
          }} className='p-0 bg-black-800 text-white'><AiOutlineGoogle size={32} /></Button>
          <Button onClick={() => {
            signIn("facebook")
          }} className='p-0 bg-black-800 text-white'><AiOutlineFacebook size={32} /></Button>
          <Button onClick={() => {
            signIn("github")
          }} className='p-0 bg-black-800 text-white'><AiOutlineGithub size={32} /></Button>
        </div>



        <Input

          onChange={({ target }) => { setCredentials(prvState => ({ ...prvState, email: target.value })) }}
          className='w-full'
          type="email"
          label="Email"
          labelPlacement={'inside'}
          endContent={<MailCheckIcon />}
        />
        <Spacer y={2} />
        <Input
          onChange={({ target }) => { setCredentials(prvState => ({ ...prvState, password: target.value })) }}
          label="Password"
          placeholder="Enter your password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />

        <br />
        <Button onPress={signIn} className='w-1/2 m-auto font-bold text-white bg-black-800'>Login</Button>
        <div className='center gap-0.5 font-light'>
          <span className='text-xs'>Don't have an account? click</span><button onClick={toggleRegister} className='text-xs text-blue-600 font-bold'>here</button>
        </div>
        <div className='center gap-0.5 font-light'>
          <span className='text-xs'>Forgot Password? click</span><button className='text-xs text-blue-600 font-bold'>here</button>
        </div>
      </Card>

      {openRegister && <RegisterCard toggleRegister={toggleRegister} />}
      <div className='center mt-2 fadeInBottom'>
        <Button onPress={toggleLogin} className='m-auto min-w-0'><AiOutlineCloseCircle size={32} /></Button>
      </div>
    </div>
  )
}

export default LoginCard