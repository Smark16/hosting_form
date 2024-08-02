import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UpdateCapacity() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [fileDetails, setFileDetails] = useState(null);
    const [phoneValide, setPhoneValidate] = useState([]);
    const [fileResponse, setFileResponse] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0);
    const post_capacity = `https://institute-application-backend.onrender.com/form/update_capacity/${user.user_id}`;
    const retrieveCapacity = `https://institute-application-backend.onrender.com/form/retrieve_capacity/${user.user_id}`;
    const retrieveFile = `https://institute-application-backend.onrender.com/form/retrieve_File/${user.user_id}`;
    const updateFileUrl = `https://institute-application-backend.onrender.com/form/update_file/${user.user_id}`;
    const [file, setFile] = useState({ name: "" });
    const [capacity, setCapacity] = useState({
        Date_Of_Registration: "",
        Registration_Number: "",
        certificate: null,
        Name_Of_The_Contact_Person: "",
        TelNo_Of_The_Contact_Person: "",
        Title_Of_The_Contact_Person: "",
        reason: ""
    });

    const fetchCapacity = async () => {
        try {
            const response = await axios.get(retrieveCapacity);
            const data = response.data;
            setCapacity(data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchFile = async () => {
        try {
            const response = await axios.get(retrieveFile);
            const data = response.data;
            setFile(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCapacity();
        fetchFile();
    }, []);

    const [submit, setSubmit] = useState(false);
    const [isRegistered, setIsRegistered] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFileDetails(files[0]);
        } else {
            setCapacity({ ...capacity, [name]: value });
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileDetails(selectedFile);
            setUploadProgress(0);

            const formData = new FormData();
            formData.append('name', selectedFile);
            formData.append("user", user.user_id);

            try {
                const response = await axios.put(updateFileUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    },
                });
                
                if (response.status === 200) {
                    setCapacity({ ...capacity, certificate: response.data.id });
                    setFileResponse(response.data)
                }
            } catch (error) {
                console.error('There was an error uploading the file!', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        setSubmit(true);
        e.preventDefault();

        const formData = new FormData();
        formData.append("Date_Of_Registration", capacity.Date_Of_Registration);
        formData.append("Registration_Number", capacity.Registration_Number);
        formData.append("Name_Of_The_Contact_Person", capacity.Name_Of_The_Contact_Person);
        formData.append("TelNo_Of_The_Contact_Person", capacity.TelNo_Of_The_Contact_Person);
        formData.append("Title_Of_The_Contact_Person", capacity.Title_Of_The_Contact_Person);
        formData.append("reason", capacity.reason);
        formData.append("user", user.user_id);

        // Only append the file if it exists (i.e., user selected a new file)
        if (fileDetails && fileResponse) {
            formData.append('certificate', fileResponse.id);
        } else if (capacity.certificate) {
            formData.append('certificate', capacity.certificate);  // Existing file ID or name
        }

        try {
            const response = await axios.put(post_capacity, formData);
            if (response.status === 200) {
                setSubmit(false);
                ShowSuccessAlert("Updated Successfully");
                navigate("/institute/view_details");
            }
        } catch (err) {
            console.log(err);
            if (err.response?.data?.TelNo_Of_The_Contact_Person && err.response.status === 400) {
                setPhoneValidate(err.response.data.TelNo_Of_The_Contact_Person);
            }
            setSubmit(false);
        }
    };

    const ShowSuccessAlert = (message) => {
        Swal.fire({
            title: message,
            icon: "success",
            timer: 6000,
            toast: true,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: true,
        });
    };

    const handleRegistrationChange = (option) => {
        setIsRegistered(option === 'yes');
    };

    return (
        <div className="container">
            <p className='text-center reg_word'>REGISTRATION AND CAPACITY</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                        Is The Enterprise/Company Registered?
                    </label>
                    <ul>
                        <li>
                            <input
                                type="radio"
                                name='registered'
                                value='yes'
                                checked={isRegistered === true}
                                onChange={() => handleRegistrationChange('yes')}
                                required
                            />
                            <span>YES</span>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name='registered'
                                value='no'
                                checked={isRegistered === false}
                                onChange={() => handleRegistrationChange('no')}
                                required
                            />
                            <span>NO</span>
                        </li>
                    </ul>
                </div>

                {!isRegistered && (
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Enter Reason
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            name='reason'
                            value={capacity.reason}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {isRegistered && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Date Of Registration
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Date_Of_Registration'
                                value={capacity.Date_Of_Registration}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="file_upload" className="form-label bg-primary text-center p-2 text-white">
                                Update Certificate of Registration
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="file_upload"
                                name='certificate'
                                accept=".pdf, .docx, .zip"
                                onChange={handleFileChange}
                                hidden
                            />
                            <div className="fileupload">
                                {fileDetails ? (
                                    <ul>
                                        <li className="file-name">
                                            <span className='reduce_letter'>{fileDetails.name}</span>
                                            <div className="progress-bar p-2 text-white" style={{ width: `${uploadProgress}%` }}>
                                                {uploadProgress}%
                                            </div>
                                        </li>
                                    </ul>
                                ) : (
                                    <>
                                        <span>{file.name}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Registration Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Registration_Number'
                                value={capacity.Registration_Number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Name Of The Contact Person
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Name_Of_The_Contact_Person'
                                value={capacity.Name_Of_The_Contact_Person}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Tel-No Of The Contact Person
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='TelNo_Of_The_Contact_Person'
                                value={capacity.TelNo_Of_The_Contact_Person}
                                onChange={handleChange}
                                required
                            />
                            {phoneValide.map(rule => {
                                return (
                                    <p className='text-danger' key={rule}>{rule}</p>
                                )
                            })}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Title Of The Contact Person
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Title_Of_The_Contact_Person'
                                value={capacity.Title_Of_The_Contact_Person}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                )}

                <button className='text-white p-2 text-center w-100 btn-register' type='submit'>
                    {submit ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
}

export default UpdateCapacity;
