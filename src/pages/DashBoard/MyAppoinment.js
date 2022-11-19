import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Shared/Spinner/Spinner';
import { Link } from 'react-router-dom';


const MyAppoinment = () => {
    const { user } = useContext(AuthContext)

    const url = `http://localhost:5000/booking?email=${user?.email}`

    const { data: booking = [], isLoading } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='mx-5'>
            <h2 className='text-2xl font-bold mb-5 mt-8'>My Appoinment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>TreatMent</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map((book, i) =>
                                <tr className="hover" key={i}>
                                    <th>{i + 1}</th>
                                    <td>{book.customer}</td>
                                    <td>{book.treatmentName}
                                    </td>
                                    <td>${book.price}
                                    </td>
                                    <td>{book.bookingDate}</td>
                                    <td>{book.slot}</td>
                                    <td>
                                        {
                                            book.price && !book.paid && <Link to={`/dashboard/payment/${book._id}`}>
                                                <button className='btn btn-accent btn-sm'>Pay Now</button></Link>
                                        }
                                        {
                                            book.price && book.paid && <span className='text-success font-bold'>Paid</span>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoinment;