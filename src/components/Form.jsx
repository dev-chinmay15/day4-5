import React,{useState} from 'react'
import  './Form.css';

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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'profilePic' ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profilePicUrl = formData.profilePic ? URL.createObjectURL(formData.profilePic) : null;
        setSubmittedData([...submittedData, { 
            ...formData, 
            profilePic: profilePicUrl
        }]);
        
        alert('Form submitted!');
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
                            <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Profile Pic:</label>
                    <input type="file" name="profilePic" onChange={handleChange} required />
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
                <button type="submit">Submit</button>
            </form>
     </div>


     <div className='table-container'>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th style={{whiteSpace :'nowrap'}}>Date of Birth</th>
                        <th>Gender</th>
                        <th style={{whiteSpace :'nowrap'}}>Profile Pic</th>
                        <th>Education</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td style={{whiteSpace :'nowrap'}}>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.dateOfBirth}</td>
                            <td>{data.gender}</td>
                            <td>
                                {data.profilePic && <img src={data.profilePic} alt="Profile" className="profile-image" />}
                            </td>
                            <td>{data.education}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
  )
}

export default Form
