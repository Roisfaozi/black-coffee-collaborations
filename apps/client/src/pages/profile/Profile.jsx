import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import coffeeBg from '../../assets/coffee-bg-profile.png';
import editProfile from '../../assets/edit-profile.png';
import photoProfile from '../../assets/photo-profile.png';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { logout } from '../../store/reducer/user';

function Profile() {
  const [data, setData] = useState({});
  const [formattedDate, setFormattedDate] = useState('');
  const [photoInputKey, setPhotoInputKey] = useState(Date.now()); // to reset file input
  const [isLoading, setIsLoading] = useState(false);
  const { userId, token, isAuthUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isAuthUser === false) {
    navigate('/');
  }

  // Format Date to DD/MM/YY
  const formatDateToDDMMYY = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Convert URL to File
  const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  };
  // Get Data Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/users/profile/${userId}`, {
          baseURL: 'http://localhost:9090',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setData(data);
        // Format Date to DD/MM/YY
        if (data.birthday) {
          const formattedBirthday = formatDateToDDMMYY(data.birthday);
          setData({ ...data, birthday: formattedBirthday });
          setFormattedDate(formattedBirthday);
        }

        // URL Photo to File
        if (data.photo_profile) {
          const photoFile = await urlToFile(data.photo_profile, 'photo_profile.png', 'image/png');
          setData({ ...data, photo_profile: photoFile });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Formatted Date DD/MM/YY
  const handleFormattedDate = (e) => {
    const date = new Date(e.target.value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    setFormattedDate(`${year}/${month}/${day}`);
  };
  // File Handler
  const fileHandler = (e) => {
    const newData = { ...data, [e.target.name]: e.target.files[0] };
    setData(newData);
  };

  // Handle Change
  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
  };

  // Handle Remove Photo
  const handleRemovePhoto = () => {
    const newData = { ...data, photo_profile: photoProfile };
    setData(newData);
    setPhotoInputKey(Date.now()); // reset the file input
  };
  const showFormattedDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    // return new Date(date).toLocaleDateString("en-US", options)
    return new Date(date).toISOString();
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      if (key === 'birthday') {
        formData.append(key, showFormattedDate(data[key]));
      }
      formData.append(key, data[key]);
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`/users/profile/`, formData, {
        baseURL: 'http://localhost:9090',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Success Update Profile', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error updating profile!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Header />
      <main
        className="min-w-screen min-h-screen bg-cover bg-top bg-no-repeat pb-11"
        style={{ backgroundImage: `url(${coffeeBg})` }}
      >
        <div className="md:w-[740px] 1133px:w-[1133px] mx-auto">
          <div className="hidden md:block w-full font-rubik font-medium text-[35px] text-white pt-[60px] pb-[31px]">
            User Profile
          </div>
          {isLoading ? (
            <div className="flex md:bg-[#F8F8F8] rounded-[20px] md:px-[45px] py-[54px] font-poppins">
              {/* Photo and Password */}
              <div className="hidden md:block flex-col w-[315px] 1133px:px-[54px] text-center bg-gray-400 animate-pulse ">
                {/* Photo Profile */}
              </div>

              {/* Contacts & Details */}
              <div className="w-[414px] md:w-[450px] 1133px:w-[705px] h-[1300px] md:h-[841px] bg-gray-400 animate-pulse  rounded-[10px] text-poppins border-b-[12px] border-[#6A4029] mx-auto md:ml-[33px] px-[50px] md:px-[20px] 1133px:px-[30px] py-[17px] shadow-2xl relative"></div>
            </div>
          ) : (
            <div className="flex md:bg-[#F8F8F8] rounded-[20px] md:px-[45px] py-[54px] font-poppins">
              {/* Photo and Password */}
              <div className="hidden md:block flex-col w-[315px] 1133px:px-[54px] text-center">
                {/* Photo Profile */}
                <div
                  className="w-[175px] h-[175px] rounded-full bg-cover bg-center bg-no-repeat mx-auto"
                  style={{
                    backgroundImage: `url(${data.photo_profile && data.photo_profile instanceof File ? URL.createObjectURL(data.photo_profile) : photoProfile})`,
                  }}
                >
                  <input
                    key={photoInputKey} // reset input field
                    className="w-[175px] h-[175px] rounded-full opacity-0"
                    name="photo_profile"
                    type="file"
                    onChange={fileHandler}
                  />
                </div>
                <div className="flex-col w-[207px] text-rubik my-[17px]">
                  <div className="font-bold text-[20px] truncate">{data.display_name}</div>
                  <div className="text-[15px] truncate">{data.email}</div>
                </div>
                <button className="w-[207px] h-[44px] bg-[#FFBA33] text-[#6A4029] font-bold rounded-[10px] text-[15px] mb-[11px]">
                  <input
                    key={photoInputKey}
                    name="photo_profile"
                    className="opacity-0"
                    type="file"
                    onChange={fileHandler}
                  />
                  <div className="mt-[-28px]">Choose photo</div>
                </button>
                <button
                  className="w-[207px] h-[44px] bg-[#6A4029] text-white font-bold rounded-[10px] text-[15px]"
                  onClick={handleRemovePhoto}
                >
                  Remove photo
                </button>
                <button className="w-[207px] h-[60px] bg-white text-[#6A4029] font-bold rounded-[20px] border-[1px] border-[#9F9F9F] text-[18px] mt-[42px] mb-[34px]">
                  Edit Password
                </button>
                <div className="w-[207px] h-[60px] text-[#6A4029] font-bold text-[20px]">
                  Do you want to save the change?
                </div>
                <button
                  className="w-[207px] h-[60px] bg-[#6A4029] text-white font-bold rounded-[20px] text-[18px] shadow-xl mt-[37px] mb-[22px]"
                  onClick={handleSubmit}
                >
                  Save Change
                </button>
                <button
                  className="w-[207px] h-[60px] bg-[#FFBA33] text-[#6A4029] font-bold rounded-[20px] text-[18px] mb-[49px]"
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="w-[207px] h-[60px] bg-white text-[#6A4029] font-bold rounded-[20px] border-[1px] border-[#9F9F9F] text-[18px]"
                >
                  Log Out
                </button>
              </div>

              {/* Contacts & Details */}
              <div className="w-[414px] md:w-[450px] 1133px:w-[705px] h-[1300px] md:h-[841px] bg-white rounded-[10px] text-poppins border-b-[12px] border-[#6A4029] mx-auto md:ml-[33px] px-[50px] md:px-[20px] 1133px:px-[30px] py-[17px] shadow-2xl relative">
                <img className="hidden md:block absolute size-[35px] right-5" src={editProfile} alt="Edit profile" />
                {/* Photo Profile Mobile */}
                <div
                  className="block md:hidden w-[175px] h-[175px] rounded-full bg-cover bg-center bg-no-repeat mx-auto mt-[25px]"
                  style={{
                    backgroundImage: `url(${data.photo_profile && data.photo_profile instanceof File ? URL.createObjectURL(data.photo_profile) : photoProfile})`,
                  }}
                >
                  <img
                    className="block md:hidden absolute size-[40px] right-[135px] top-[175px]"
                    src={editProfile}
                    alt="Edit profile"
                  />
                  <input
                    key={photoInputKey} // reset input field
                    className="w-[175px] h-[175px] rounded-full opacity-0"
                    name="photo_profile"
                    type="file"
                    onChange={fileHandler}
                  />
                </div>
                <div className="block md:hidden flex-col w-[314px] text-rubik my-[25px] text-center mx-auto">
                  <div className="font-bold text-[20px] truncate">{data.display_name}</div>
                  <div className="text-[15px] truncate">{data.email}</div>
                </div>
                {/* Contacts */}
                <div className="hidden md:block font-bold text-[#4F5665] text-[25px] mb-[21px]">Contacts</div>
                <div className="flex">
                  <div className="md:mr-[30px] 1133px:mr-[63px]">
                    <div>
                      <div className="font-medium text-[20px] text-[#9F9F9F]">Email address:</div>
                      <input
                        name="email"
                        type="text"
                        defaultValue={data && data.email}
                        className="w-[314px] md:w-[180px] 1133px:w-[340px] h-[42px] border-black border-b-[1px] outline-none text-[20px] font-rubik"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-[25px] md:mt-[25px] mb-[25px] md:mb-0">
                      <div className="font-medium text-[20px] text-[#9F9F9F]">Delivery address:</div>
                      <textarea
                        name="address"
                        type="text"
                        value={data.address}
                        className="w-[314px] md:w-[180px] 1133px:w-[340px] h-[66px] border-black border-b-[1px] outline-none text-[20px] font-rubik"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="block md:hidden">
                      <div className="font-medium text-[20px] text-[#9F9F9F]">Phone number:</div>
                      <input
                        name="phone_number"
                        type="text"
                        value={data.phone_number}
                        className="w-[314px] h-[42px] border-black border-b-[1px] outline-none text-[20px] font-rubik"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium text-[20px] text-[#9F9F9F]">Phone number:</div>
                    <input
                      name="phone_number"
                      type="text"
                      value={data.phone_number}
                      className="md:w-[180px] 1133px:w-[201px] h-[42px] border-black border-b-[1px] outline-none text-[20px] font-rubik"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="hidden md:block font-bold text-[#4F5665] text-[25px] mb-[21px] mt-[41px]">Details</div>
                <div className="flex">
                  <div className="md:mr-[30px] 1133px:mr-[63px]">
                    <div className="mt-[25px] md:mt-0 mb-[25px]">
                      <div className="font-medium text-[20px] text-[#9F9F9F]">Display name:</div>
                      <input
                        name="display_name"
                        type="text"
                        value={data.display_name}
                        className="w-[314px] md:w-[180px] 1133px:w-[340px] h-[42px] border-black border-b-[1px] outline-none text-[20px] font-rubik"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-[25px]">
                      <div className="font-medium text-[20px] text-[#9F9F9F]">First name:</div>
                      <input
                        name="first_name"
                        type="text"
                        value={data.first_name}
                        className="w-[314px] md:w-[180px] 1133px:w-[340px] h-[42px] border-black border-b-[1px] outline-none text-[20px] font-rubik"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-[20px] text-[#9F9F9F]">Last name:</div>
                      <input
                        name="last_name"
                        type="text"
                        value={data.last_name}
                        className="w-[314px] md:w-[180px] 1133px:w-[340px] h-[42px] border-black border-b-[1px] outline-none text-[20px] font-rubik"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="block md:hidden mt-[25px]">
                      <div className="font-medium text-[20px] text-[#9F9F9F]">DD/MM/YY:</div>
                      <input
                        name="birthday"
                        type="date"
                        value={data.birthday ? data.birthday : new Date()}
                        className={`w-[314px] h-[42px] border-black border-b-[1px] outline-none text-[20px] text-transparent font-rubik`}
                        onChange={(e) => {
                          handleChange(e);
                          // handleFormattedDate(e);
                        }}
                      />
                      {
                        <div
                          className={`${formattedDate ? 'mt-[-35px]' : 'mt-[-5px]'}  text-[20px] text-black cursor-pointer`}
                        >
                          {formattedDate}
                        </div>
                      }
                    </div>
                  </div>
                  <div className="hidden md:block ">
                    <div className="font-medium text-[20px] text-[#9F9F9F]">DD/MM/YY:</div>
                    <input
                      name="birthday"
                      type="date"
                      value={data.birthday}
                      className="md:w-[180px] 1133px:w-[201px] h-[42px] border-black border-b-[1px] outline-none text-[20px] text-transparent font-rubik"
                      onChange={(e) => {
                        handleChange(e);
                        handleFormattedDate(e);
                      }}
                    />
                    {<div className={'mt-[-35px] text-[20px] text-black cursor-pointer'}>{formattedDate}</div>}
                  </div>
                </div>

                {/* Male or Female */}
                <div className="flex mt-[50px] md:mt-[65px] mb-[50px] md:mb-[70px] justify-center">
                  <label className="flex">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="hidden peer"
                      onChange={handleChange}
                      checked={data.gender === 'male'}
                    />
                    <div className="size-[30px] border-4 border-[#9F9F9F] rounded-full peer-checked:border-[#6A4029] peer-checked:bg-[#FFBA33] peer-checked:border-[5px]"></div>
                    <span className="text-[20px] text-[#9F9F9F] font-medium ml-[19px] peer-checked:text-[#6A4029] peer-checked:font-bold">
                      Male
                    </span>
                  </label>
                  <label className="flex ml-[39px] md:ml-[115px]">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="hidden peer"
                      onChange={handleChange}
                      checked={data.gender === 'female'}
                    />
                    <div className="size-[30px] border-4 border-[#9F9F9F] rounded-full peer-checked:border-[#6A4029] peer-checked:bg-[#FFBA33] peer-checked:border-[5px]"></div>
                    <span className="text-[20px] text-[#9F9F9F] font-medium ml-[19px] peer-checked:text-[#6A4029] peer-checked:font-bold">
                      Female
                    </span>
                  </label>
                </div>

                <div>
                  <button
                    className="block md:hidden w-[314px] h-[60px] bg-[#6A4029] text-white font-bold rounded-[20px] text-[18px] shadow-xl mt-[37px] mb-[22px]"
                    onClick={handleSubmit}
                  >
                    Save and Update
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Data Section */}

          <ToastContainer />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
