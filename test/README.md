# Fi-Seed Test Suite
This test suite is design to test an application running a http or https server.

## Test directory structure

### Test files
 The test files are placed under the /files folder. In a structure described in the data/tests.json file as follows: 
   - Each level represents a folder.
   - The last level may be: 
     - A filename, e.g.: "setup", or
     - A filenames array, e.g.: ["setup", "cleanup"]. 

### Mock Data
The mock data is necessary to perform tests as is critical to perform an application complete flow. 
This data files should reflect the attributes of the application Schemas. 

### Config.js
The test suite configuration file. Here should be declared the information about the application being tested. And the test conditions. Most of this information could be retrieved automatically though.

### Test Scripts
The scripts folder has three files: 
 - The run.sh script that is invoked from the package.json to start the tests.
 - The utils.js script that containts utilitary functions like loadTests().
 - The run.js script that bootstraps the test suite.

### Setup.js
This should always be the first test to be run. Is the appropiate place to do test preparations like saving and loading database constants.
