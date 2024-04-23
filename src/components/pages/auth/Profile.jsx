import { useAuthInfo } from "../../../context/AuthContext";

export default function ProfilePage() {
  const { userInfo } = useAuthInfo();

  return (
    <div className="profile-page-container">
      <h1>User Profile</h1>
      {userInfo && (
        <table className="user-info-table">
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>{userInfo.firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{userInfo.lastName}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>*****</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>{userInfo.role}</td>
            </tr>
            <tr>
              <td>Active Status:</td>
              <td>{userInfo.active}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
