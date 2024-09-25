import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        profilePic: null,
        education: '',
        password: '',
        confirmPassword: ''
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editIndex, setEditIndex] = useState(-1); 

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'profilePic' ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const profilePicUrl = formData.profilePic
            ? URL.createObjectURL(formData.profilePic) 
            : submittedData[editIndex]?.profilePic || null; 

        const updatedFormData = {
            ...formData,
            profilePic: profilePicUrl
        };

        if (editIndex >= 0) {
            
            const updatedData = [...submittedData];
            updatedData[editIndex] = updatedFormData;
            setSubmittedData(updatedData);
            setEditIndex(-1); 
        } else {
            
            setSubmittedData([...submittedData, updatedFormData]);
        }

        alert('Form submitted!');
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            dateOfBirth: '',
            gender: '',
            profilePic: null,
            education: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleEdit = (index) => {
        const dataToEdit = submittedData[index];
        setFormData({
            ...dataToEdit,
            profilePic: null 
        });
        setEditIndex(index); 
    };

    const handleDelete = (index) => {
        const updatedData = submittedData.filter((_, i) => i !== index);
        setSubmittedData(updatedData);
    };

    return (
        <div className='both-container'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                   
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <div>
                            <label>
                                <input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} /> Female
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Profile Pic:</label>
                        <input type="file" name="profilePic" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Level of Education:</label>
                        <select name="education" value={formData.education} onChange={handleChange} required>
                            <option value="">Select...</option>
                            <option value="highschool">High School</option>
                            <option value="bachelors">Bachelor's</option>
                            <option value="masters">Master's</option>
                            <option value="phd">PhD</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <button type="submit">{editIndex >= 0 ? 'Update' : 'Submit'}</button>
                </form>
            </div>

            <div className='table-container'>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Date of Birth</th>
                            <th>Gender</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Profile Pic</th>
                            <th>Education</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submittedData.map((data, index) => (
                            <tr key={index}>
                                <td style={{ whiteSpace: 'nowrap' }}>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.dateOfBirth}</td>
                                <td>{data.gender}</td>
                                <td>
                                    {data.profilePic && <img src={data.profilePic} alt="Profile" className="profile-image" />}
                                </td>
                                <td>{data.education}</td>
                                <td>
                                    <button style={{marginRight:'10px'}} onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Form;
