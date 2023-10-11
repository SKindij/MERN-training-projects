// AuthPage.js
export const AuthPage = () => {



  const registerHandler = async () => {
    try {
      console.log("registerHandler");
    } catch (e) {console.log(e)}
  }

  const loginHandler = async () => {
    try {
      console.log("loginHandler");
    } catch (e) {console.log(e)}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten the Link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="enter email"
                  id="email" type="text" name="email"
                  className="yellow-input"
                  

                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="enter пароль"
                  id="password" type="password" name="password"
                  className="yellow-input"
                  

                />
                <label htmlFor="email">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4"
              style={{marginRight: 10}}
              
              onClick={loginHandler}
            >
              Sign In
            </button>
            <button className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
