import React from "react";
import Chart from "react-apexcharts";

const MainFile = () => {
  const chartData = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  var options = {
    series: [50, 30],
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const revenueData = {
    series: [68],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: ["Revenue"],
    },
  };
  return (
    <>
      <div id="main_content">
        <div className="page">
          <div className="section-body py-3">
            <div className="container-fluid">
              <div className="row clearfix">
                <div className="col-lg-12">
                  <div className="mb-4">
                    <h4>Welcome Praveen Kumar!</h4>
                  </div>
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card">
                    <div className="card-body ribbon">
                      <div className="ribbon-box green">5</div>
                      <a
                        href="hr-users.html"
                        className="my_sort_cut text-muted"
                      >
                        <i className="fa fa-users" />
                        <span>Users</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card">
                    <div className="card-body">
                      <a
                        href="hr-holidays.html"
                        className="my_sort_cut text-muted"
                      >
                        <i className="fa fa-thumbs-up" />
                        <span>Holidays</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card">
                    <div className="card-body ribbon">
                      <div className="ribbon-box orange">8</div>
                      <a
                        href="hr-events.html"
                        className="my_sort_cut text-muted"
                      >
                        <i className="fa fa-calendar" />
                        <span>Events</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card">
                    <div className="card-body">
                      <a
                        href="hr-payroll.html"
                        className="my_sort_cut text-muted"
                      >
                        <i className="fa fa-credit-card" />
                        <span>Payroll</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card">
                    <div className="card-body">
                      <a
                        href="hr-accounts.html"
                        className="my_sort_cut text-muted"
                      >
                        <i className="fa fa-calculator" />
                        <span>Accounts</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card">
                    <div className="card-body">
                      <a
                        href="hr-report.html"
                        className="my_sort_cut text-muted"
                      >
                        <i className="fa fa-pie-chart" />
                        <span>Report</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-body">
            <div className="container-fluid">
              <div className="row clearfix row-deck">
                <div className="col-xl-6 col-lg-12 col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Salary Statistics</h3>
                    </div>
                    <div className="card-body">
                      <Chart
                        options={chartData}
                        series={chartData.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Revenue</h3>
                    </div>
                    <div className="card-body text-center">
                      <div className="mt-4">
                        <Chart
                          options={revenueData.options}
                          series={revenueData.series}
                          type="radialBar"
                          height={320}
                        />
                      </div>
                      <h3 className="mb-0 mt-3 font300">
                        <span className="counter">1,24,301</span>
                        <span className="text-green font-15">+3.7%</span>
                      </h3>
                      <small>
                        Lorem Ipsum is simply dummy text <br />
                        <a href="#">Read more</a>
                      </small>
                      <div className="mt-4">
                        <span className="chart_3">2,5,8,3,6,9,4,5,6,3</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-block btn-success btn-sm"
                      >
                        Send Report
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">My Balance</h3>
                    </div>
                    <div className="card-body">
                      <span>Balance</span>
                      <h4>
                        $<span className="counter">20,508</span>
                      </h4>
                      <div id="apexspark1" className="mb-4" />
                      <div className="form-group">
                        <label className="d-block">
                          Bank of America
                          <span className="float-right">
                            $<span className="counter">15,025</span>
                          </span>
                        </label>
                        <div className="progress progress-xs">
                          <div
                            className="progress-bar bg-azure"
                            role="progressbar"
                            aria-valuenow={77}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: `${57}%` }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="d-block">
                          RBC Bank
                          <span className="float-right">
                            $<span className="counter">1,843</span>
                          </span>
                        </label>
                        <div className="progress progress-xs">
                          <div
                            className="progress-bar bg-green"
                            role="progressbar"
                            aria-valuenow={50}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: `${77}%` }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="d-block">
                          Frost Bank
                          <span className="float-right">
                            $<span className="counter">3,641</span>
                          </span>
                        </label>
                        <div className="progress progress-xs">
                          <div
                            className="progress-bar bg-blue"
                            role="progressbar"
                            aria-valuenow={23}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: `${17}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-block btn-info btn-sm"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clearfix row-deck">
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Employee Structure</h3>
                    </div>
                    <div className="card-body text-center">
                      <div id="chart-bar-stacked" style={{ height: 280 }} />
                      <div className="row clearfix">
                        <div className="col-6">
                          <h6 className="mb-0">50</h6>
                          <small className="text-muted">Male</small>
                        </div>
                        <div className="col-6">
                          <h6 className="mb-0">17</h6>
                          <small className="text-muted">Female</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Employee Satisfaction</h3>
                    </div>
                    <div className="card-body text-center">
                      <div
                        id="chart-area-spline-sracked"
                        style={{ height: 280 }}
                      />
                      <div className="row clearfix">
                        <div className="col-6">
                          <h6 className="mb-0">195</h6>
                          <small className="text-muted">Last Month</small>
                        </div>
                        <div className="col-6">
                          <h6 className="mb-0">163</h6>
                          <small className="text-muted">This Month</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Performance</h3>
                    </div>
                    <div className="card-body">
                      <span>
                        Measure How Fast You’re Growing Monthly Recurring
                        Revenue. <a href="#">Learn More</a>
                      </span>
                      <ul className="list-group mt-3 mb-0">
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>35%</strong>
                            </div>
                            <div className="float-right">
                              <small className="text-muted">Design Team</small>
                            </div>
                          </div>
                          <div className="progress progress-xs">
                            <div
                              className="progress-bar bg-azure"
                              role="progressbar"
                              style={{ width: "35%" }}
                              aria-valuenow={42}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>25%</strong>
                            </div>
                            <div className="float-right">
                              <small className="text-muted">
                                Developer Team
                              </small>
                            </div>
                          </div>
                          <div className="progress progress-xs">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              style={{ width: "25%" }}
                              aria-valuenow={0}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>15%</strong>
                            </div>
                            <div className="float-right">
                              <small className="text-muted">Marketing</small>
                            </div>
                          </div>
                          <div className="progress progress-xs">
                            <div
                              className="progress-bar bg-orange"
                              role="progressbar"
                              style={{ width: "15%" }}
                              aria-valuenow={36}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>20%</strong>
                            </div>
                            <div className="float-right">
                              <small className="text-muted">Management</small>
                            </div>
                          </div>
                          <div className="progress progress-xs">
                            <div
                              className="progress-bar bg-indigo"
                              role="progressbar"
                              style={{ width: "20%" }}
                              aria-valuenow={6}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>11%</strong>
                            </div>
                            <div className="float-right">
                              <small className="text-muted">Other</small>
                            </div>
                          </div>
                          <div className="progress progress-xs">
                            <div
                              className="progress-bar bg-pink"
                              role="progressbar"
                              style={{ width: "11%" }}
                              aria-valuenow={6}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Growth</h3>
                    </div>
                    <div>
                      <Chart
                        options={options}
                        series={options.series}
                        type="donut"
                        height={350}
                      />
                    </div>
                    <div className="card-footer text-center">
                      <div className="row clearfix">
                        <div className="col-6">
                          <h6 className="mb-0">$3,095</h6>
                          <small className="text-muted">Last Year</small>
                        </div>
                        <div className="col-6">
                          <h6 className="mb-0">$2,763</h6>
                          <small className="text-muted">This Year</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-12 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Project Summary</h3>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-striped text-nowrap table-vcenter mb-0">
                          <thead>
                            <tr>
                              <th>Sr No</th>
                              <th>Client Name</th>
                              <th>Project</th>
                              <th>Project Cost</th>
                              <th>Payment</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Sean Black</td>

                              <td>Angular Admin</td>
                              <td>$14,500</td>
                              <td>Done</td>
                              <td>
                                <span className="tag tag-success">
                                  Delivered
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Sean Black</td>

                              <td>Angular Admin</td>
                              <td>$14,500</td>
                              <td>Pending</td>
                              <td>
                                <span className="tag tag-success">
                                  Delivered
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Merri Diamond</td>

                              <td>One page html Admin</td>
                              <td>$500</td>
                              <td>Done</td>
                              <td>
                                <span className="tag tag-orange">Submit</span>
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Sean Black</td>

                              <td>Wordpress One page</td>
                              <td>$1,500</td>
                              <td>Done</td>
                              <td>
                                <span className="tag tag-success">
                                  Delivered
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>Allen Collins</td>

                              <td>VueJs Application</td>
                              <td>$9,500</td>
                              <td>Done</td>
                              <td>
                                <span className="tag tag-success">
                                  Delivered
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-body">
            <footer className="footer">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    Copyright © 2023
                    <a href="https://orivesolutions.com/">Orive Solutions</a>.
                  </div>
                  <div className="col-md-6 col-sm-12 text-md-right">
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <a href="https://nsdbytes.com/template/epic/doc/index.html">
                          Documentation
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)">FAQ</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFile;
