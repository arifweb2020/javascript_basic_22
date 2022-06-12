  // put this in login page
  
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token === null) {
      history.push("/login")
    }
    else {
      history.push("/")
    }
  }, [history])
  
  
  // put this in protected routing
  
  import { Route, Redirect } from 'react-router';
import {  useEffect, useState } from 'react';

const PrivateRoute = ({component: Component, ...rest}) => {
	const [authed, setAuthed] = useState(null)

	useEffect( () => {
		const token = localStorage.getItem("user-token")
		if(token && token !== "")
			setAuthed(true)
		else 
			setAuthed(false)
	}, [])

	return (
		<Route 
			{...rest}
			render={ (props) => authed === true? (
				<Component {...props}/>):
				(authed === false)? 
					<Redirect to={{pathname: '/', state: {from: props.location}}}/>
					: null
			}
		/>
	)
}

export default PrivateRoute;
  
  // make APP route like this

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SpinLoader from "../components/SpinLoader";
import ProtectedRoutes from "./ProtectedRoutes";

const Login = React.lazy(() => import("../features/login/login/Login"));
const Otp = React.lazy(() => import("../features/login/otp/Otp"));
const Dashboard = React.lazy(() => import("../features/dashboard/Dashboard"));
const LoanHistory = React.lazy(() =>
  import("../features/history-view/LoanHistory")
);
const ActiveLoans = React.lazy(() =>
  import("../features/loan-view/loans/ActiveLoans")
);
const ActiveLoanDetails = React.lazy(() =>
  import("../features/loan-view/loans-details/ActiveLoanDetails")
);
const MyFirstRating = React.lazy(() =>
  import("../features/rating-view/rating-homepage/MyFirstRating")
);
const MyFirstRatingTips = React.lazy(() =>
  import("../features/rating-view/rating-tips/MyFirstRatingTips")
);
const Error404 = React.lazy(() =>
  import("../features/others/Error404")
);

function AppRoutes() {
  return (
    <BrowserRouter basename="/d2c-collection">
      <React.Suspense fallback={<SpinLoader />}>
        <Switch>
          <Route exact path="/login" name="login" component={Login} />
          <Route exact path="/otp" name="otp" component={Otp} />
          <ProtectedRoutes
            exact
            path="/"
            name="dashboard"
            component={Dashboard}
          />
          <ProtectedRoutes
            exact
            path="/loan-history"
            name="loanHistory"
            component={LoanHistory}
          />
          <ProtectedRoutes
            exact
            path="/active-loans"
            name="activeLoans"
            component={ActiveLoans}
          />
          <ProtectedRoutes
            // exact
            path="/loan-details/:loanAcc"
            name="loanDetails"
            component={ActiveLoanDetails}
          />
          <ProtectedRoutes
            exact
            path="/first-rating"
            name="firstRating"
            component={MyFirstRating}
          />
          <ProtectedRoutes
            exact
            path="/rating-tips"
            name="ratingTips"
            component={MyFirstRatingTips}
          />
          <Route exact path="/error-404" name="error404" component={Error404} />
          <Route render={() => <Redirect to="/error-404" />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
