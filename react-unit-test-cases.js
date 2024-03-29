https://betterprogramming.pub/how-to-achieve-100-test-coverage-for-react-functional-components-fbde1e40631c

https://medium.com/swlh/react-testing-using-jest-along-with-code-coverage-report-7454b5ba0236

https://www.testim.io/blog/sonarqube-javascript/

https://rangle.io/blog/component-test-coverage/

https://medium.com/swlh/react-testing-using-jest-along-with-code-coverage-report-7454b5ba0236

1> npm install enzyme enzyme-adapter-react-16 enzyme-to-json

--watchAll=false

2> run single file : npm test App.spec.js

3> npm run test -- --coverage or npm run test -- --coverage --watchAll=false

Example : Normal Component

// use this one
import React from "react";
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import Enzyme from 'enzyme';
import toJSON from 'enzyme-to-json';
import ActivitiesListComponent from './ActivitiesListComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('ActivitiesListComponent component test', () => {
    it('renders component without crashing', () => {
        const wrapper = shallow(<ActivitiesListComponent paraText="some text" Heading="some text" />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        // On the first run of this test, Jest will generate a snapshot file automatically.
    });
})

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
 

Example : useParams and useLocation together

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
 import ReportPage from './../Reports';

 Enzyme.configure({ adapter: new Adapter() });

 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        page: 0,
        size: 10,
    }),
    useLocation: () => ({
        pathname: "Report"
      }),
  }));
 
 describe('Approval Page', () => {
     it('renders component without crashing', () => {
         const wrapper = render(
             <Provider store={store}>
                 <ReportPage />
             </Provider>
         );
         expect(toJSON(wrapper)).toMatchSnapshot();
     });
 
 });

// 17 verison adapater

/**
 * Unit test cases for DSA user App Layout Component
 *
 */
 import React from "react";
 import { shallow , mount } from 'enzyme';
 import Adapter from 'enzyme-adapter-react-17-updated';
 import Enzyme from 'enzyme';
 import toJSON from 'enzyme-to-json';
//  import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
import AppLayout from './../AppLayoutDsa';
import { MemoryRouter } from "react-router-dom";
import store from './../../reducers/store/Store';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

  describe('DSA user App Layout', () => {
    it('renders component without crashing', () => {
      const window= jest.fn();
      const wrapper = shallow(<AppLayout window={window} history={{}}/>);
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    
   });

   describe('renders <AppLayout />', () => {
    it('should pass mount snapshot test', () => {

      const wrapper = mount(<Provider store={store}>
        <MemoryRouter><AppLayout/></MemoryRouter>
                     </Provider>);
      expect(wrapper).toMatchSnapshot();
    });
  });

//

import React from "react";
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import Enzyme from 'enzyme';
import toJSON from 'enzyme-to-json';
import Dashboard from './Dashboard';
import { MemoryRouter } from "react-router-dom";
import store from './../../app/store';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

describe('Dashboard component test', () => {
    it('renders component without crashing', () => {
        const wrapper = shallow(<Provider store={store}>
            <MemoryRouter><Dashboard /></MemoryRouter>
        </Provider>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
})

// enzyme wid zest chatgpt



//Here is an example of how to unit test a function in Jest with Enzyme: 

import React from 'react'; 
import { shallow } from 'enzyme'; 
import { MyComponent } from './MyComponent'; 

describe('MyComponent', () => { 

    it('should render correctly', () => { 
        const wrapper = shallow(<MyComponent />); 

        expect(wrapper).toMatchSnapshot();   //This will check if the component renders correctly. 
    });

    it('should call the function when button is clicked', () => { 
        const mockFn = jest.fn(); //mockFn will be a mock function that we can use to test if the function is called when the button is clicked.  

        const wrapper = shallow(<MyComponent onClick={mockFn} />); //We pass in our mockFn as a prop to our component.  

        wrapper.find('button').simulate('click'); //We simulate a click on the button element inside our component.  

        expect(mockFn).toHaveBeenCalled(); //Finally, we check if our mockFn has been called.  
    }); 
});

// jest test cases 

//Example function to test
function addTwoNumbers(a, b) {
  return a + b;
}

//Unit test for the above function using Jest
test('addTwoNumbers adds two numbers', () => { 
  expect(addTwoNumbers(1, 2)).toBe(3); 
});




// Here is an example of writing a unit test case for a complex function using Jest:

// First, import the function you want to test:
const complexFunction = require('./complexFunction');

// Then, create a test suite for the function: 
describe('complexFunction', () => {

  // Next, write your individual test cases: 
  it('should return the correct result when given valid inputs', () => {
    const input1 = 'foo';
    const input2 = 'bar';

    const expectedResult = 'foobar';

    expect(complexFunction(input1, input2)).toEqual(expectedResult);
  });

  it('should throw an error when given invalid inputs', () => {
    const input1 = null;
    const input2 = undefined;

    expect(() => complexFunction(input1, input2)).toThrowError();
  });

  // Finally, add any additional tests as needed.  
});


// Here is an example of a unit test case for an even number function using Jest: 

const isEven = (num) => {
  return num % 2 === 0;
}

test('isEven should return true if the number is even', () => {
  expect(isEven(2)).toBe(true);
});

test('isEven should return false if the number is odd', () => {
  expect(isEven(3)).toBe(false);
});
