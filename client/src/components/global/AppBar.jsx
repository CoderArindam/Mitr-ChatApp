const AppBar = () => {
  return (
    <>
      <div className="navbar-menu">
        <ul>
          <li className="active">
            <a href="home.html">
              <div className="icon">
                <img
                  className="unactive"
                  src="assets/images/svg/chat.svg"
                  alt="chat"
                />
                <img
                  className="active"
                  src="assets/images/svg/chat-fill.svg"
                  alt="chat"
                />
              </div>
              <span className="active">Chat</span>
            </a>
          </li>
          <li>
            <a href="call.html">
              <div className="icon">
                <img
                  className="unactive"
                  src="assets/images/svg/call.svg"
                  alt="call"
                />
                <img
                  className="active"
                  src="assets/images/svg/call-fill.svg"
                  alt="call"
                />
              </div>
              <span>Calls</span>
            </a>
          </li>
          <li>
            <a href="setting.html">
              <div className="icon">
                <img
                  className="unactive"
                  src="assets/images/svg/setting.svg"
                  alt="setting"
                />
                <img
                  className="active"
                  src="assets/images/svg/setting-fill.svg"
                  alt="setting"
                />
              </div>
              <span>Setting</span>
            </a>
          </li>
          <li>
            <a href="profile.html">
              <div className="icon">
                <img
                  className="unactive"
                  src="assets/images/svg/profile.svg"
                  alt="profile"
                />
                <img
                  className="active"
                  src="assets/images/svg/profile-fill.svg"
                  alt="profile"
                />
              </div>
              <span>profile</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AppBar;
