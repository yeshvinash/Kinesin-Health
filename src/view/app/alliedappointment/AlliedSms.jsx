import React, { useEffect, useState } from "react";
import "../../../assets/css/patient.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import Pagination from "../../../components/Pagination";
import "../../../assets/css/allied_patient.css";
import mail from "../../../assets/images/mail.svg";
import wallet from "../../../assets/images/wallet.svg";
import percentage from "../../../assets/images/percentage.svg";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { MESSAGE_CONTROLER_URL } from "../../../api/Service";
import { useSelector } from "react-redux";

const option = [
  {
    id: 1,
    sent_date: "20 March 2023",
    sent_to: "Rahul Joseph",
    mobile_no: "0171233456",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
  {
    id: 2,
    sent_date: "24 February 2023",
    sent_to: "Karel Joseph",
    mobile_no: "0371233456",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
  {
    id: 3,
    sent_date: "13 March 2023",
    sent_to: "Mark Johny koel",
    mobile_no: "0571233456",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
  {
    id: 4,
    sent_date: "24 March 2023",
    sent_to: "Rahul Joseph",
    mobile_no: "0471233456",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
  {
    id: 5,
    sent_date: "24 May 2023",
    sent_to: "Karel Joseph",
    mobile_no: "0657123345",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
  {
    id: 6,
    sent_date: "26 April 2023",
    sent_to: "Mark Johny koel",
    mobile_no: "0267123345",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
  {
    id: 7,
    sent_date: "31 March 2023",
    sent_to: "Karel Joseph",
    mobile_no: "0491233456",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
  {
    id: 8,
    sent_date: "10 March 2023",
    sent_to: "Rahul Joseph",
    mobile_no: "0961233456",
    text: "Coming along nicely, we've A design completed, take a look! 🤓",
    delivery_date: "24 March 2023",
  },
];

const AlliedSms = () => {
  const [sms, setSms] = useState(option);
  const [sortBy, setSortBy] = useState(""); // State for sorting option
  const [sortOrder, setSortOrder] = useState("desc"); // State for sorting order

  const [searchKeyword, setSearchKeyword] = useState("");

  // For pagination state//
  const [currentPage, setCurrentPage] = useState(1);
  // For pagination state//

  const tenantVal = useSelector((state)=> state.auth.user?.tenant);

  // Sort handler start//
  const handleSort = (selectedSortBy) => {
    let sortedSms = [...sms];
    let newSortOrder = sortOrder === "desc" ? "asc" : "desc"; // Toggle the sort order

    if (selectedSortBy === sortBy) {
      // If the same column is clicked again, toggle the sort order
      sortedSms.reverse();
    } else {
      // Sort by the selected column
      if (selectedSortBy === "date") {
        sortedSms.sort((a, b) => {
          if (newSortOrder === "asc") {
            return new Date(a.sent_date) - new Date(b.sent_date);
          } else {
            return new Date(b.sent_date) - new Date(a.sent_date);
          }
        });
      } else if (selectedSortBy === "sentTo") {
        sortedSms.sort((a, b) => {
          if (newSortOrder === "asc") {
            return a.sent_to.localeCompare(b.sent_to);
          } else {
            return b.sent_to.localeCompare(a.sent_to);
          }
        });
      }
    }

    setSortBy(selectedSortBy);
    setSortOrder(newSortOrder);
    setSms(sortedSms);
    setSearchKeyword("");
  };

  // Sort handler end//


  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(`${tenantVal}${MESSAGE_CONTROLER_URL}`,);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [tenantVal]);

  // For Pagination//
  const itemsPerPage = 5; // Number of items to display per page
  // Calculate the total number of pages based on the number of items and itemsPerPage
  const totalPages = Math.ceil(sms.length / itemsPerPage);
  // Get the current items to display based on the currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredSms = sms.filter((item) =>
    item.mobile_no.includes(searchKeyword)
  );
  const currentItems = filteredSms.slice(indexOfFirstItem, indexOfLastItem);
  // For Pagination//
  return (
    <div>
      {/* <Nav /> */}
      <div className="dashBcontbody allied_sms">
        <div className="patientsheading">
          <div className="patientsearchbar">
            <h3>Communications</h3>
          </div>

          {/* <div className="btnxscenter">
            <button
              className="custom_btn addform_btn"
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#sendSma_modal"
            >
              <i className="fa-sharp fa-solid fa-paper-plane"></i> Send Messages
            </button>
          </div> */}
        </div>
        <div className="signup_threebox mt-0">
          <>
            <div className="sendsmsmainbox">
              <div className="row">
                <div className="col-md-3">
                  <div className="communicationsbox">
                    <div className="smsboxflex">
                      <div className="smsboxcont">
                        <p>Sms Sent in last 7 days</p>
                        <h5>100+</h5>
                      </div>
                      <div className="smsboxicon">
                        <img src={mail} alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="communicationsbox">
                    <div className="smsboxflex">
                      <div className="smsboxcont">
                        <p>Open rate last 7 days</p>
                        <h5>2500+</h5>
                      </div>
                      <div className="smsboxicon ibg1">
                        <img src={percentage} alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="communicationsbox">
                    <div className="smsboxflex">
                      <div className="smsboxcont">
                        <p>Sms sent in last month</p>
                        <h5>2000+</h5>
                      </div>
                      <div className="smsboxicon ibg2">
                        <img src={mail} alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="communicationsbox">
                    <div className="smsboxflex">
                      <div className="smsboxcont">
                        <p>Outstanding Sms balance</p>
                        <h5>50+</h5>
                      </div>
                      <div className="smsboxicon ibg3">
                        <img src={wallet} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="smsborder">
                <div className="summary_heading sms_rules">
                  <h2>Messages Sent</h2>
                  <div className="message_searchdiv">
                    <input
                      type="search"
                      className="form-control searchwidth"
                      placeholder="Search"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </div>
                  <div className="shortbyselect">
                    <select
                      className="form-select form-control dpblock"
                      onChange={(e) => handleSort(e.target.value)}
                      value={sortBy}
                    >
                      <option value="">Sort By</option>
                      <option value="date">Date Sent</option>
                      <option value="sentTo">Sent To</option>
                    </select>
                  </div>
                </div>
                {filteredSms.length === 0 ? (
                  <p className="noresults_found">No results found.</p>
                ) : (
                  <ul className="patientlist">
                    <li
                      className="listvat hedoutline hedoutline1"
                      onClick={() => handleSort("date")}
                    >
                      <h6>Sent Date</h6>
                      {sortBy === "date" && (
                        <i
                          className={`fa fa-angle-${
                            sortOrder === "asc" ? "up" : "down"
                          }`}
                        ></i>
                      )}
                    </li>
                    <li
                      className="listvat hedoutline hedoutline2"
                      onClick={() => handleSort("sentTo")}
                    >
                      <h6>Sent to</h6>
                      {sortBy === "sentTo" && (
                        <i
                          className={`fa fa-angle-${
                            sortOrder === "asc" ? "up" : "down"
                          }`}
                        ></i>
                      )}
                    </li>
                    <li className="listvat hedoutline hedoutline4">
                      <h6>Mobile no</h6>
                    </li>
                    <li className="listvat hedoutline hedoutline3">
                      <h6>Message</h6>
                    </li>
                    <li className="listvat hedoutline hedoutline5">
                      <h6>Delivery Date</h6>
                    </li>

                    {currentItems.map((item, i) => (
                      <>
                        <li className="listprice2 coltoutline coltoutline1">
                          <h6>Sent Date</h6>
                          <p>{item.sent_date}</p>
                        </li>
                        <li className="listprice2 coltoutline coltoutline2">
                          <h6>Sent to</h6>
                          <p>{item.sent_to}</p>
                        </li>
                        <li className="listprice2 coltoutline coltoutline4">     
                          <h6>Mobile no</h6>
                          <p>{item.mobile_no}</p>
                        </li>
                        <li className="listprice2 coltoutline coltoutline3">
                          <h6>Message</h6>
                          <p>{item.text}</p>
                        </li>
                        <li className="listprice2 coltoutline coltoutline5">
                          <h6>Delivery Date</h6>
                          <p>{item.delivery_date}</p>
                        </li>
                      </>
                    ))}
                  </ul>
                )}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </>
        </div>
        {/* <SmsModal /> */}
      </div>
    </div>
  );
};

export default AlliedSms;
