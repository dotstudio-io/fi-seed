# Fi-Seed Test Suite
This test suite is designed to test an application running a http or https server.

## Test directory structure

### Config.js
The test suite configuration file. Here should be declared the information about the application being tested. And the test conditions. Most of this information could be retrieved automatically though.

### Files
Under the files folder are found the actual test files, this should be orderer under the following rules: 
  1. The only files under the test files root must be setup files, e.g: "setup.js". This will be the first tests to be called.
  2. The only folders under the test files root must be named positive and negative. These represent which kind of test we are performing.
  3. Under the kind-of-test folder should only be folders named after the application roles, e.g: "administrator". For tests that won't require a user signed-in the role will be "none". 
  4. Under the role folder are placed: one index file to make the first call, and one api folder where the actual test folders will by finally put. 
  5. Under the api folder are as many folders as api routes that role consumes: e.g:
  ```
  |--api
      |--users
      |--tokens
      |--documents
  ```
  6. Finally, under those folder the actual test files will be placed. Name the acording their function, e.g: "password.js"

#### Setup.js
This should always be the first test to be run. Is the appropiate place to do test preparations like saving and loading database constants.


### Data

#### tests.json
 The test.json file represt the test suite files structure and is build with the following structure: 
   - Each level represents a folder.
   - The last level may be: 
     - A filename, e.g.: "setup", or
     - A filenames array, e.g.: ["setup", "cleanup"]. 

#### Mock Data
The mock data is necessary to perform tests as is critical to perform an application complete flow. 
This data files should reflect the attributes of the application Schemas. 

### Scripts
The scripts folder has three files: 
 
#### run.sh 
This bash script is invoked from the package.json to start the tests. Allows for more complex arguments processing.

#### run.js 
The script that bootstraps the test suite. Is called from run.sh

#### utils.js 
This script containts utilitary functions as broad as loadTests(), randomName() and parseCSRF()· These functions are exposed globally and are called using the keyword "utils".
