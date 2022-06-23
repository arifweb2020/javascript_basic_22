1> npm run test:ci

2> sonar-scanner.bat -D"sonar.projectKey=d2c-web" -D"sonar.host.url=http://localhost:9000" -D"sonar.login=3bcd8166247a099a6d778f82949dcd74b11bb362"


3> add in yr project

sonar.javascript.lcov.reportPaths=coverage/lcov.info
 sonar.testExecutionReportPaths=test-results/sonar-report.xml
sonar.sources=src/
sonar.test.inclusions=**/*.spec.js
sonar.exclusions=**/*Login.js,**/*Otp.js

4> make one folder test-results

5> {
  "name": "arif",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.6.2",
    "@mui/material": "^5.6.4",
    "@mui/styled-engine-sc": "^5.6.1",
    "@reduxjs/toolkit": "^1.8.1",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.2.0",
    "@testing-library/user-event": "^14.1.1",
    "axios": "^0.27.2",
    "crypto-js": "^4.1.1",
    "enzyme": "^3.11.0",
    "enzyme-adapter-react-17-updated": "^1.0.2",
    "enzyme-to-json": "^3.6.2",
    "moment": "^2.29.3",
    "react": "^17.0.2",
    "react-datepicker": "^4.8.0",
    "react-dom": "^17.0.2",
    "react-elastic-carousel": "^0.11.5",
    "react-redux": "^7.2.5",
    "react-router-dom": "^5.3.0",
    "react-scripts": "5.0.0",
    "styled-components": "^5.3.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "test:ci": "react-scripts test --ci --coverage  --watchAll=false --testResultsProcessor=jest-sonar-reporter",
    "eject": "react-scripts eject",
    "lint": "eslint --ext .js src "
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "jest-sonar-reporter": "^2.0.0"
  },
  "jestSonar": {
    "reportPath": "test-results",
    "reportFile": "sonar-report.xml",
    "indent": 4
  }
}
