1> npm install enzyme enzyme-adapter-react-16 enzyme-to-json

--watchAll=false

2> run single file : npm test App.spec.js

3> npm run test -- --coverage

Example : Normal Component

/**
 * Unit test cases for App
 */
 import React from "react";
 import { shallow } from 'enzyme';
 import Adapter from 'enzyme-adapter-react-16';
 import Enzyme from 'enzyme';
// import toJSON from 'enzyme-to-json';
// import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('app test', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
})

Example : Normal components with props and onClick function

/**
 * Unit test cases for Cancel Button
 */
 import React from "react";
 import { shallow } from 'enzyme';
 import Adapter from 'enzyme-adapter-react-16';
 import Enzyme from 'enzyme';
 import toJSON from 'enzyme-to-json';
//  import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
import CancelButton from './../CancelButton';

Enzyme.configure({ adapter: new Adapter() });

  describe('Cancel Button', () => {
    it('renders component without crashing', () => {
      const click = jest.fn();
      const wrapper = shallow(<CancelButton click={click} text="some text"/>);
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    
   });
   
   
Example : Component with div

/**
 * Unit test cases for Tool Tips
 */
 import React from "react";
 import { shallow } from 'enzyme';
 import Adapter from 'enzyme-adapter-react-16';
 import Enzyme from 'enzyme';
 import toJSON from 'enzyme-to-json';
//  import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
import ToolTips from './../ToolTips';
import {Box} from "@mui/material";

Enzyme.configure({ adapter: new Adapter() });

  describe('Tool tips', () => {
    it('renders component without crashing', () => {
        const Child = <Box>
            child component
        </Box>
        const wrapper = shallow(<ToolTips text="tooltip text" position="top" zIndex="3" children={Child} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
    
   });

Example : components with Redux

/**
 * unit test case
 */

 import React from "react";
 import Adapter from 'enzyme-adapter-react-16';
 import Enzyme from 'enzyme';
 import toJSON from 'enzyme-to-json';
 import store from './../../../reducers/store/Store'
 import { render } from '@testing-library/react';
 import { Provider } from "react-redux";
 import Login from './Login';
 import LoginReducer,{verifyUserAsync} from './LoginSlice'
 
 
 Enzyme.configure({ adapter: new Adapter() });
 
 describe('login', () => {
     it('renders component without crashing', () => {
         const wrapper = render(
             <Provider store={store}>
                 <Login />
             </Provider>
         );
         expect(toJSON(wrapper)).toMatchSnapshot();
     });
 
 });
 
 describe("Login Reducer", () => {
     const initialState = {
         status: null,
         message: "",
         data: {},
     };
     it("should return initial state", () => {
         expect(LoginReducer(initialState, { type: "unknown" })).toEqual({
             message: "",
             status: null,
             data: {
 
             }
         });
     });
 
 });

 describe("testing full async thunk", () => {
    describe("reducers", () => {
      const initialState = {
        status: null,
        isLoading: true,
        message: "",
        data: {
        }
      };
  
      it("pending", () => {
        const action = { type: verifyUserAsync.pending.type };
        const state = LoginReducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          isLoading: true,
          status: null,
          data: null,
        });
      });
  
      it("fulfilled", () => {
        const action = {
          type: verifyUserAsync.fulfilled.type,
          payload: {
            message: "",
            status: null,
            data: {},
          },
        };
        const state = LoginReducer(initialState, action);
        expect(state).toEqual({
          message: "",
          status: null,
          isLoading: false,
          data: {},
        });
      });
  
      it("rejected", () => {
        const action = {
          type: verifyUserAsync.rejected.type,
          error: { message: "some error" },
        };
        const state = LoginReducer(initialState, action);
        expect(state).toEqual({
          ...initialState,  
          isLoading: false,
          status: "REJECTED",
          data: null,
          message: "some error",
        });
      });
    });
  });   


Example : unit test case for useLocation

/**
 * unit test case
 */

 import React from "react";
 import Adapter from 'enzyme-adapter-react-16';
 import Enzyme from 'enzyme';
 import toJSON from 'enzyme-to-json';
 import store from './../../../../reducers/store/Store'
 import { render } from '@testing-library/react';
 import { Provider } from "react-redux";
 import Approval from './../Approval';


 
 
 Enzyme.configure({ adapter: new Adapter() });

 jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "Approval"
    }),
    useHistory: () => ({
      push: jest.fn()
    })
  }));
 
 describe('Approval Page', () => {
     it('renders component without crashing', () => {
         const wrapper = render(
             <Provider store={store}>
                 <Approval />
             </Provider>
         );
         expect(toJSON(wrapper)).toMatchSnapshot();
     });
 
 });
 
 
 
Example : components with useParams

/**
 * unit test case
 */

 import React from "react";
 import Adapter from 'enzyme-adapter-react-16';
 import Enzyme from 'enzyme';
 import toJSON from 'enzyme-to-json';
 import store from './../../../../reducers/store/Store'
 import { render } from '@testing-library/react';
 import { Provider } from "react-redux";
import ApprovalDetailsPage from './../ApprovalDetails';


 Enzyme.configure({ adapter: new Adapter() });

 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        product: 'BIL',
        startDate: '2021-11-01',
        endDate:'2021-11-30',
        masterId:'312',
        transactId:317

    }),
  }));

 
 describe('Approval Details Page', () => {
     it('renders component without crashing', () => {
        
         const wrapper = render(
             <Provider store={store}>
                 <ApprovalDetailsPage />
             </Provider>
         );
         expect(toJSON(wrapper)).toMatchSnapshot();
     });
 
 });

Example : components with props & history

const { window, history } = props;



/**
 * Unit test cases for Business user App Layout Component
 *
 */
 import React from "react";
 import { shallow } from 'enzyme';
 import Adapter from 'enzyme-adapter-react-16';
 import Enzyme from 'enzyme';
 import toJSON from 'enzyme-to-json';
//  import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
import AppLayout from './../AppLayout';

Enzyme.configure({ adapter: new Adapter() });

  describe('Business user App Layout', () => {
    it('renders component without crashing', () => {
      const window= jest.fn();
      const wrapper = shallow(<AppLayout window={window} history={{}}/>);
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    
   }); 
 

