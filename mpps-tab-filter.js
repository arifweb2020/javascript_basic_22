const [user, setUser] = useState([])
const [course, setCourse] = useState(user)
const [first, setFirst] = useState([])
useEffect(() => {
    const response = () => {
        const config1 = {
            method: 'GET',
            url: process.env.REACT_APP_API_BASE_URL + 'student/get_all_preferences/',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Accept': "application/json",
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
        };
        axios(config1)
            .then(function (response) {
                setUser(response.data)
                setFirst(response.data.filter((item)=>item.slug === "mppsc-civil-services"))
                // console.log(response.data.filter((item)=>item.slug === "mppsc-civil-services"), "response")
                // console.log(response.data, "bxcxcx")
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    if (tokenfunction() === true) {
                        response()
                    }
                }
            });
    }
    response()
    getCourses()
}, [])
const getCourses = (param) => {
  const myCourses = user?.filter((item) => item.slug === param)
  setCourse(myCourses)
  setFirst(myCourses)
  console.log(myCourses,"myCourses")
}
<div class="content-body">
<div className="container-fluid">
    <div className="course-details-tab style-2">
        <nav>
            <div className="nav nav-tabs justify-content-start tab-auto" id="nav-tab" role="tablist">
                {user?.map((pref, index) => {
                    console.log(pref.slug, "pref")
                    return (
                        <button className="nav-link active" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-about" aria-selected="true" onClick={() => getCourses(pref.slug)}>{pref?.name}</button>
                    )
                })}
            </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade active show" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab" >
                {first?.map((ele, index) => {
                    console.log(ele, "ele")
                    return (
                        <div className="row mt-4">
                            {ele?.courses?.map((cartData, index2) => {
                                console.log(cartData, "cartData")
                                return (
                                    <div className="col-xl-4 col-lg-4 col-md-4" key={index2}>
                                        <div className="card h-auto all-crs-wid">
                                            <div className="card-body">
                                                <div className="courses-bx">
                                                    <div className="dlab-media">
                                                        <img src={cartData?.web_icon} alt="" />
                                                    </div>
                                                    <div className="dlab-info">
                                                        <div className="dlab-title d-flex justify-content-between">
                                                            <div className="mt-2">
                                                                <h4>
                                                                    <a href="course-details.html">{cartData?.name}</a>
                                                                </h4>
                                                                <p className="m-0">{ele.name}</p>
                                                            </div>
                                                            <div className="course_price ml-auto text-primary">
                                                                <span>{cartData?.CourseSubscriptionPlans_course[0]?.plan_price}</span>
                                                                <br />{cartData?.CourseSubscriptionPlans_course[0]?.plan_price}
                                                            </div>
                                                        </div>
                                                        <div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll ps ps--active-y mt-4">
                                                            <ul className="timeline">
                                                                <li>
                                                                    <div className="timeline-badge info" />
                                                                    <span className="timeline-panel text-muted">
                                                                        <h6 className="mb-0">{cartData?.CourseSubscriptionPlans_course[0]?.no_of_videos}+ Video Lectures</h6>
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <div className="timeline-badge success" />
                                                                    <span className="timeline-panel text-muted">
                                                                        <h6 className="mb-0">{cartData?.CourseSubscriptionPlans_course[0]?.no_of_notes}+ PDF Notes </h6>
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <div className="timeline-badge warning" />
                                                                    <span className="timeline-panel text-muted">
                                                                        <h6 className="mb-0"> {cartData?.CourseSubscriptionPlans_course[0]?.no_of_tests}+ Test Series</h6>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer" key={cartData.id}>
                                                <div className="d-flex justify-content-between content align-items-center">
                                                    <Link to="/courseDetails" aria-expanded="false" activeName="active" className="btn btn-warning btn-sm">
                                                        <i className="bi-view-list" /> Explore
                                                    </Link>
                                                    {/* <Link to="/package" aria-expanded="false" activeName="active" className="btn btn-primary btn-sm" >
                                                        <i className="bi-cart3" /> Buy Now
                                                    </Link> */}
                                                    <Link to={`/package/${cartData.id}`} aria-expanded="false" activeName="active" className="btn btn-primary btn-sm" >
                                                        <i className="bi-cart3" /> Buy Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    </div>
</div>
</div>
