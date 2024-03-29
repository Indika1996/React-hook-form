import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

type FormValues = {
    username: string
    email: string
    channel: string
}

const YoutubeForm = () => {

    const form = useForm<FormValues>()
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: FormValues) => {
        console.log('submited', data)
    }

    return (
        <div>
            <h1>YouTube Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register('username', {
                        required: {
                            value: true,
                            message: 'Username is required'
                        }
                    })} />
                    <p className='error'>{errors.username?.message}</p>


                </div>
                <div className='form-control'>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" {...register('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email format'
                        },
                        // validate: (feildValue) => {
                        //     return feildValue !== 'admin@gmail.com' || 'Enter a different email address'
                        // }
                        validate: {
                            notAdmin: (feildValue) => {
                                return feildValue !== 'admin@gmail.com' || 'Enter a different email address'
                            },
                            notBlackListed: (feildValue) => {
                                return !feildValue.endsWith('baddomain.com') || 'This domain is not Supported'
                            }
                        }
                    })} />
                    <p className='error'>{errors.email?.message}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" {...register('channel', {
                        required: {
                            value: true,
                            message: 'Channel is required'
                        }
                    })} />
                    <p className='error'>{errors.channel?.message}</p>
                </div>
                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default YoutubeForm