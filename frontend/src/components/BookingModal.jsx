// import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import axios from 'axios';
const BookingModal = ({ vehicle }) => {
    const { register, handleSubmit, errors } = useForm();
    const [total, setTotal] = useState(0);
    const dailyRate = 100;
    const onSubmit = data => {
        console.log(data);
        console.log(vehicle);
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotal(diffDays * dailyRate);
        // axios.post('/bookings', data)
        //     .then(response => {
        //         console.log('Success:', response.data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Start Date:
                    <input name="startDate" type="date" ref={register({ required: true })} />
                </label>
                <label>
                    End Date:
                    <input name="endDate" type="date" ref={register({ required: true })} />
                </label>
                <input type="submit" />
                {total > 0 && <p>Total Amount: {total}</p>}
            </form>
        </div>
    );
};

export default BookingModal;