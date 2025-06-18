import React, { useState } from "react";
import logo1 from '../../Assets/car1.png';
import logo2 from '../../Assets/car2.png';
import logo3 from '../../Assets/car3.png';
import logo4 from '../../Assets/car4.png';
import logo5 from '../../Assets/car5.png';

const Crud = () => {
    const [car, setCar] = useState([
        { id: "AQ1", image: logo1, title: "Audi", price: 2000, qty: 3 },
        { id: "AQ2", image: logo2, title: "Bmw", price: 3000, qty: 1 },
        { id: "AQ3", image: logo3, title: "Polo", price: 4000, qty: 5 },
        { id: "AQ4", image: logo4, title: "Copper", price: 5000, qty: 6 },
        { id: "AQ5", image: logo5, title: "porche", price: 6000, qty: 8 },
    ]);

    const incQty = (id) => {
        setCar((pvrCars) =>
            pvrCars.map((car) =>
                car.id === id ? { ...car, qty: car.qty + 1 } : car
            )
        );
    };

    const decQty = (id) => {
        setCar((pvrCars) =>
            pvrCars.map((car) =>
                car.id === id ? { ...car, qty: car.qty - 1 > 0 ? car.qty - 1 : 0 } : car
            )
        );
    };

    const delCar = (id) => {
        setCar((pvrCars) => pvrCars.filter((car) => car.id !== id));
    };

    const GrandTotal = (filterData) => {
        return filterData.reduce((total, car) => total + car.qty * car.price, 0);
    };

    const [Search, setSearch] = useState('');
    const filterData = car.filter((s) =>
        s.title.toLowerCase().includes(Search.toLowerCase())
    );

    const [newCar, setnewCar] = useState({
        title: "", image: '', price: '', qty: ''
    });

    const updateCar = (e) => {
        e.preventDefault();
        const newCarData = {
            ...newCar,
            id: "AQ" + (car.length + 1),
            price: parseFloat(newCar.price),
            qty: parseInt(newCar.qty),
        };
        setCar([...car, newCarData]);
        setnewCar({
            title: "", image: '', price: '', qty: ''
        });
    };

    const [Edit, setEdit] = useState(null);

    const saveChange = (e) => {
    e.preventDefault();
    const updatedEdit = {
        ...Edit,
        price: parseFloat(Edit.price),
        qty: parseInt(Edit.qty),
    };
    setCar((pvrCars) => pvrCars.map(car => car.id === Edit.id ? updatedEdit : car));
    setEdit(null);
};

    return (
        <>
            <h1 className="text-primary">Crud Application</h1>
            <input
                className="form form-control mt-4 p-2"
                placeholder="Search"
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add
            </button>

            {/* Add Car Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Car</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={updateCar}>
                                <div>
                                    <label>Title
                                        <input
                                            className="form form-control"
                                            value={newCar.title}
                                            onChange={(e) => setnewCar({ ...newCar, title: e.target.value })}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>Image URL
                                        <input
                                            className="form form-control"
                                            value={newCar.image}
                                            onChange={(e) => setnewCar({ ...newCar, image: e.target.value })}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>Price
                                        <input
                                            className="form form-control"
                                            value={newCar.price}
                                            onChange={(e) => setnewCar({ ...newCar, price: e.target.value })}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>Qty
                                        <input
                                            className="form form-control"
                                            value={newCar.qty}
                                            onChange={(e) => setnewCar({ ...newCar, qty: e.target.value })}
                                        />
                                    </label>
                                </div>
                                <button className="btn btn-success mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Car Form */}
            {Edit && (
                <form onSubmit={saveChange} className="mt-4">
                    <h3>Edit Car</h3>
                    <input
                        className="form-control mt-2"
                        value={Edit.title}
                        onChange={(e) => setEdit({ ...Edit, title: e.target.value })}
                    />
                    <input
                        className="form-control mt-2"
                        value={Edit.price}
                        onChange={(e) => setEdit({ ...Edit, price: e.target.value })}
                    />
                    <input
                        className="form-control mt-2"
                        value={Edit.qty}
                        onChange={(e) => setEdit({ ...Edit, qty: e.target.value })}
                    />
                    <button className="btn btn-primary mt-2">Save Changes</button>
                </form>
            )}

            <table className="table table-hover text-center table-stripped mt-4">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><img src={item.image} width={30} height={30} alt="#" /></td>
                            <td>{item.title}</td>
                            <td>&#8377;{(item.price).toFixed(2)}</td>
                            <td>
                                <i className="fa-solid fa-minus" onClick={() => decQty(item.id)}></i>
                                {item.qty}
                                <i className="fa-solid fa-plus" onClick={() => incQty(item.id)}></i>
                            </td>
                            <td>&#8377;{(item.price * item.qty).toFixed(2)}</td>
                            <td>
                                <i className="fa-solid fa-pen-to-square text-primary m-1" onClick={() => setEdit(item)}></i>
                                <i className="fa-solid fa-trash text-danger" onClick={() => delCar(item.id)}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}></td>
                        <td>Grand Total</td>
                        <td>&#8377;{GrandTotal(filterData).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default Crud;
