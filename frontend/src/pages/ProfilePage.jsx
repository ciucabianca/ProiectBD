import { useEffect, useState } from "react";
import { getUser, getUserById } from "../api/users";
import { Layout } from "../components/Layout";
import { updateUser, deleteUser } from "../api/users";
import { useHistory } from "react-router-dom";

export const ProfilePage = () => {
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const history = useHistory();

  useEffect(() => {
    getAsyncUser();
  }, []);

  const getAsyncUser = async () => {
    const userMe = await getUser();
    const user = await getUserById(userMe.userId);
    console.log(user);
    setUser(user);
  };

  const onEdit = () => {
    setFirstName(user.firstName);
    setLastName(user.LastName);
    setIsEditing(true);
  };

  const onDelete = async () => {
    await deleteUser(user.UserId);
    setTimeout(() => {
      history.push("/");
      localStorage.removeItem("authToken");
      window.location.reload(false);
    }, 1000);
  };

  const onSave = async (e) => {
    setIsEditing(false);
    await updateUser(user.UserId, { firstName, lastName });
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  const renderButtons = () => {
    if (isEditing) {
      return (
        <div>
          <button className={`btn btn-success`} onClick={onSave}>
            Salveaza
          </button>
          <button className="btn btn-danger mx-2" onClick={onCancel}>
            Anuleaza
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="btn btn-primary" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-danger mx-2" onClick={onDelete}>
            Delete Account
          </button>
        </div>
      );
    }
  };

  const renderNames = () => {
    if (isEditing) {
      return (
        <>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name:</span>
            </div>
            <input
              className="for-control"
              type="text"
              placeholder={user?.FirstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name:</span>
            </div>
            <input
              className="for-control"
              type="text"
              placeholder={user?.LastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <h3>{`First Name: ${user?.FirstName}`}</h3>
          <h3>{`Last Name: ${user?.LastName}`}</h3>
        </>
      );
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Profile</h1>
      {renderNames()}
      <div className="my-2">{renderButtons()}</div>
    </Layout>
  );
};
