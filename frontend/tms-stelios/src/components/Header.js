import React from 'react';

class Header extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <nav className="navbar navbar-light navbar-override">
        <div className="container">

          <div className="navbar-brand navbar-brand-override">
            {this.props.appName.toLowerCase()}
          </div>

        </div>
      </nav>
    );
  }
}


export default Header;

