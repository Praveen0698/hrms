import React from "react";

const Header = () => {
  return (
    <>
      <div>
        <div id="page_top" className="section-body top_dark">
          <div className="container-fluid">
            <div className="page-header">
              <div className="left">
                <h1 className="page-title">ORIVE Dashboard</h1>
                <div className="input-group xs-hide">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="right">
                <div className="notification d-flex">
                  <div className="dropdown d-flex">
                    <a
                      href={"#"}
                      className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-envelope" />
                      <span className="badge badge-success nav-unread" />
                    </a>
                  </div>
                  <div className="dropdown d-flex">
                    <a
                      href={"#"}
                      className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-bell" />
                      <span className="badge badge-primary nav-unread" />
                    </a>
                  </div>
                  <div className="dropdown d-flex">
                    <a
                      href={"#"}
                      className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-user" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
